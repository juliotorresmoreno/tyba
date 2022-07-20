FROM node:16

RUN npm install -g npm@8.14.0
ADD . /opt/tyba
WORKDIR /opt/tyba
RUN npm i

ENTRYPOINT [ "npm", "start" ]