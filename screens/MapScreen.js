/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';
import firebase from 'react-native-firebase';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Touchable from 'react-native-platform-touchable';
import mystyles from '../styles/styles';
import localization from '../localizations';


// import Geocoder from 'react-native-geocoding';
// Geocoder.setApiKey(AIzaSyCfnhC8DJzYBpGlMKmQG8ukDSOm2w9q5C4);

const INTIIAL_REGION = {
  latitude: 32.7767,
  longitude: -96.797,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};
const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 100;

const styles = StyleSheet.create({
  container: {
    flex: 2.2,
  },
  map: {
    flex: 1,
    width,
    height,
  },
  scrollView: {
    paddingTop: 0,
    marginBottom: 0,
    backgroundColor: '#f2ca6d',
  },
  endPadding: {
    paddingRight: width - (CARD_WIDTH / 0.25),
  },
  card: {
    marginTop: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT + 75,
    width: CARD_WIDTH * 3.5,
    overflow: 'visible',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 1,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: 'red',
  },
  ring: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'transparent',
  },
});

export default class MapScreen extends Component {
  index = 0;

  animation = new Animated.Value(0);

  static navigationOptions = {
    headerTitle: () => <Text style={mystyles.headertitle}>Locations</Text>,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0.8,
      shadowOpacity: 0.8,
    },
  };

  state = {
    markers: [{
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
    }],
    region: {},
    currentLocation: {
      latitude: 0,
      longitude: 0,
    },
    grantedLocation: false,
  };

  async getLocationPermissions() {
    try {
      const hasPermission = await
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

      if (hasPermission) {
        Geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;

          this.setState({ currentLocation: { latitude, longitude } });

          const locs = [...this.state.markers].map((loc) => {
            const dist = (getDistance(loc.coordinate, this.state.currentLocation) * 0.00062137).toFixed(2);

            return {
              ...loc,
              dist,
            };
          });

          locs.sort((loc1, loc2) => {
            return loc1.dist - loc2.dist;
          });

          this.setState({ markers: locs, grantedLocation: true });
        });

        return;
      }

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: localization.locationAccessTitle,
          message: localization.locationAccessMessage,
          buttonNegative: 'Cancel',
          buttonPositive: 'Ok',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;

          this.setState({ currentLocation: { latitude, longitude } });

          const locs = [...this.state.markers].map((loc) => {
            const dist = (getDistance(loc.coordinate, this.state.currentLocation) * 0.00062137)
              .toFixed(2);

            return {
              ...loc,
              dist,
            };
          });

          locs.sort((loc1, loc2) => {
            return loc1.dist - loc2.dist;
          });

          this.setState({ markers: locs, grantedLocation: true });
        });
      } else {
        this.setState({ grantedLocation: false });
      }
    // eslint-disable-next-line no-empty
    } catch {}
  }

  async componentDidMount() {
    // axios.get('https://api.jsonbin.io/b/5bff17e790a73066ac17062b/1').then(response => this.setState(response.data));
    const ref = firebase.database().ref('locationMap');
    await ref.on('value', (snapshot) => { this.setState({ markers: snapshot.val().markers, region: snapshot.val().region }); this.getLocationPermissions(); });

    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      // animate 30% away from landing on the next item
      let index = Math.floor((value / (CARD_WIDTH * 3.5)) + 0.3);
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  }

  render() {
    // const { params } = this.props.navigation.state;
    // const mode = params ? params.mode : 0;
    // const interpolations = this.state.markers.map((marker, index) => {
    //   const inputRange = [
    //     (index - 1) * CARD_WIDTH * 3.5,
    //     index * CARD_WIDTH * 3.5,
    //     ((index + 1) * CARD_WIDTH * 3.5),
    //   ];
    //   const scale = this.animation.interpolate({
    //     inputRange,
    //     outputRange: [1, 2.5, 1],
    //     extrapolate: 'clamp',
    //   });
    //   const opacity = this.animation.interpolate({
    //     inputRange,
    //     outputRange: [0.35, 1, 0.35],
    //     extrapolate: 'clamp',
    //   });
    //   return { scale, opacity };
    // });

    return (
      <View style={styles.container}>
        <MapView
          ref={(map) => { this.map = map; }}
          initialRegion={INTIIAL_REGION}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        >
          {this.state.markers.map((marker, key) => (
            <Marker
              key={key}
              coordinate={marker.coordinate} />
          ))}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH * 3.5}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <Touchable
              style={styles.card}
              key={index}
              onPress={() => this.props.navigation.navigate('Details', {
                title: 'Location',
                location: marker.title,
                description: marker.description,
                image: this.state.markers[index].image,
                waitTime: this.state.markers[index].waitTime,
                lastUpdated: this.state.markers[index].lastUpdated,
              })}
            >
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Image
                  source={marker.image}
                  style={styles.cardImage}
                  resizeMode='cover'
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {marker.description}
                  </Text>
                  {
                    this.state.grantedLocation
                      ? <Text style={styles.cardDescription}>Current Distance: {marker.dist} mi</Text>
                      : <Text style={styles.cardDescription}>Current Distance: Need Location Permissions</Text>
                  }
                  {
                    (marker.waitTime && marker.waitTime > 0)
                      ? <Text style={styles.cardDescription}>Wait Time of {marker.waitTime}, Last Updated {marker.lastUpdated}</Text>
                      : (marker.waitTime
                        ? <Text style={styles.cardDescription}>No Wait Time, Last Updated {marker.lastUpdated}</Text>
                        : <Text style={styles.cardDescription}>Wait Time: Non Available</Text>)
                  }
                </View>
              </View>
            </Touchable>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}
