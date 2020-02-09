

PACKAGE_NAME="com.siristechnology.nepaltodayapp.beta"
PROJECT_NAME=nepaltodayapp
BETA_APP_NAME="NepalToday-Beta"
BUILD_GRADLE=./android/app/build.gradle
ANDROID_STRINGS_FILE=./android/app/src/main/res/values/strings.xml
GOOGLE_SERVICES_FILE=./android/app/google-services.json
# INFO_PLIST_FILE=ios/$PROJECT_NAME/Info.plist

sed -i '' 's/applicationId "[^"]*"/applicationId "'$PACKAGE_NAME'"/' $BUILD_GRADLE

sed -i '' 's/"app_name">[^<]*</"app_name">'$BETA_APP_NAME'</' $ANDROID_STRINGS_FILE

sed -i '' 's/"package_name": "[^"]*"/"package_name": "'$PACKAGE_NAME'"/' $GOOGLE_SERVICES_FILE


# plutil -replace CFBundleIdentifier -string $PACKAGE_NAME $INFO_PLIST_FILE
