FROM ubuntu:latest

MAINTAINER Horia Coman <horia141@gmail.com>

# Install global packages.

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
            git \
            nodejs-legacy \
            npm && \
    apt-get clean

# Setup directory structure.

RUN mkdir /ocelot-saas
RUN mkdir /ocelot-saas/pack
RUN mkdir /ocelot-saas/var

# Setup users and groups.

RUN groupadd ocelot-saas && \
    useradd -ms /bin/bash -g ocelot-saas ocelot-saas

# Install package requirements.

COPY package.json /ocelot-saas/pack/package.json
RUN cd /ocelot-saas/pack && npm install --progress=false

# Copy source code.

COPY . /ocelot-saas/pack

# Setup the runtime environment for the application.

ENV ENV LOCAL
ENV ADDRESS 0.0.0.0
ENV PORT 10000
ENV AUTH0_KEY null # Provided by secrets
ENV AUTH0_DOMAIN null # Provided by secrets
ENV FILESTACK_KEY null # Provided by secrets
ENV IDENTITY_SERVICE_PUBLIC_DOMAIN localhost:10001
ENV INVENTORY_SERVICE_PUBLIC_DOMAIN localhost:10002

RUN chown -R ocelot-saas:ocelot-saas /ocelot-saas
VOLUME ["/ocelot-saas/pack/src"]
VOLUME ["/ocelot-saas/var/secrets.json"]
WORKDIR /ocelot-saas/pack
EXPOSE 10000
USER ocelot-saas
ENTRYPOINT ["npm", "run", "serve"]
