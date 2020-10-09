# NepalToday App

![Android Apk - Build & Release](https://github.com/siristechnology/nepaltoday-app/workflows/Android%20Apk%20-%20Build%20&%20Release/badge.svg)
![Android Detox Test](https://github.com/siristechnology/nepaltoday-app/workflows/Android%20Detox%20Test/badge.svg)
[![DeepScan grade](https://deepscan.io/api/teams/5348/projects/7146/branches/66889/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5348&pid=7146&bid=66889)
[![Known Vulnerabilities](https://snyk.io/test/github/siristechnology/nepaltoday-app/badge.svg?targetFile=android/app/build.gradle)](https://snyk.io/test/github/siristechnology/nepaltoday-app?targetFile=android/app/build.gradle)

<br/>
<div>
<img src="android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png" alt="screenshot-1" height="80" style="margin-right:10px"/>
<a href='https://play.google.com/store/apps/details?id=com.siristechnology.nepaltodayapp&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target='_blank' rel="noopener noreferrer"><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' height="80"/></a>
</div>
  
## Latest screenshot

<div>
<img src="assets/images/screenshot-1.png" alt="screenshot-1" width="300" style="margin-right:20px"/>
<img src="assets/images/screenshot-2.png" alt="screenshot-2" width="300"/>
</div>

## How to Run locally

-   Install Android Studio
-   Install node (14.x), yarn (1.x)
-   Run Android emulator. (from Android Studio or Genymotion)
-   Run Metro bundler. `yarn start`
-   Run Android app. `yarn android`

## How to Run Detox test on Android Emulator

-   Install detox cli. `yarn global add detox-cli`
-   Build apk for testing. `yarn build-detox-android`
-   Run detox test on apk. `yarn test-detox-android`

## Tips

-   Run `yarn refresh` to reload android app quickly without rebuilding
-   Run `yarn reset` to reset package manager cache
-   Run `adb uninstall com.siristechnology.nepaltodayapp` to uninstall app from the android simulator
-   Run `adb logcat` to view android emulator logs in terminal
