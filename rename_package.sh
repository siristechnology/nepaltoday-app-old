

PACKAGE_NAME="com.siristechnology.nepaltodayapp.testing"
PROJECT_NAME=nepaltodayapp
BUILD_GRADLE=android/app/build.gradle
GOOGLE_SERVICES_FILE=android/app/google-services.json
INFO_PLIST_FILE=ios/$PROJECT_NAME/Info.plist

sed -i '' 's/applicationId "[^"]*"/applicationId "'$PACKAGE_NAME'"/' android/app/build.gradle

sed -i '' 's/"package_name": "[^"]*"/"package_name": "'$PACKAGE_NAME'"/' android/app/google-services.json

plutil -replace CFBundleIdentifier -string $PACKAGE_NAME $INFO_PLIST_FILE

