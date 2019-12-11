import React from 'react';
import {
  Text, View, ScrollView, Picker, TextInput, StyleSheet,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Touchable from 'react-native-platform-touchable';
import firebase from 'react-native-firebase';
import Geocode from 'react-geocode';
import styles from '../styles/styles';


export default class admin extends React.Component {
  state = {
    locations: [
      {
        title: '',
        description: '',
      }
    ],
    wait: '',
    current: {
      title: '',
      index: 0,
    },
    newLoc: {
      title: '',
      description: '',
    },
  }


  static navigationOptions = {
    headerTitle: <Text style={styles.headertitle}>admin</Text>,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0.8,
      shadowOpacity: 0.8,
    },

  };

  updateLocation() {
    Geocode.fromAddress(this.state.newLoc).then((res) => {
      const { lat, lng } = res.results[0].geometry.location;
      console.log(lat, lng);
    });
  }

  addLocation() {
    const address = this.state.newLoc.description;
    Geocode.fromAddress(address).then((res) => {
      const { latitude, longitude } = res.results[0].geometry.location;
      const markerRef = firebase.database.ref(`locationMap/${this.state.locations.length}`);
      markerRef.child(this.state.locations.length).set({
        coordinate: { latitude, longitude },
        description: this.state.newLoc.description,
        title: this.state.newLoc.title,
      });
    });
  }

  render() {
    const ref = firebase.database().ref('locationMap');
    ref.on('value', (snapshot) => { this.setState({ locations: snapshot.val().markers }); });
    return (
        <ScrollView contentContainerStyle={{
          backgroundColor: '#f6f6f6', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch', paddingBottom: 20,
        }}>
            <Text style={styles.requestTitle}>Choose a location to edit</Text>
            <Picker
              style={{ width: '80%' }}
              selectedValue={this.state.current.title}
              onValueChange={(itemValue, itemIndex) => this.setState({ current: { title: itemValue, index: itemIndex - 1 } })}
            >
            <Picker.Item label ="Select a location" value={{
              title: 'default',
              index: -1,
            }} />
            {this.state.locations.map((location, index) => (
                <Picker.Item key={index} label={location.title} value={location.title}/>
            ))}
            </Picker>

            <Text style={styles.requestTitle}>Enter wait time for the specified location</Text>

            <Input
              style={myStyles.input}
              underlineColorAndroid="transparent"
              placeholder="Enter a wait time."
              placeholderTextColor="#dddddd"
              autoCapitalize="none"
              defaultValue={this.state.wait}
              onChangeText={(wait) => this.setState({ wait })}
            />

            <Touchable
              onPress={() => {
                firebase.database.ref(`locationMap/${this.state.current}`).update({
                  wait: this.state.wait,
                });
              }}
              style={myStyles.submitButton}
            >
              <View>
                  <Text style={styles.cardtext}>
                    Update time
                  </Text>
              </View>
          </Touchable>

          <View style={myStyles.editTools}>
            <Input
              placeholder='Location Name'
              defaultValue={this.state.current.title}
              onChangeText={(title) => { this.setState({ newLoc: { title, description: this.state.newLoc.description }}); }}
            />
            <Input
              placeholder='Location Address'
              defaultValue={ (this.state.current.title !== ''
                ? this.state.locations[this.state.current.index].description
                : '')
              }
              onChangeText={(description) => { this.setState({ newLoc: { title: this.state.newLoc.title, description } }); }}
            />
            <Touchable style={myStyles.submitButton} onPress={ this.updateLocation }>
              <View>
                <Text style={styles.cardtext}>
                  Update Location
                </Text>
              </View>
            </Touchable>
            <Touchable style={myStyles.submitButton} onPress={ () => this.addLocation() }>
              <View>
                <Text style={styles.cardtext}>
                  Add Location
                </Text>
              </View>
            </Touchable>
          </View>
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
  editTools: {
    
  }
});
