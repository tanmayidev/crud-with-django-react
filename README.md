# crud-with-django-react

## Frontend Setup

Create react app

```
npx create-react-app frontend
```

## Backend Setup

Create virtual environment

```
python -m venv venv
```

Activate that environment

```
venv\Scripts\activate
```

Install Django in that environment

```
pip install django djangorestframework
```

Create backend project

```
django-admin startproject backend
```

## Run Backend

Run the backend app

- manage.py is the cli tool for python project

```
python manage.py runserver
```

## Commands run for Django

```python
django-admin startproject backend

cd backend

python manage.py startapp api


# migrate model after registering in admin
python manage.py makemigrations

python manage.py migrate

# create super user
python manage.py createsuperuser
userame: admin
email: admin@admin.com
password: admin

# fixing cors headers issue
python -m pip install django-cors-headers

```

## Handling venv

Get the list and store it in file called requirements.txt

```
pip freeze
```

Load requirements.txt using

```
pip install -r requirements.txt
```
