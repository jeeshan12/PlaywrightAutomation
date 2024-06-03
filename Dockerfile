# syntax=docker/dockerfile:1

ARG PW_VERSION=next
FROM mcr.microsoft.com/playwright:$PW_VERSION-jammy
LABEL version=$PW_VERSION
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN  adduser testrunner && usermod -aG sudo testrunner
RUN chown  -R testrunner:testrunner /app
USER testrunner
CMD ["npm"]
