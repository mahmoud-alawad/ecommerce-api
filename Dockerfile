ARG NODE_IMAGE
FROM ${NODE_IMAGE}

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app
ENV PATH /opt/app/node_modules/.bin:$PATH
RUN npm install --save pg
RUN npm install --ignore-scripts=false --foreground-scripts --verbose --save sharp
RUN npm install --platform=linux --arch=x64 --save sharp

EXPOSE 1337
