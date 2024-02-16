FROM node:alpine3.13

WORKDIR /usr/local/users

COPY . .
RUN apk add --no-cache \
        udev \
        ttf-freefont \
        chromium

CMD ["/bin/sh", "start.sh"]
