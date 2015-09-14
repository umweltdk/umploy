#!/bin/sh
set -o errexit

if [ "$1" != "--encrypt" ]; then
  if [ "$1" = "-" ]; then
    cat | /usr/src/app/bin/umploy - > /tmp/deploy-script.sh
  else
    /usr/src/app/bin/umploy > /tmp/deploy-script.sh
  fi
  exec bash /tmp/deploy-script.sh
else
  exec /usr/src/app/bin/umploy
fi