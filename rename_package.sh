

PACKAGE_NAME="com.siristechnology.nepaltodayapp.beta"
PROJECT_NAME=nepaltodayapp
BUILD_GRADLE=./android/app/build.gradle
GOOGLE_SERVICES_FILE=./android/app/google-services.json
INFO_PLIST_FILE=ios/$PROJECT_NAME/Info.plist

sed -i '' 's/applicationId "[^"]*"/applicationId "'$PACKAGE_NAME'"/' $BUILD_GRADLE

sed -i '' 's/"package_name": "[^"]*"/"package_name": "'$PACKAGE_NAME'"/' $GOOGLE_SERVICES_FILE

# plutil -replace CFBundleIdentifier -string $PACKAGE_NAME $INFO_PLIST_FILE

