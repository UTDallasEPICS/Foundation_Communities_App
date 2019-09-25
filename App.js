import React from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import { setCustomText } from 'react-native-global-props';
import AppContent from './navigators';

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {

    const fonts = {
      style: {
        fontFamily: 'Roboto',
      },
    };

    setCustomText(fonts);

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      this.state.fontLoaded
        ? (
          <View style={{ flex: 1 }}>
            <StatusBar translucent={true} backgroundColor="#fff" barStyle="dark-content"/>
            <AppContent />
          </View>
        )
        : null
    );
  }
}
