# transcendance

python3 manage.py collectstatic
~/.local/bin/daphne TSPong.asgi:application --bind 0.0.0.0 --port 8000
python3 manage.py runserver