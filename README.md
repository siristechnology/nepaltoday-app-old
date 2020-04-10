# Nepal Today App

![Android Apk - Release & Google Play Publish](https://github.com/siristechnology/nepaltoday-app/workflows/Android%20Apk%20-%20Release%20&%20Google%20Play%20Publish/badge.svg)
[![DeepScan grade](https://deepscan.io/api/teams/5348/projects/7146/branches/66889/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5348&pid=7146&bid=66889)

<a href='https://play.google.com/store/apps/details?id=com.siristechnology.nepaltodayapp&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target='_blank'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' height="80"/></a>

## Latest screenshot

<img src="assets/images/screenshot-2.png" alt="drawing" height="400" />

## How to Run locally

-   Install Android Studio
-   Install node (10.x), yarn (1.x)
-   Install concurrently globally. `yarn global add concurrently`
-   Run Android emulator. (from Android Studio or Genymotion)
-   Compile Relay Graphql. `yarn relay`
-   Run the app. `yarn start:dev`

## Tips

-   Run `yarn relay` to compile graphql in relay. [It needs to be compiled before running the app]
-   Run the app using concurrently. `yarn start:dev`
-   Run `yarn a` to run the app in android without concurrently
-   Run `yarn refresh` to reload android app quickly without rebuilding
-   Run `yarn reset` to reset package manager cache
-   Run `adb uninstall com.siristechnology.nepaltodayapp` to uninstall app from the android simulator
-   Run `adb logcat` to view android emulator logs in terminal
