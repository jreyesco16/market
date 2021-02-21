FROM python:3.6.1

WORKDIR /backend

COPY . /backend

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]