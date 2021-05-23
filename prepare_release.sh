#!/usr/bin/env bash

PACKAGE_NAME="com.siristechnology.nepaltodayapp"
APP_NAME="NepalToday"
TIME_STAMP=$(date +%s)
IC_LAUNCHER_BACKGROUND="#E7F3FF"
BUILD_GRADLE=./android/app/build.gradle
ANDROID_STRINGS_FILE=./android/app/src/main/res/values/strings.xml
IC_LAUNCHER_BACKGROUND_FILE=./android/app/src/main/res/values/ic_launcher_background.xml

sed -i '' -e 's/applicationId "[^"]*"/applicationId "'$PACKAGE_NAME'"/' $BUILD_GRADLE
sed -i '' -e 's/versionCode .*$/versionCode '$TIME_STAMP'/' $BUILD_GRADLE
sed -i '' -e 's/"app_name">[^<]*</"app_name">'$APP_NAME'</' $ANDROID_STRINGS_FILE

sed -i '' -e 's/"ic_launcher_background">[^<]*</"ic_launcher_background">'$IC_LAUNCHER_BACKGROUND'</' $IC_LAUNCHER_BACKGROUND_FILE

mv .env.release .env
mv ./android/app/google-services.json.prod ./android/app/google-services.json
