FROM python:3.9.2

WORKDIR /backend

COPY . /backend

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]