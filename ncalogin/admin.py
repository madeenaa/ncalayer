from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser

    # Fields visible in admin form
    fieldsets = (
        (None, {'fields': ('username', 'iin', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'iin', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}
        ),
    )

    list_display = ('username', 'iin', 'email', 'is_staff', 'is_active')
    search_fields = ('username', 'iin', 'email')