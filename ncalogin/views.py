from django.contrib.auth import login, get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render
import re
User = get_user_model()

@csrf_exempt
def ncalayer_login(request):
    if request.method != "POST":
        return JsonResponse({"success": False, "error": "Метод не поддерживается"}, status=405)

    try:
        data = json.loads(request.body)
        iin = data.get("iin", "")
        if not iin:
            return JsonResponse({"success": False, "error": "IIN не передан"}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({"success": False, "error": "Некорректный JSON"}, status=400)

    try:
        user = User.objects.get(iin=iin)
        login(request, user)
        return JsonResponse({"success": True, "redirect_url": "/dashboard/"})
    except User.DoesNotExist:
        return JsonResponse({"success": False, "error": "Пользователь с таким ИИН не найден."}, status=404)


def login_page(request):
    return render(request, 'ncalogin.html')
