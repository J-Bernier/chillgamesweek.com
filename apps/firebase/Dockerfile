FROM node:14.14

ENV LANG C.UTF-8
ENV TZ Europe/Paris

ENV FIREBASE_VERSION 9.22.0

RUN apt update -y

RUN apt install -y default-jre

RUN npm install -g firebase-tools@${FIREBASE_VERSION}

WORKDIR /project
