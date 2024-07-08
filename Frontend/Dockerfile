FROM ubuntu:24.04

WORKDIR /app

RUN apt update
RUN apt install -y curl unzip

RUN curl -fsSL https://bun.sh/install | bash

COPY bun.lockb .
COPY package.json .

RUN /root/.bun/bin/bun install

COPY . .
