import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, Picker, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import Touchable from 'react-native-platform-touchable';
import firebase from 'react-native-firebase';
import Geocode from 'react-geocode';
import Snackbar from 'react-native-snackbar';
import ImagePicker from 'react-native-image-picker';
import localization from '../localizations';
import secrets from '../secrets';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Admin = () => {
  const [locations, setLocations] = useState({title: '', description: ''});
  const [wait, setWait] = useState('');
  const [current, setCurrent] = useState({title: '', index: ''});
  const [newLoc, setNewLoc] = useState({title: '', description: ''});
  const [imgSource, setImgSource] = useState('');

  const navigationOptions = {
    headerTitle: () => <Text style={styles.headertitle}>Admin</Text>,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0.8,
      shadowOpacity: 0.8,
    },
  };

  const updateLocation = () => {
    Geocode.fromAddress(newLoc.description)
      .then((res) => {
        const {lat, lng} = res.results[0].geometry.location;
        const markerRef = firebase.database().ref('locationMap/markers');

        //spreads all the locations data into array
        const newLocations = [...locations];
        newLocations[current.index] = {
          coordinate: {latitude: lat, longitude: lng},
          description: newLoc.description,
          title: newLoc.title,
        };

        setLocations(newLocations);

        markerRef
          .set(newLocations)
          .then(() => {
            Snackbar.show({
              title: 'Location Updated',
              duration: Snackbar.LENGTH_SHORT,
            });

            setCurrent({title: '', index: 0});
            setLocations(newLocations);
          })
          .catch((_err) => {
            Snackbar.show({
              title: 'Error in Updating Location',
              duration: Snackbar.LENGTH_SHORT,
            });
          });
      })
      .catch((_err) => {
        Snackbar.show({
          title: 'Error in Converting Location to lat and lng',
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  const pickImage = () => {
    ImagePicker.showImagePicker(options, (res) => {
      if (res.didCancel) {
        alert('Image Picker Cancelled');
      } else if (res.error) {
        alert('Error Occured: ', res.error);
      } else {
        const source = {uri: res.uri};

        setImgSource(source);
      }
    });
  };

  const uploadImage = () => {
    const name = current.title;
    const storageRef = firebase.storage().ref(`locations/images/${name}`);
    storageRef
      .putFile(imgSource)
      .on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        let status = {
          progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        };
      });
  };

  const addLocation = () => {
    const address = newLoc.description;
    Geocode.fromAddress(address)
      .then((res) => {
        const {lat, lng} = res.results[0].geometry.location;
        const markerRef = firebase.database().ref('locationMap/markers');

        if (locations.find((loc) => loc.title === newLoc.title) !== undefined) {
          Snackbar.show({
            title: 'A Location Already Has That Name',
            duration: Snackbar.LENGTH_SHORT,
          });
          return;
        }

        const newLocations = [...locations];
        newLocations.push({
          coordinate: {latitude: lat, longitude: lng},
          description: newLoc.description,
          title: newLoc.title,
        });

        markerRef
          .set(newLocations)
          .then(() => {
            setCurrent({title: '', index: 0});
            setLocations(newLocations);

            Snackbar.show({
              title: 'Location Added',
              duration: Snackbar.LENGTH_SHORT,
            });
          })
          .catch((_err) => {
            Snackbar.show({
              title: 'Error in Adding Location',
              duration: Snackbar.LENGTH_SHORT,
            });
          });
      })
      .catch((_err) => {
        Snackbar.show({
          title: 'Error in Converting Location to lat and lng',
          duration: Snackbar.LENGTH_INDEFINITE,
        });
      });
  };

  const deleteLocation = () => {
    const currLoc = current;

    const newLocations = [...locations];
    newLocations.splice(currLoc.index, 1);

    setCurrent({title: '', index: 0});
    setLocations(newLocations);

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
      .catch((_err) => {
        Snackbar.show({
          title: 'Error in Deleting Location',
          duration: Snackbar.LENGTH_SHORT,
        });

        const newLocs = [...locations].push(currLoc);
      });
  };

  useEffect(() => {
    Geocode.setApiKey(secrets.google);
    const ref = firebase.database().ref('locationMap');
    ref.on('value', (snapshot) => {
      setLocations(snapshot.val().markers);
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewBG}>
      <Text style={styles.requestTitle}>{localization.editLoc}</Text>
      <Picker
        style={styles.pickerWidth}
        selectedValue={current.title}
        onValueChange={(itemValue, itemIndex) => {
          setCurrent({title: itemValue, index: itemIndex - 1});
        }}>
        <Picker.Item
          label={localization.selectLoc}
          value={{
            title: 'default',
            index: -1,
          }}
        />
        {locations != null
          ? locations.map((location, index) => {
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
        style={styles.input}
        placeholder={localization.waitHint}
        autoCapitalize="none"
        defaultValue={current.waitTime}
        onChangeText={(waitTime) => {
          const newCurr = current;
          newCurr.waitTime = waitTime;
          //is  this for current?
          this.setState({newCurr});
        }}
      />

      <Touchable
        onPress={() => {
          const today = new Date();
          const date = `${today.getFullYear()}-${
            today.getMonth() + 1
          }-${today.getDate()}`;
          const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
          const dateTime = `${date} ${time}`;
          // this.state.current.index = this.state.current.index - 1;
          firebase
            .database()
            .ref(`locationMap/markers/${current.index}/`)
            .update({
              waitTime: current.waitTime,
              lastUpdated: dateTime,
            })
            .then(() => {
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

      <View style={styles.editTools}>
        <Input
          placeholder={localization.locNameHint}
          defaultValue={
            locations != null &&
            locations[current.index] != null &&
            current.title !== ''
              ? locations[current.index].title
              : ''
          }
          onChangeText={(title) => {
            if (newLoc.description !== '') {
              setNewLoc({title, description: newLoc.description});
            } else {
              setNewLoc({title, description: current.description});
            }
          }}
        />
        <Input
          placeholder={localization.locAddHint}
          defaultValue={
            locations != null &&
            locations[current.index] != null &&
            current.title !== ''
              ? locations[current.index].description
              : ''
          }
          onChangeText={(description) => {
            if (newLoc.title !== '') {
              setNewLoc({title: newLoc.title, description});
            } else {
              setNewLoc({title: current.title, description});
            }
          }}
        />
        <Touchable style={styles.mySubmitButton} onPress={this.updateLocation}>
          <View>
            <Text style={styles.cardtext}>{localization.locPrompt}</Text>
          </View>
        </Touchable>
        <Touchable
          style={styles.mySubmitButton}
          onPress={() => this.addLocation()}>
          <View>
            <Text style={styles.cardtext}>{localization.addPrompt}</Text>
          </View>
        </Touchable>
        <Touchable
          style={styles.mySubmitButton}
          onPress={() => this.deleteLocation()}>
          <View>
            <Text style={styles.cardtext}>{localization.deletePrompt}</Text>
          </View>
        </Touchable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  requestTitle: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 0,
    fontFamily: 'System',
  },
  submitButton: {
    backgroundColor: '#2196f3',
    borderRadius: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    paddingBottom: 5,
    paddingTop: 8,
  },
  cardtext: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'System',
  },
  scrollViewBG: {
    backgroundColor: '#f6f6f6',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingBottom: 20,
  },
  pickerWidth: {
    width: '80%',
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
  mySubmitButton: {
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

export default Admin;
