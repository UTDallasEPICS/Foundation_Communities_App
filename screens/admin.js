import React from 'react';
import {
  Text, View, ScrollView, Picker, StyleSheet,
} from 'react-native';
import { Input } from 'react-native-elements';
import Touchable from 'react-native-platform-touchable';
import firebase from 'react-native-firebase';
import Geocode from 'react-geocode';
import Snackbar from 'react-native-snackbar';
import styles from '../styles/styles';
import localization from '../localizations';

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

  },
});

export default class admin extends React.Component {
  state = {
    locations: [
      {
        title: '',
        description: '',
      },
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
    headerTitle: () => <Text style={styles.headertitle}>Admin</Text>,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0.8,
      shadowOpacity: 0.8,
    },
  };

  updateLocation() {
    Geocode.setApiKey('AIzaSyBX1mD3OdwDcO2a6LGCUo-bnqBaopTji8A');

    Geocode.fromAddress(this.state.newLoc.description).then((res) => {
      const { lat, lng } = res.results[0].geometry.location;
      const markerRef = firebase.database().ref('locationMap/markers');

      markerRef.child(this.state.current.index).set({
        coordinate: { latitude: lat, longitude: lng },
        description: this.state.newLoc.description,
        title: this.state.newLoc.title,
      });

      Snackbar.show({
        title: 'Location Updated',
        duration: Snackbar.LENGTH_SHORT,
      });
    }).catch(() => {
      Snackbar.show({
        title: 'Error in Updating Location',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  }

  addLocation() {
    Geocode.setApiKey('AIzaSyBX1mD3OdwDcO2a6LGCUo-bnqBaopTji8A');
    const address = this.state.newLoc.description;
    Geocode.fromAddress(address).then((res) => {
      const { lat, lng } = res.results[0].geometry.location;
      const markerRef = firebase.database().ref('locationMap/markers');

      markerRef.child(this.state.locations.length).set({
        coordinate: { latitude: lat, longitude: lng },
        description: this.state.newLoc.description,
        title: this.state.newLoc.title,
      });

      const newLocations = this.state.locations;
      newLocations.push({
        coordinate: { latitude: lat, longitude: lng },
        description: this.state.newLoc.description,
        title: this.state.newLoc.title,
      });

      Snackbar.show({
        title: 'Location Added',
        duration: Snackbar.LENGTH_SHORT,
      });
    }).catch((err) => {
      Snackbar.show({
        title: `Error in Adding Location ${err}`,
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  }

  deleteLocation() {
    const currLoc = this.state.current;
    this.setState(
      {
        current: {
          title: '',
          index: 0,
        },
        locations: this.state.locations.map((loc) => loc.title !== currLoc.title),
      },
    );

    firebase.database().ref(`locationMap/markers/${currLoc.index}`)
      .remove()
      .then(() => {
        Snackbar.show({
          title: 'Location Deleted',
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .catch(() => {
        Snackbar.show({
          title: 'Error in Deleting Location',
          duration: Snackbar.LENGTH_SHORT,
        });

        this.setState({
          locations: this.state.locations.push(currLoc),
        });
      });
  }

  componentDidMount() {
    const ref = firebase.database().ref('locationMap');
    ref.on('value', (snapshot) => {
      this.setState({ locations: snapshot.val().markers }); Snackbar.show({
        title: `${this.state.locations.length}`,
        duration: Snackbar.LENGTH_LONG,
      });
    });
  }

  render() {
    return (
        <ScrollView contentContainerStyle={{
          backgroundColor: '#f6f6f6', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch', paddingBottom: 20,
        }}>
            <Text style={styles.requestTitle}>{localization.editLoc}</Text>
            <Picker
              style={{ width: '80%' }}
              selectedValue={this.state.current.title}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ current: { title: itemValue, index: itemIndex - 1 } });
              }}
            >
              <Picker.Item label={ localization.selectLoc } value={{
                title: 'default',
                index: -1,
              }} />
              {this.state.locations.map((location, index) => {
                const picker = (
                  <Picker.Item key={index} label={location.title} value={location.title}/>
                );

                console.debug(`${location.title}\n ${index}\n ${this.state.locations.length}`);

                return picker;
              })}
            </Picker>

            <Text style={styles.requestTitle}>
              {localization.enterWait}
            </Text>

            <Input
              style={myStyles.input}
              placeholder={localization.waitHint}
              autoCapitalize="none"
              defaultValue={this.state.wait}
              onChangeText={(wait) => this.setState({ wait })}
            />

          <Touchable
            onPress={() => {
              const today = new Date();
              const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
              const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
              const dateTime = `${date} ${time}`;
              this.state.current.index = this.state.current.index - 1;
              firebase.database().ref(`locationMap/markers/${this.state.current.index}/`).update({
                waitTime: this.state.wait,
                lastUpdated: dateTime,
              });
            }}
            style={styles.submitButton}
          >
            <View>
                <Text style={styles.cardtext}>
                  {localization.timePrompt}
                </Text>
            </View>
          </Touchable>

          <View style={myStyles.editTools}>
            <Input
              placeholder={localization.locNameHint}
              defaultValue={((this.state.locations[this.state.current.index] != null && this.state.current.title !== '')
                ? this.state.locations[this.state.current.index].title
                : '')}
              onChangeText={(title) => {
                if (this.state.newLoc.description !== '') {
                  this.setState({ newLoc: { title, description: this.state.newLoc.description } });
                } else {
                  this.setState({ newLoc: { title, description: this.state.current.description } });
                }
              }}
            />
            <Input
              placeholder={localization.locAddHint}
              defaultValue={ ((this.state.locations[this.state.current.index] != null && this.state.current.title !== '')
                ? this.state.locations[this.state.current.index].description
                : '')
              }
              onChangeText={(description) => {
                if (this.state.newLoc.title !== '') {
                  this.setState({ newLoc: { title: this.state.newLoc.title, description } });
                } else {
                  this.setState({ newLoc: { title: this.state.current.title, description } });
                }
              }}
            />
            <Touchable style={myStyles.submitButton} onPress={ this.updateLocation }>
              <View>
                <Text style={styles.cardtext}>
                  {localization.locPrompt}
                </Text>
              </View>
            </Touchable>
            <Touchable style={myStyles.submitButton} onPress={ () => this.addLocation() }>
              <View>
                <Text style={styles.cardtext}>
                  {localization.addPrompt}
                </Text>
              </View>
            </Touchable>
            <Touchable style={myStyles.submitButton} onPress={ () => this.deleteLocation() }>
              <View>
                <Text style={styles.cardtext}>
                  {localization.deletePrompt}
                </Text>
              </View>
            </Touchable>
          </View>
        </ScrollView>
    );
  }
}
