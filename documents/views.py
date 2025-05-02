# app/views.py
from django.shortcuts import render, redirect
from .forms import DocumentForm
from .models import Document

def my_view(request):
    message = 'Upload as many files as you want!'

    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('my-view')
        else:
            message = 'The form is not valid. Fix the following error:'
    else:
        form = DocumentForm()

    documents = Document.objects.all()
    return render(request, 'list.html', {
        'form': form,
        'documents': documents,
        'message': message,
    })