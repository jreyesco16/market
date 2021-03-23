FROM python:3.9.2

WORKDIR /backend

COPY . /backend

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD ["gunicorn", "--workers=2", "--bind", "0.0.0.0:5000",  "app:app" ]