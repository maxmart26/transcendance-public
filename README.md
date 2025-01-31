# transcendance

make : Server up addr: http://localhost:8080

make logs : Django-container logs

make re : Server rebuild + up addr: http://localhost:8080

make down : Server down

make re : Server down + tempo files wipe

make clean-db : Server down + tempo files wipe + database wipe

python3 manage.py collectstatic
~/.local/bin/daphne TSPong.asgi:application --bind 0.0.0.0 --port 8000
python3 manage.py runserver
