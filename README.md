# Nepal Today App

[![Build status](https://build.appcenter.ms/v0.1/apps/034ab548-ee10-4898-8d10-32c39ed6db38/branches/release/badge)](https://appcenter.ms)

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

## Sample data from Api

```
{
  "data": {
    "getArticles": [
      {
        "_id": "5d95435190034a017e056c74",
        "title": "पार्टीको निर्देशन नमानेको भन्दै, महरालाई अनुशासनको कारबाही गर्दै नेकपा",
        "publishedDate": "1570063185523",
        "shortDescription": "बलात्कार आरोप लागेका महरालाई नेकपा सचिवालय बैठकले सभामुख र सांसद दुवै पदबाट राजीनामा दिन सुझाव दिएको थियो । मंगलबार बसेको सचिवालय बैठकले दुवै पदबाट राजीनामा दिन सुझाव दिए पनि महराले सभामुख पदबाट घुमाउरो शैलीमा राजीनामा बुझाएका थिए ।",
        "content": "काठमाडौं, १६ असाेज । सत्तारूढ दल नेपाल कम्युनिस्ट पार्टी (नेकपा)ले प्रतिनिधिस...",
        "link": "https://www.dainiknepal.com/2019/10/415593.html",
        "imageLink": "https://www.dainiknepal.com/wp-content/uploads/2019/10/Krishnabahadur-Mahara.jpg",
        "createdDate": "1570063185523",
        "category": "news",
        "source": {
          "_id": "5d695576118ba29b0ecc2941",
          "name": "दैनिक नेपाल"
        }
      },
      ...
    ]
  }
}
```
