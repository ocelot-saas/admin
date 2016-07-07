FROM ubuntu:latest

MAINTAINER Horia Coman <horia141@gmail.com>

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
            npm && \
    apt-get clean

RUN mkdir /ocelot
RUN mkdir /ocelot/pack

COPY . /ocelot/pack/admin

RUN cd /ocelot/pack/admin && npm install
RUN cd /ocelot/pack/admin && npm run prestart

RUN groupadd ocelot && \
    useradd -ms /bin/bash -g ocelot ocelot
RUN chown -R ocelot:ocelot /ocelot

ENV ENVIRON LOCAL

WORKDIR /ocelot
EXPOSE 3000
USER ocelot
ENTRYPOINT ["gulp", "serve"]
