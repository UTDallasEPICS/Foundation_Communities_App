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
    locations: []
  }

  componentDidMount() {
    
  }

  clickme=()=>{
    var data = this.state.PickerValue;
    if(data=="")
    {
      alert("Please select a location");
    }
    alert(this.state.Pickervalue);
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
            selectedValue={this.state.PickerValue}
            onValueChange={(itemValue, itemIndex) => this.setState({PickerValue : itemValue})}
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
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
          />

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

