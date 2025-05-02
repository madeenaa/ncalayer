from django.contrib.auth.decorators import user_passes_test

from django.contrib.auth.decorators import user_passes_test

def in_group(admin):
    def check(user):
        return user.is_authenticated and user.groups.filter(name=group_name).exists()
    return user_passes_test(check)