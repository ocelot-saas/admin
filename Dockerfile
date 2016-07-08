FROM ubuntu:latest

MAINTAINER Horia Coman <horia141@gmail.com>

# Install global packages.

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
            git \
            nodejs-legacy \
            npm && \
    apt-get clean

RUN npm install -g bower
RUN npm install -g gulp

# Setup directory structure.

RUN mkdir /ocelot
RUN mkdir /ocelot/pack
RUN mkdir /ocelot/pack/admin
RUN mkdir /ocelot/var
RUN mkdir /ocelot/var/cache

# Setup users and groups.

RUN groupadd ocelot && \
    useradd -ms /bin/bash -g ocelot ocelot

# Install package requirements.

COPY package.json /ocelot/pack/admin/package.json
RUN cd /ocelot/pack/admin && npm install --progress=false
COPY bower.json /ocelot/pack/admin/bower.json
COPY vendor.json /ocelot/pack/admin/vendor.json
RUN cd /ocelot/pack/admin && npm run-script prestart

# Copy source code.

COPY . /ocelot/pack/admin

# Setup the runtime environment for the application.

ENV ENVIRON LOCAL

RUN chown -R ocelot:ocelot /ocelot
VOLUME ["/ocelot/pack/admin/src"]
WORKDIR /ocelot/pack/admin
EXPOSE 10000
USER ocelot
ENTRYPOINT ["gulp", "serve"]
