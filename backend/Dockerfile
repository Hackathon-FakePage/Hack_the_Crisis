
FROM python:3.7-alpine

ADD requirements.txt /tmp

# RUN pip3 install --upgrade pip
# RUN pip install -r /tmp/requirements.txt

WORKDIR /code/

# Prevents Python from writing pyc files to disc (equivalent to python -B option)
ENV PYTHONDONTWRITEBYTECODE 1
# Prevents Python from buffering stdout and stderr (equivalent to python -u option)
ENV PYTHONUNBUFFERED 1

RUN pip3 install --upgrade pip && pip3 install -r /tmp/requirements.txt

ADD . /code/
