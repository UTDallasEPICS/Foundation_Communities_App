import React from 'react';
import {
  Text, View, ScrollView, Picker, StyleSheet,
} from 'react-native';
import { Input } from 'react-native-elements';
import Touchable from 'react-native-platform-touchable';
import firebase from 'react-native-firebase';
import Geocode from 'react-geocode';
import Snackbar from 'react-native-snackbar';
import ImagePicker from 'react-native-image-picker';
import styles from '../styles/styles';
import localization from '../localizations';
import secrets from '../secrets';

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
  photos: {
    width: 90,
    height: 90,
  },
  editTools: {},
});

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

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
    imgSource: '',
  };

  static navigationOptions = {
    headerTitle: () => <Text style={styles.headertitle}>Admin</Text>,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0.8,
      shadowOpacity: 0.8,
    },
  };

  updateLocation() {
    Geocode.fromAddress(this.state.newLoc.description)
      .then((res) => {
        const { lat, lng } = res.results[0].geometry.location;
        const markerRef = firebase.database().ref('locationMap/markers');

        const newLocations = [...this.state.locations];
        newLocations[this.state.current.index] = {
          coordinate: { latitude: lat, longitude: lng },
          description: this.state.newLoc.description,
          title: this.state.newLoc.title,
        };

        this.setState({ locations: newLocations });

        markerRef
          .set(newLocations)
          .then(() => {
            Snackbar.show({
              title: 'Location Updated',
              duration: Snackbar.LENGTH_SHORT,
            });

            this.setState({
              current: {
                title: '',
                index: 0,
              },
              locations: newLocations,
            });
          })
          .catch((err) => {
            Snackbar.show({
              title: 'Error in Updating Location',
              duration: Snackbar.LENGTH_SHORT,
            });
          });
      })
      .catch((err) => {
        Snackbar.show({
          title: 'Error in Converting Location to lat and lng',
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  }

  pickImage = () => {
    ImagePicker.showImagePicker(options, (res) => {
      if (res.didCancel) {
        alert('Image Picker Cancelled');
      } else if (res.error) {
        alert('Error Occured: ', res.error);
      } else {
        const source = { uri: res.uri };

        this.setState({
          imgSource: source,
        });
      }
    });
  }

  uploadImage() {
    const name = this.state.current.title;
    const storageRef = firebase.storage().ref(`locations/images/${name}`);
    storageRef.putFile(this.state.imgSource)
      .on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        let status = {
          progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        };
      });
  }

  addLocation() {
    const address = this.state.newLoc.description;
    Geocode.fromAddress(address)
      .then((res) => {
        const { lat, lng } = res.results[0].geometry.location;
        const markerRef = firebase.database().ref('locationMap/markers');


        if (
          this.state.locations.find(
            (loc) => loc.title === this.state.newLoc.title,
          ) !== undefined
        ) {
          Snackbar.show({
            title: 'A Location Already Has That Name',
            duration: Snackbar.LENGTH_SHORT,
          });
          return;
        }

        const newLocations = [...this.state.locations];
        newLocations.push({
          coordinate: { latitude: lat, longitude: lng },
          description: this.state.newLoc.description,
          title: this.state.newLoc.title,
        });

        markerRef
          .set(newLocations)
          .then(() => {
            this.setState({
              current: {
                title: '',
                index: 0,
              },
              locations: newLocations,
            });

            Snackbar.show({
              title: 'Location Added',
              duration: Snackbar.LENGTH_SHORT,
            });
          })
          .catch((err) => {
            Snackbar.show({
              title: 'Error in Adding Location',
              duration: Snackbar.LENGTH_SHORT,
            });
          });
      })
      .catch((err) => {
        Snackbar.show({
          title: 'Error in Converting Location to lat and lng',
          duration: Snackbar.LENGTH_INDEFINITE,
        });
      });
  }

  deleteLocation() {
    const currLoc = this.state.current;

    const newLocations = [...this.state.locations];
    newLocations.splice(currLoc.index, 1);

    this.setState({
      current: {
        title: '',
        index: 0,
      },
      locations: newLocations,
    });

    const markerRef = firebase.database().ref('locationMap/markers');

    markerRef
      .set(newLocations)
      .then(() => {
        console.log('deleted');
        Snackbar.show({
          title: 'Location Deleted',
          duration: Snackbar.LENGTH_SHORT,
        }); 
      })
      .catch((err) => {
        Snackbar.show({
          title: 'Error in Deleting Location',
          duration: Snackbar.LENGTH_SHORT,
        });

        const newLocs = [...this.state.locations].push(cu);
      });
  }

  componentDidMount() {
    Geocode.setApiKey(secrets.google);
    const ref = firebase.database().ref('locationMap');
    ref.on('value', (snapshot) => {
      this.setState({ locations: snapshot.val().markers });
    });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#f6f6f6',
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          paddingBottom: 20,
        }}>
        <Text style={styles.requestTitle}>{localization.editLoc}</Text>
        <Picker
          style={{ width: '80%' }}
          selectedValue={this.state.current.title}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ current: { title: itemValue, index: itemIndex - 1 } });
          }}>
          <Picker.Item
            label={localization.selectLoc}
            value={{
              title: 'default',
              index: -1,
            }}
          />
          {this.state.locations != null
            ? this.state.locations.map((location, index) => {
              const picker = (
                  <Picker.Item
                    key={index}
                    label={location.title}
                    value={location.title}
                  />
              );

              return picker;
            })
            : null}
        </Picker>

        <Text style={styles.requestTitle}>{localization.enterWait}</Text>

        <Input
          style={myStyles.input}
          placeholder={localization.waitHint}
          autoCapitalize="none"
          defaultValue={this.state.current.waitTime}
          onChangeText={(waitTime) => {
            const newCurr = this.state.current;
            newCurr.waitTime = waitTime;
            this.setState({ newCurr });
          }}
        />

        <Touchable
          onPress={() => {
            const today = new Date();
            const date = `${today.getFullYear()}-${today.getMonth()
              + 1}-${today.getDate()}`;
            const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
            const dateTime = `${date} ${time}`;
            // this.state.current.index = this.state.current.index - 1;
            firebase
              .database()
              .ref(`locationMap/markers/${this.state.current.index}/`)
              .update({
                waitTime: this.state.current.waitTime,
                lastUpdated: dateTime,
              }).then(() => {
                Snackbar.show({
                  title: 'Wait Time Updated',
                  duration: Snackbar.LENGTH_SHORT,
                });
              })
              .catch(() => {
                Snackbar.show({
                  title: 'Error in Updating Wait Time',
                  duration: Snackbar.LENGTH_SHORT,
                });
              });
          }}
          style={styles.submitButton}>
          <View>
            <Text style={styles.cardtext}>{localization.timePrompt}</Text>
          </View>
        </Touchable>

        <View style={myStyles.editTools}>
          <Input
            placeholder={localization.locNameHint}
            defaultValue={
              this.state.locations != null
              && this.state.locations[this.state.current.index] != null
              && this.state.current.title !== ''
                ? this.state.locations[this.state.current.index].title
                : ''
            }
            onChangeText={(title) => {
              if (this.state.newLoc.description !== '') {
                this.setState({
                  newLoc: { title, description: this.state.newLoc.description },
                });
              } else {
                this.setState({
                  newLoc: { title, description: this.state.current.description },
                });
              }
            }}
          />
          <Input
            placeholder={localization.locAddHint}
            defaultValue={
              this.state.locations != null
              && this.state.locations[this.state.current.index] != null
              && this.state.current.title !== ''
                ? this.state.locations[this.state.current.index].description
                : ''
            }
            onChangeText={(description) => {
              if (this.state.newLoc.title !== '') {
                this.setState({
                  newLoc: { title: this.state.newLoc.title, description },
                });
              } else {
                this.setState({
                  newLoc: { title: this.state.current.title, description },
                });
              }
            }}
          />
          <Touchable
            style={myStyles.submitButton}
            onPress={this.updateLocation}>
            <View>
              <Text style={styles.cardtext}>{localization.locPrompt}</Text>
            </View>
          </Touchable>
          <Touchable
            style={myStyles.submitButton}
            onPress={() => this.addLocation()}>
            <View>
              <Text style={styles.cardtext}>{localization.addPrompt}</Text>
            </View>
          </Touchable>
          <Touchable
            style={myStyles.submitButton}
            onPress={() => this.deleteLocation()}>
            <View>
              <Text style={styles.cardtext}>{localization.deletePrompt}</Text>
            </View>
          </Touchable>
        </View>
      </ScrollView>
    );
  }
}
