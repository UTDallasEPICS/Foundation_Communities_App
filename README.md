# Foundation_Communities_App

## Software Needed

### iOS:
* XCode (for emulator)
* Watchman

### Android:
* Android Studio (for emulator)

### Both:
* Any IDE such as VS Code (you can use Android Studio or XCode if you want)
* Git or Github
* Any package manager such as Node Package Manager (which comes with most versions of NodeJS) or Yarn
* NodeJS (we used v12.14.1 and v12.08.0)
* React Native (we use version 0.60.5)
* Access to Firebase (the database we use to store information and send notifications)

Important docs and guides: https://reactnative.dev/docs/getting-started
Environment setup: https://reactnative.dev/docs/environment-setup
(using native cli)

Example library information:(only version we know can cause problems is Node if you have problems with running npm or react-native in terminal as invalid commands try using v12.8.0)
  Binaries:
    Node: 12.8.0 - C:\Program Files\nodejs\node.EXE
    Yarn: 1.22.0 - C:\Users\Username\AppData\Roaming\npm\yarn.CMD
    npm: 6.10.2 - C:\Program Files\nodejs\npm.CMD
  IDEs:
    Android Studio: Version  3.5.0.0 AI-191.8026.42.35.6010548
  Languages:
    Java: 1.8.0_211
    Python: 2.7.17
  npmPackages:
    react: 16.8.6 => 16.8.6
    react-native: 0.60.5 => 0.60.5
You can check this with ‘react-native info’ (we only show this because sometime the most up to date versions aren't compatible with react-native, you might not need to worry about this)

##Iphone first time build:
After environment setup
In terminal run ‘npm i’ from project folder 
In ios directory use ‘pod install’ 
‘npx react-native run-ios —simulator=“iPhone11” ‘ starts program on simulator of iphone 11 (have iphone simulator already running) ‘npx react-native run-ios —device’ to run on connected Iphone
(For devices will give error and then command you need to run to install dependencies)

You can run ‘npx react-native start’ in a separate terminal to run the dependency graph for debugging purposes

Error fixes that should have a better solution
Edited app.json to have both name and displayname to be foundation_communities_app

Current problems:
* Error regarding text font during app launch, dismissing it continues to functioning app.
* Build error for (non xcode simulator) direct connection iphone device due to ?dependencies error?
* Push notifications not added to the iPhone version. Resources we would have used to make ios version: https://medium.com/@anum.amin/react-native-integrating-push-notifications-using-fcm-349fff071591


##Android first time build:
Run Terminal as ADMINISTRATOR
After environment setup

Import project from github through Android Studio
In terminal, run ‘npm i’ from project folder to install all of the libraries used by the app

{(onetime)
generate the debug keystore by running this command in the ‘android/app/ directory’: 
“keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000”}

After that you can run ‘react-native start’ in a separate terminal to run the dependency graph for debugging purposes

Run ‘react-native run-android’ in the first terminal to install the app and run the app on the android device



##Some error fixes
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

* From my personal testing of the push notification system:
When the app is running and currently open (meaning it is being used and is on screen), notifications won’t show up on the device
When the app is running but not on screen, notifications do show up
If the app is force closed, notifications won’t show up

*To make a release build: https://reactnative.dev/docs/signed-apk-android  and/or https://www.instamobile.io/android-development/generate-react-native-release-build-android/
(we used latter link building from react native cli)

* To send push notifications, go to cloud messaging in Firebase
