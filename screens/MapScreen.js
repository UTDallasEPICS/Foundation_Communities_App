import React, {Component, useState} from 'react';
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
import {getDistance} from 'geolib';
import firebase from 'react-native-firebase';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Touchable from 'react-native-platform-touchable';
import localization from '../localizations';

const INTIIAL_REGION = {
  latitude: 32.7767,
  longitude: -96.797,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};
const {width, height} = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 100;

const MapScreen = () => {
  let index = 0;
  let animation = new Animated.Value(0);

  const navigationOptions = {
    headerTitle: () => <Text style={styles.headertitle}>Locations</Text>,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0.8,
      shadowOpacity: 0.8,
    },
  };

  const [markers, setMarkers] = useState({
    coordinate: {
      latitude: 0,
      longitude: 0,
    },
  });
  const [region, setRegion] = useState({});
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [grantedLocation, setGrantedLocation] = useState(false);

  //   getLocationPermissions = async() => {
  //       try {

  //       }
  //   }
};

const styles = StyleSheet.create({
  headertitle: {
    textAlign: 'center',
    fontSize: 30,
    marginLeft: 15,
    fontFamily: 'System',
    color: 'black',
    fontWeight: 'bold',
  },
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
    paddingRight: width - CARD_WIDTH / 0.25,
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
    shadowOffset: {x: 2, y: -2},
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
