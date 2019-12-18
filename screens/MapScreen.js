import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import firebase from 'react-native-firebase';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Touchable from 'react-native-platform-touchable';
import mystyles from '../styles/styles';


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
    backgroundColor: '#f2ca6d',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT - 15,
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
    headerTitle: <Text style={mystyles.headertitle}>Locations</Text>,
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
      }
    }],
    region: {},
  };

  componentDidMount() {
    // axios.get('https://api.jsonbin.io/b/5bff17e790a73066ac17062b/1').then(response => this.setState(response.data));
    //const ref = firebase.database().ref('locationMap');
    //ref.on('value', (snapshot) => { this.setState({ markers: snapshot.val().markers, region: snapshot.val().region }); });

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
    const { params } = this.props.navigation.state;
    const mode = params ? params.mode : 0;
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH * 3.5,
        index * CARD_WIDTH * 3.5,
        ((index + 1) * CARD_WIDTH * 3.5),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: 'clamp',
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: 'clamp',
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={INTIIAL_REGION}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        >
          {this.state.markers.map((marker, key) => (
            <Marker
              key={key}
              coordinate={marker.coordinate}
            />
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
            })
            }
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
                </View>
              </View>
            </Touchable>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}