# Foundation Communities: Financial App

## Software Needed

### iOS
* XCode (for emulator)
* Watchman
* Cocoapods

### Android
* Android Studio (for emulator)

### Both
* Any IDE (i.e. VS Code)
* Git or Github
* Any package manager such as Node Package Manager (which comes with most versions of NodeJS) or Yarn
* NodeJS (we used v14.15.0)
* React Native (we use version 0.63.3)
* Access to Firebase (the database we use to store information and send notifications)

#### Important docs and guides: https://reactnative.dev/docs/getting-started
#### Environment setup: https://reactnative.dev/docs/environment-setup
(using native cli)

#### Example library information:(only version we know can cause problems is Node if you have problems with running npm or react-native in terminal as invalid commands try using v14.15.0)

#### Binaries:
  * Node: 14.15.0 - C:\Program Files\nodejs\node.EXE
  * npm: 6.14.8\ - C:\Program Files\nodejs\npm.CMD  
 #### IDEs:
 * Android Studio: Version  3.5.0.0 AI-191.8026.42.35.6010548
  #### npmPackages:
   * react: 16.13.1
   * react-native: 0.63.3
    
##### You can check this with ‘react-native info’ (we only show this because sometime the most up to date versions aren't compatible with react-native, you might not need to worry about this)

## Modules to Install
(in terminal go to path directory of project and you can install it over a previously installed module; also the @ matters and you have to: npm install <module name>)
* @react-navigation/stack
* @react-navigation/native
* react-native-platform-touchable
* @react-native-community/async-storage
* react-native-elements 
* react-native-safe-area-context 
* react-native-localization 
* react-native-gesture-handler 
* react-native-vector-icons 
* react-native-screens 
* @react-native-community/masked-view
* react-native-reanimated
* react-native-firebase 
* react-geocode
* react-native-snackbar
* react-native-image-picker
* @react-navigation/bottom-tabs
* @react-native-community/geolocation

#### For iOS
run pod install in /ios directory after installing modules

## General Build Instructions
run _npx react-native start_ in terminal at root directory
open new terminal at root directory
run _npx react-native run-ios_ or _npx react-native run-android_

General Issues:
* Firebase issues causes errors with MapScreen and Admin
  * We haven't done any work with the MapScreen or the Admin screen since we aren't able to run it yet so there may be other issues with those screens that we don't know about
  * If you want to test the rest of the app you can go to Admin.js and MapScreen.js and comment them out then run it since we know the rest works
  * Follow instructions for setting up Firebase in React Native at: https://rnfirebase.io
* The working parts of the app definitely build and run on iOS but there is an error with running it on Android
* Icons are difficult to work with in iOS so you may have to find a whole new Icon solution for the app that works on both Android and iOS
* Not really an issue but Fonts are also tricky on iOS so I just used 'System' as the default font since that works with iOS and Android but in case you want to change the font in the future so this is just something to note
  * 'System' just uses the default font on the respective platform: 'Roboto' for Android and 'San Francisco' on iOS

### Iphone first time build:
After environment setup
In terminal run ‘npm i’ from project folder 
In ios folder directory use ‘pod install’ 
‘npx react-native run-ios —simulator=“iPhone11” ‘ starts program on simulator of iphone 11 ‘npx react-native run-ios —device’ to run on connected Iphone
(For devices will give error and then command you need to run to install dependencies)

You can run ‘npx react-native start’ in a separate terminal to run the dependency graph for debugging purposes

Current Problems:
* Icons for bottom tab bar do not render - error message: "Unrecognized font family 'Ionicons'
  * Currently all the icons are commented out in the navigators.js file but will probably need to be replaced with different code

### Android first time build:
Run Terminal as ADMINISTRATOR
After environment setup

Import project from github through Android Studio
In terminal, run ‘npm i’ from project folder to install all of the libraries used by the app

{(onetime)
generate the debug keystore by running this command in the ‘android/app/ directory’: 
“keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000”}

After that you can run ‘react-native start’ in a separate terminal to run the dependency graph for debugging purposes

Run ‘react-native run-android’ in the first terminal to install the app and run the app on the android device

Current Problems:
* The Windows/Android version of this application is currency stuck at :app:multiDexListDebug error. “A failure occurred while executing com.android.build.gradle.internal.tasks.Workers$ActionFacade”. Error while merging dex archives.

### Some error fixes
For debug google services error
try "npm start -- --reset-cache"

:app:processDebugGoogleServices can be solved by
cd android && gradlew clean

:app:installDebug implies there is a problem with the emulator setup 
Can check through ‘adb devices’ command and you will have to make sure everything is set up on android studios with the right settings. Might also need to wipe data on the emulator.

Some problems can be fixed by building again so try to see if the build error is repeating.

### Notes
* For the android version, the Google Maps API key is in /android/src/main/AndroidManifest.xml under "android:name=com.google.android.geo.API_KEY"

* If you need any API keys: 
Google Maps API key: Contact the project partner
Firebase API key: Viewable on the Firebase console

* Everytime you want to build the app, you should uninstall the previous version of the app on the device first, run npm start -- --reset-cache, and cd android && gradlew clean(windows)||cd android && ./gradlew clean(linux)
  * Not necessary on iOS since _npx react-native run-ios_ updates the app each time it's run

* From my personal testing of the push notification system:
When the app is running and currently open (meaning it is being used and is on screen), notifications won’t show up on the device
When the app is running but not on screen, notifications do show up
If the app is force closed, notifications won’t show up

* To make a release build: https://reactnative.dev/docs/signed-apk-android  and/or https://www.instamobile.io/android-development/generate-react-native-release-build-android/
(we used latter link building from react native cli)

* To send push notifications, go to cloud messaging in Firebase

* Refer to master branch code for MapScreen and Admin screen since that code was working for previous semesters

* Use hook functions for components to stay consistent
