/**
 * Hello World App
 */

import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Navigator from './components/navigators';
//vv import this bc react native sucks at ios and only throws this error for me but not android
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();
//^^ for ios

const App = () => {
  return (
    <View style={styles.styleFlex}>
      <StatusBar
        translucent={true}
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />
      <Navigator />
    </View>
  );
};

const styles = StyleSheet.create({
  styleFlex: {
    flex: 1,
  },
});
export default App;
