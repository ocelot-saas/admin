#!/bin/sh

npm pack
curl -s -F package=@`ls admin-*.tgz` https://$GEMFURY_KEY@push.fury.io/ocelot-saas/ > result
if [ -z "$(grep -e ok result)" ]
then
  exit 1
fi
