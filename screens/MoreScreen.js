import React from 'react';
import Touchable from 'react-native-platform-touchable';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import localization from '../localizations';

import styles from '../styles/styles';


const INITIAL_TIME = new Date();
class MoreScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: '',
    headerTitle: <Text style={styles.headertitle}>Admin Login Screen</Text>,
    headerStyle: {
      elevation: 0.4,
      shadowOpacity: 0.4,
    },
  };

    state = {
      name: '',
      pass: '',
    };


    render() {
      return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView>
          <Text style={styles.requestTitle}>{ localization.enterCred }</Text>

          <TextInput
            style={myStyles.input}
            underlineColorAndroid="transparent"
            placeholder={ localization.usernameHint }
            placeholderTextColor="#dddddd"
            autoCapitalize="none"
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
          />
          <TextInput
            textContentType="password"
            secureTextEntry={true}
            style={myStyles.input}
            underlineColorAndroid="transparent"
            placeholder={ localization.passwordHint }
            placeholderTextColor="#dddddd"
            autoCapitalize="none"
            value={this.state.pass}
            onChangeText={(pass) => this.setState({ pass })}
          />


          <Touchable
            onPress={() => {
              if (this.state.name === 'fcadmin' && this.state.pass === 'F0undCom1040!') {
                this.props.navigation.navigate('admin');
              }
            }}
            style={styles.submitButton}
          >
            <View>
                <Text style={styles.cardtext}>
                  { localization.loginPrompt }
                </Text>
            </View>
        </Touchable>
      </ScrollView>
      </View>
      );
    }
}

const myStyles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  title: {
    backgroundColor: 'transparent',
    padding: 10,
    fontSize: 22,
    textAlign: 'center',
  },
  input: {
    margin: 15,
    padding: 5,
    height: 40,
    borderColor: '#aaaaaa',
    borderRadius: 4,
    borderWidth: 1,
    fontFamily: 'mainFont',
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
});

export default MoreScreen;
