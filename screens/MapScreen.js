import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  MapView,
} from 'react-native';
import firebase from 'react-native-firebase';
import Touchable from 'react-native-platform-touchable';
import mystyles from '../styles/styles';

// import Geocoder from 'react-native-geocoding';
// Geocoder.setApiKey(AIzaSyCfnhC8DJzYBpGlMKmQG8ukDSOm2w9q5C4);

const INTIIAL_REGION = {
  latitude: 32.7767,
  longitude: -96.797,
  latitudeDelta: 0.04864195044303443,
  longitudeDelta: 0.040142817690068,
};
const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 100;

const streetName = 'hold';

class MapScreen extends Component {
  static navigationOptions = {
    headerTitle: <Text style={mystyles.headertitle}>Locations</Text>,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0.8,
      shadowOpacity: 0.8,
    },
  };

  state = { markers: [], region: {} };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    // axios.get('https://api.jsonbin.io/b/5bff17e790a73066ac17062b/1').then(response => this.setState(response.data));
    const ref = firebase.database().ref('locationMap');
    ref.on('value', (snapshot) => { this.setState({ markers: snapshot.val().markers, region: snapshot.val().region }); });
  }

  componentDidMount() {
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
          ref={(map) => this.map = map}
          initialRegion={INTIIAL_REGION}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker
              key={index}
              name={marker.title}
              coordinate={marker.coordinate}
              lat={marker.coordinate.latitude}
              long={marker.coordinate.longitude}
              >
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <View style={styles.marker} />
                </Animated.View>

              </MapView.Marker>
            );
          })}
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

const styles = StyleSheet.create({
  container: {
    flex: 2.2,
  },
  scrollView: {
    paddingTop: 0,
    marginBottom: 0,
    backgroundColor: '#fafafa',
  },
  endPadding: {
    paddingRight: width - (CARD_WIDTH / 0.25),
  },
  card: {
    marginTop: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
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

export default MapScreen;
