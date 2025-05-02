from django.shortcuts import render

def index(request):
    context = {
        "name": "John Doe",
    }
    return render(request, 'base.html', context)

from users.decorators import in_group

@in_group("Officer")
def approval_panel(request):
    ...