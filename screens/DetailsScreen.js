import React from 'react';
import { Button, Text, View, SafeAreaView, Linking, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import Touchable from 'react-native-platform-touchable';


import styles from '.././styles/styles';

/* Class is used for Maps Details screen */

export default class DetailsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    
    return {
      tabBarLabel: '',
      headerTitle: <Text style={styles.headertitle}>{params ? params.title : 'null'}</Text>,
      headerStyle: {
        elevation: 0.4,
        shadowOpacity: 0.4
      }
    };
  };

  //params ? params.title.length <= 30 ? params.title : params.title.substring(0, 31)+ "..."

  /*static navigationOptions = {
    tabBarLabel: '',
    headerTitle: <Text style={ styles.headertitle }>Details</Text>,
    headerStyle: {
      elevation: 0.4,
      shadowOpacity: 0.4
    }
  };*/

    render() {
      const { params } = this.props.navigation.state;
      const title = params ? params.title : null;
      const location = params ? params.location : null;
      const description = params ? params.description : null;
      const image = params ? params.image : null;

      return (
        <View style={{ backgroundColor: 'white', paddingTop: 20, flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Text style={styles.cardtitleBlack}>{location}</Text>
        <ImageBackground
                  style={{ flex: 1, margin: 10, marginTop: 20 }} 
                  source={image}
        >
                  <View style={{ flex: 1 }} />
                  </ImageBackground>
        <Text style={[styles.cardtitleBlack, { marginTop: 20 }]}>{description}</Text>
        <View style={{ backgroundColor: 'white', paddingTop: 20, flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Touchable
          onPress={() => { Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin&destination=${description}`); }} 
          style={[styles.button, { backgroundColor: '#888888' }]}
          > 
            <View>
                <Text style={styles.cardtext}>
                  Open in Google Maps
                </Text>
            </View>
          </Touchable>
        </View>
        </View>
      );
    }
  }
