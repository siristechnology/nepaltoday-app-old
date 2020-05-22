#!/usr/bin/env bash

PACKAGE_NAME="com.siristechnology.nepaltodayapp"
APP_NAME="NepalToday"
TIME_STAMP=$(date +%s)
BUILD_GRADLE=./android/app/build.gradle
ANDROID_STRINGS_FILE=./android/app/src/main/res/values/strings.xml
ANDROID_MANIFEST_FILE=./android/app/src/main/AndroidManifest.xml
GOOGLE_SERVICES_FILE=./android/app/google-services.json

sed -i '' 's/applicationId "[^"]*"/applicationId "'$PACKAGE_NAME'"/' $BUILD_GRADLE
sed -i '' 's/versionCode .*$/versionCode '$TIME_STAMP'/' $BUILD_GRADLE
sed -i '' 's/"app_name">[^<]*</"app_name">'$APP_NAME'</' $ANDROID_STRINGS_FILE

sed -i '' 's/"@mipmap\/ic_launcher"/"@mipmap\/ic_launcher_prod"/' $ANDROID_MANIFEST_FILE


mv .env.release .env
mv ./android/app/google-services.json.prod ./android/app/google-services.json
