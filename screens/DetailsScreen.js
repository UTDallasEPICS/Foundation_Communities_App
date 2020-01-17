/* eslint-disable react/prop-types */
import React from 'react';
import {
  Text, View, Linking, ImageBackground, Alert,
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import styles from '../styles/styles';
import localization from '../localizations';

/* Class is used for Maps Details screen */

export default class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      tabBarLabel: '',
      headerTitle: () => <Text style={styles.headertitle}>{params ? params.title : 'null'}</Text>,
      headerStyle: {
        elevation: 0.4,
        shadowOpacity: 0.4,
      },
    };
  };

  // params ? params.title.length <= 30 ? params.title : params.title.substring(0, 31)+ "..."

  /* static navigationOptions = {
    tabBarLabel: '',
    headerTitle: <Text style={ styles.headertitle }>Details</Text>,
    headerStyle: {
      elevation: 0.4,
      shadowOpacity: 0.4
    }
  }; */

  render() {
    const { params } = this.props.navigation.state;
    const location = params ? params.location : null;
    const description = params ? params.description : null;
    const image = params ? params.image : null;

    // 48 -- paddingTop: 20, 59 -- paddingTop: 20
    return (
        <View style={{
          backgroundColor: 'white', paddingTop: 20, flex: 1, flexDirection: 'column', justifyContent: 'flex-start',
        }}>
        <Text style={styles.cardtitleBlack}>{location}</Text>
        <ImageBackground
                  style={{ flex: 2, margin: 10, marginTop: 20 }}
                  source={image}
        >
                  <View style={{ flex: 2.5 }} />
                  </ImageBackground>
        <Text style={[styles.cardtitleBlack, { marginTop: 20 }]}>{description}</Text>


        <View style={{
          backgroundColor: 'white', paddingTop: 20, flex: 1, flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          <Touchable
            onPress={() => { Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin&destination=${description}`); }}
            style={[styles.button, { backgroundColor: '#888888' }]}
          >
            <View>
              <Text style={styles.cardtext}>
                {localization.openMaps}
              </Text>
            </View>
          </Touchable>
        </View>


        <View style={{
          backgroundColor: 'white', paddingTop: 5, flex: 1, flexDirection: 'column', justifyContent: 'center',
        }}>
          <Touchable
            onPress={() => { this.getETA(location); }}
            style={[styles.button, { backgroundColor: '#888888' }]}
          >
            <View>
              <Text style={styles.cardtext}>
                {localization.getWait}
              </Text>
            </View>
          </Touchable>
        </View>

        </View>
    );
  }

    getETA = (currentLocation) => {
      let compDate = '';
      console.log('TESTING');
      // first get the current date
      const curdate = new Date();
      const strdate = curdate.toString();
      let indext = strdate.indexOf(' ');
      let day = strdate.substring(indext + 1);
      indext = strdate.indexOf(' ');
      day = day.substring(indext + 1);
      indext = day.indexOf(' ');
      day = day.substring(0, indext);

      if (curdate.getMonth() + 1 < 10) {
        compDate = '0';
      }

      compDate += (curdate.getMonth() + 1);
      compDate += '/';
      compDate += day;
      compDate += '/';
      compDate += (curdate.getFullYear() - 2000);
      // now we have a date that matches what we have in the firebase
      // compDate should contain: mm/dd/yyyy

      compDate += '_';
      compDate += currentLocation;
      console.log(compDate);
      // now compdate holds the currentLocation and the date
      const { params } = this.props.navigation.state;
      const wait = params ? params.waitTime : null;
      const update = params ? params.lastUpdated : null;

      Alert.alert(`${localization.waitContent} ${wait}\n${localization.updatedContent} ${update}`);
    }
}
