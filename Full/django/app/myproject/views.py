
from django.shortcuts import render
from django.http import JsonResponse
from myapp.models import Person
from django.views.decorators.csrf import csrf_exempt
import json




@csrf_exempt
def add_person(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            first_name = data.get("first_name")
            last_name = data.get("last_name")

            if not first_name or not last_name:
                return JsonResponse({"error": "First name and last name are required"}, status=400)

            person = Person.objects.create(first_name=first_name, last_name=last_name)
            return JsonResponse({"message": "Person added successfully", "id": person.id})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=400)


def get_people(request):
    people = Person.objects.all().values('first_name', 'last_name', 'created_at')
    return JsonResponse(list(people), safe=False)