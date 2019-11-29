import React from 'react';
import {
  Text, View, ScrollView, Linking, ImageBackground, Picker,TextInput,StyleSheet,
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import styles from '../styles/styles';
import { declareExportAllDeclaration } from '@babel/types';
import firebase from 'react-native-firebase';


export default class admin extends React.Component {
  state = {
    locations: [],
    wait: "",
    current: ""
  }



  static navigationOptions = {
    headerTitle: <Text style={styles.headertitle}>admin</Text>,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0.8,
      shadowOpacity: 0.8,
    },
  
  };

  render() {
    const ref = firebase.database().ref('locationMap');
    ref.on('value', (snapshot) => {this.setState({locations: snapshot.val().markers})});
    return (
        
    
        <ScrollView contentContainerStyle={{ backgroundColor: '#f6f6f6', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch', paddingBottom: 20 }}>

            <Text style={styles.requestTitle}>Choose a location to edit</Text>
            <Picker
            style={{width: '80%'}}
            selectedValue={this.state.current}
            onValueChange={(itemValue, itemIndex) => this.setState({current : itemIndex})}
            > 
            <Picker.Item label ="Select a location" value="loc"  />
            {this.state.locations.map((location, index) => (
                <Picker.Item key={index} label={location.title}/>
              ))}
            </Picker>

            <Text style={styles.requestTitle}>Enter wait time for the specified location</Text>

            <TextInput
            style={myStyles.input}
            underlineColorAndroid="transparent"
            placeholder="Enter a wait time."
            placeholderTextColor="#dddddd"
            autoCapitalize="none"
            value={this.state.wait}
            onChangeText={(wait) => this.setState({ wait })}
          />
          <Touchable
          onPress={() =>  
                        {firebase.database.ref('locationMap/' + this.state.current).update({
                            wait: this.state.wait
                          })}
                          }  
          style={styles.submitButton}
          >
            <View>
                <Text style={styles.cardtext}>
                  Update time
                </Text>
            </View>
        </Touchable>
        </ScrollView>
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

