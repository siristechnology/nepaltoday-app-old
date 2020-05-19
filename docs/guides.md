### How to generate apks file from bundle

-   Download latest bundletool from https://github.com/google/bundletool/releases
-   Run command to generate apks file: `java -jar bundletool-all-0.15.0.jar build-apks --bundle=/path/to/aab/file/app-signed.aab --output=./app.apks`
-   Run command to install apks file: `java -jar bundletool-all-0.15.0.jar install-apks --apks=./app.apks`
