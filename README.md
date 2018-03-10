# aurelia-cordova-skeleton
Skeleton for building an Aurelia mobile app with Apache Cordova, WebPack and TypeScript.

## prerequisites

Make sure that you have installed NodeJS, Cordova and any specific platform tooling like Android Studio. 

## installation

1. `npm install` for installing Aurelia.
2. `cordova platform add browser` for adding the browser platform to cordova.
3. `cordova platform add android` for adding the android platform to cordova.

## building and running

### Running WebPack development server 

* `npm run devserver` starts the WebPack development server and the build does not include any cordova software or plugins. 

### Building in development mode 

* `npm run build` runs a development build with cordova software.
* `cordova platform run browser` can than be run to run it in the browser.
* `cordova platform run android` can than be run to run it in Android.

### Building in production mode 

* `npm run build-prod` runs a production build with cordova software.
* `cordova platform build android` can than be build an Android image.
