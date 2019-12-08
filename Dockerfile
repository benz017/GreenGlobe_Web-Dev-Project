FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN mkdir /Full_Stack_Project
WORKDIR /Full_Stack_Project
ADD . /Full_Stack_Project/
RUN pip install -r requirements.txt