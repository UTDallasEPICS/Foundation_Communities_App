import React, {Component} from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import { setCustomText } from 'react-native-global-props';
import AppContent from './navigators';
import { AsyncStorage } from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';

export default class App extends React.Component {

  state = {
    fontLoaded: false,
  };

//---------------------------------------------------------------------
  storeData = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', 'stored value')
    } catch (e) {
      // saving error
    }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
  }
}
//--------------------------------------------------------------------

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();

    const fonts = {
      style: {
        fontFamily: 'Roboto',
      },
    };

    setCustomText(fonts);

    this.setState({ fontLoaded: true });
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }

  async getToken() {
    try{
      let fcmToken = await AsyncStorage.getItem('fcmToken'); //Here is where I added the try/catch block******
    } catch(e) {
      //console.log(e);
    }

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }

  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

    //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      this.state.fontLoaded
        ? (
          <View style={{ flex: 1 }}>
            <StatusBar translucent={true} backgroundColor="#ffffff" barStyle="dark-content"/>
            <AppContent />
          </View>
        )
        : null
    );
  }

}