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

```
django-admin startproject backend
cd backend
python manage.py startapp api


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
