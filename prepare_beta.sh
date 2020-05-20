


TIME_STAMP=$(date +%s)
BUILD_GRADLE=./android/app/build.gradle

sed -i '' 's/versionCode .*$/versionCode '$TIME_STAMP'/' $BUILD_GRADLE
