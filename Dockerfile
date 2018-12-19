FROM node

MAINTAINER bvenkatr2@gmail.com

RUN apt-get update && apt-get install -y vim

RUN mkdir /root/app
COPY . /root/app/

WORKDIR /root/app

ENTRYPOINT ["bash", "start.sh"]
