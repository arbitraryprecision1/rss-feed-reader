FROM python:slim

RUN apt update && apt upgrade && apt install sqlite3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_APP=app
ENV FLASK_ENV=development
CMD [ "flask", "run", "--port=8000", "--host=0.0.0.0" ]