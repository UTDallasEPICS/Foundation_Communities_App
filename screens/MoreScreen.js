import React, {useState} from 'react';
import Touchable from 'react-native-platform-touchable';
import {View, TextInput, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import localization from '../localizations';
import CustomText from '../components/CustomText';

const INITIAL_TIME = new Date();

//Login Page
const MoreScreen = () => {
  const navigation = useNavigation();
  const navigationOptions = {
    tabBarLabel: '',
    headerTitle: (
      <CustomText style={styles.headertitle}>Admin Login Screen</CustomText>
    ),
    headerStyle: {
      elevation: 0.4,
      shadowOpacity: 0.4,
    },
  };

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={styles.whiteStyle}>
      <ScrollView>
        <CustomText style={styles.requestTitle}>
          {localization.enterCred}
        </CustomText>
        {/* username input */}
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder={localization.usernameHint}
          placeholderTextColor="#dddddd"
          autoCapitalize="none"
          value={name}
          onChangeText={(nameIn) => setName(nameIn)}
        />
        {/* password input */}
        <TextInput
          textContentType="password"
          secureTextEntry={true}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder={localization.passwordHint}
          placeholderTextColor="#dddddd"
          autoCapitalize="none"
          value={pass}
          onChangeText={(passIn) => setPass(passIn)}
        />
        {/* checks for correct login credentials */}
        <Touchable
          onPress={() => {
            let username = name;
            let password = pass;
            if (username === 'fcadmin' && password === 'F0undCom1040') {
              navigation.navigate('Admin');
            }
          }}
          style={styles.submitButton}>
          <View>
            <CustomText style={styles.cardtext}>
              {localization.loginPrompt}
            </CustomText>
          </View>
        </Touchable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  //from old styles.js
  headertitle: {
    textAlign: 'center',
    fontSize: 30,
    marginLeft: 15,
    fontFamily: 'System',
    color: 'black',
    fontWeight: 'bold',
  },
  whiteStyle: {
    backgroundColor: 'white',
    flex: 1,
  },
  //from old
  requestTitle: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 0,
    fontFamily: 'System',
  },
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
    fontFamily: 'System',
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
  //from old
  cardtext: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'System',
  },
});

export default MoreScreen;
