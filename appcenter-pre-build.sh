#!/usr/bin/env bash
#
# For Xamarin Android or iOS, change the package name located in AndroidManifest.xml and Info.plist.
# AN IMPORTANT THING: YOU NEED DECLARE PACKAGE_NAME ENVIRONMENT VARIABLE IN APP CENTER BUILD CONFIGURATION.

if [ -z "$PACKAGE_NAME" ]
then
    echo "You need define the PACKAGE_NAME variable in App Center"
    exit
fi

if [ "$APPCENTER_BRANCH" != "master"]
then
    echo "Only master branch will build QA build"
    exit
fi

PROJECT_NAME=nepaltodayapp
BUILD_GRADLE=$APPCENTER_SOURCE_DIRECTORY/android/app/build.gradle
GOOGLE_SERVICES_FILE=$APPCENTER_SOURCE_DIRECTORY/android/app/google-services.json
INFO_PLIST_FILE=$APPCENTER_SOURCE_DIRECTORY/ios/$PROJECT_NAME/Info.plist

if [ -e "$ANDROID_MANIFEST_FILE" ]
then
    echo "Updating applicationId in $PACKAGE_NAME in build.gradle"
    sed -i '' 's/applicationId "[^"]*"/applicationId "'$PACKAGE_NAME'"/' $BUILD_GRADLE

    sed -i '' 's/"package_name": "[^"]*"/"package_name": "'$PACKAGE_NAME'"/' $GOOGLE_SERVICES_FILE

    echo "File content:"
    cat $ANDROID_MANIFEST_FILE
fi


if [ -e "$INFO_PLIST_FILE" ]
then
    echo "Updating package name to $PACKAGE_NAME in Info.plist"
    plutil -replace CFBundleIdentifier -string $PACKAGE_NAME $INFO_PLIST_FILE

    echo "File content:"
    cat $INFO_PLIST_FILE
fi