import React from 'react';
import { Text, ScrollView, View, SafeAreaView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Card, Button, CheckBox } from 'react-native-elements';
import styles from '.././styles/styles';

export default class AboutScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: '',
    headerTitle: <Text style={styles.headertitle}>About Us</Text>,
    headerStyle: {
      elevation: 0.4,
      shadowOpacity: 0.4
    }
  };

    render() {
      return (
        <ImageBackground 
        source={require('../assets/bkg_texture.png')}
        style={styles.container}
        >  
          
          <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch', paddingBottom: 20 }}>
            <Card
              containerStyle={styles.miniHeader}
              dividerStyle={{ backgroundColor: 'transparent' }}
            >
                <View>
                  <Text style={styles.title}>
                    Our Mission
                    </Text>
                </View>
            </Card>
            <Text style={styles.paraText}>Dallas Community Tax Centers offer free tax preparation to individuals and families that make less than $58,000 a year</Text>

            <Card
containerStyle={styles.miniHeader}
              dividerStyle={{ backgroundColor: 'transparent' }}
            >
                <View>
                  <Text style={styles.title}>
                    Our Story
                    </Text>
                </View>
            </Card>
            <Text style={styles.paraText}>
            The Dallas Community Tax Centers is a Foundation Communities program that returns millions of dollars to the local economy by helping low- to moderate-income families take better control of their finances. During the tax season, IRS-certified volunteers offer free tax help to individuals and families who earn less than $60,000 a year. Additionally, CTC is helping develop a scalable model for financial education and coaching that can connect low-income individuals and families with helpful benefits and community resources — and teach them the management skills to keep more of the money they earn
            </Text>
          </ScrollView>
        </ImageBackground>
      );
    }
  }
