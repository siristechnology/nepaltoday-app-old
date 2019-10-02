# Nepal Today App

[![Build status](https://build.appcenter.ms/v0.1/apps/dcdc5d16-bf47-4a9a-bec9-a4d30faa77a3/branches/master/badge)](https://appcenter.ms)
[![Build Status](https://dev.azure.com/siristechnology/siristechnology/_apis/build/status/NepalToday-App?branchName=master)](https://dev.azure.com/siristechnology/siristechnology/_build/latest?definitionId=1&branchName=master)

### [Download from Google Play Store](https://play.google.com/store/apps/details?id=com.siristechnology.nepaltodayapp)

## Latest screenshot

<img src="assets/images/screenshot.png" alt="drawing" height="400" />

## Tips

-   Run `yarn relay` to compile graphql in relay. [It needs to be compiled before running the app]
-   Run `yarn a` to run the app in android
-   Run `yarn refresh` to reload android app quickly without rebuilding
-   Run `yarn reset` to reset package manager cache
-   Run `adb shell settings put global verifier_verify_adb_installs 0` to disable apk verification
-   Run `adb shell settings put global package_verifier_enable 0` to disable package verification
-   Run `adb uninstall com.siristechnology.nepaltodayapp` to uninstall app from the android simulator
-   Run `adb logcat` to view android emulator logs in terminal

## upgrade details (for review)

https://react-native-community.github.io/upgrade-helper/?from=0.58.3&to=0.60.5

## data type

```
{ getArticles:
[ { _id: '5d94c00c01edc400ee4dd5da',
title: 'मदन भण्डारी विश्वविद्यालय : चिनियाँ प्राविधिक टोलीबाट स्थलगत अध्ययन',
shortDescription: 'हेटौंडा — मदन भण्डारी विज्ञान प्रविधि विश्वविद्यालय निर्माणका लागि चिनियाँ उच्चस्तरीय प्राविधिक टोलीले सोमबार थाहा नगरपालिका–९ चित्लाङमा स्थलगत अध्ययन गरेको छ ।',
content: 'हेटौंडा — मदन भण्डारी विज्ञान प्रविधि विश्वविद्यालय निर्माणका लागि चिनियाँ उच्चस्तरीय प्राविधिक टोलीले सोमबार थाहा नगरपालिका–९ चित्लाङमा स्थलगत अध्ययन गरेको छ ।सरकारले उक्त विश्वविद्यालय चित्लाङको ताकाटारमा निर्माण गर्ने निर्णय गरेको छ। विश्वविद्यालय निर्माणस्थलको अध्ययन गर्न चिनियाँ उच्चस्तरीय ९ सदस्यीय प्राविधिक टोली चित्लाङ आएको हो।  लामो समय बन्द रहेको थानकोट–चित्लाङको सडक सोमबारबाट सञ्चालनमा आएसँगै चिनियाँ टोली स्थलगत अध्ययन गर्न आएको विश्वविद्यालय विकास समितिका अध्यक्ष राजेन्द्रध्वज जोशीले जानकारी दिए।  विश्वविद्यालय निर्माणस्थलको अध्ययन गर्न ९ सदस्यीय चिनियाँ टोली आएको हो। उनीहरूले प्रस्तावित निर्माणस्थल ताकाटारमा जग्गा अवलोकन गरेका छन्। विश्वविद्यालयका लागि ७ सय ४० रोपनी जग्गा छुट्याइएको छ। स्वच्छन्द भैरव माविको उक्त जग्गा विश्वविद्यालयको नाममा गरिसकिएको छ।  विश्वविद्यालय बन्ने स्थानको अवलोकन गर्न आएको चिनियाँ टोलीलाई चित्लाङवासीले खादा र फूलमालाले स्वागत गरेका थिए। ‘यहाँ विश्वविद्यालय बन्ने कुराले गाउँले खुसी छन्,’ स्थानीय बुद्धरत्न मानन्धरले भने।  नेपाल भ्रमणमा आउन लागेका चिनियाँ राष्ट्रपति सी चिनफिङसँग विश्वविद्यालय निर्माणका लागि अनुरोध गर्ने एजेन्डा छ। प्रकाशित : आश्विन १५, २०७६ २०:५७',
  link: 'https://ekantipur.com/news/2019/10/02/157002800494211721.html',
 imageLink: 'https://assets-cdn-npe.kantipurdaily.com/uploads/source/news/kantipur/2019/politics/chinesegroupinspectingchitlang-02102019050841-1000x0.jpg',}]}

```
