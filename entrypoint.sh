#!/bin/bash
set -o errexit

function run_deploy {
  /usr/src/app/bin/umploy "$@" > /tmp/deploy-script.sh
}

if [ "$1" != "--encrypt" ]; then
  if [ "$1" = "-" ]; then
    cat | run_deploy -  2>&1
  else
    run_deploy 2>&1
  fi
  if [ ! -d ".git" ]; then
    echo "WARNING .git directory is missing" 1>&2
  fi
  exec bash /tmp/deploy-script.sh
else
  exec /usr/src/app/bin/umploy
fi