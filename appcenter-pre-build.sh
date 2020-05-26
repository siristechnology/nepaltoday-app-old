#!/usr/bin/env bash

if [[ $APPCENTER_BRANCH != release* ]]
then
    echo "Only release branches can build from appcenter.ms and release to Google Play"
    exit
fi

echo "Using release environment variables"

sh prepare_release.sh
