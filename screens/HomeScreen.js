import React from 'react';
import { Text, View, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Card, Button } from 'react-native-elements';
import styles from '.././styles/styles';
import Touchable from 'react-native-platform-touchable';

export default class HomeScreen extends React.Component {
  
  static navigationOptions = {
    headerTitle: <Text style={styles.headertitle}>Home</Text>,
    headerStyle: {
        backgroundColor: 'white',
        elevation: 0.8,
        shadowOpacity: 0.8
    }
  };
    
    render() {
      return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#f6f6f6', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch', paddingBottom: 20 }}>
            <Touchable onPress={() => this.props.navigation.navigate('About')} style={styles.cardStyle} >
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <ImageBackground
                  style={{ flex: 1, height: 200 }} 
                  source={require('.././assets/images/AboutUs.jpg')}
                  >
                  <View style={{ flex: 1 }} />
                  </ImageBackground>
                    <Text style={[styles.cardtitleBlack, { marginTop: 10 }]}>
                      About Us
                    </Text>
                    <Text style={styles.cardtextBlack}>
                      Learn about Community Tax Centers and what we do by clicking here
                    </Text>
                </View>
          </Touchable>

          <Touchable onPress={() => this.props.navigation.navigate('Free')} style={[styles.cardStyle]} >
                <View>
                  <Text style={styles.cardtitleBlack}>
                    Free Tax Filing
                  </Text>
                  <Text style={styles.cardtextBlack}>
                    We can do your taxes for free. Click to learn more
                  </Text>
                </View>

          </Touchable>

          <Touchable style={[styles.cardStyle]} onPress={() => { Linking.openURL('http://www.foundcom.org/wp-content/uploads/2014/10/What-to-Bring-Checklist-Bilingual.pdf') ;}} style={styles.cardStyle} >
                <View>
                  <Text style={styles.cardtitleBlack}>
                    Item Checklist
                  </Text>
                  <Text style={styles.cardtextBlack}>
                    Make sure you bring everything needed to your appointment by downloading this checklist!
                  </Text>
                </View>

          </Touchable>

          <Touchable onPress={() => { Linking.openURL('https://www.facebook.com/DallasCTC/'); }} style={[styles.cardStyle, { height: 80, backgroundColor: '#4267B2' }]} >
                <View>
                  <Text style={[styles.cardtitle, { marginBottom: 10 }]}>
                    Find us on Facebook
                  </Text>
                  <Text style={styles.cardtext}>
                    Visit our Facebook page to find out more
                  </Text>
                </View>

          </Touchable>
          
        </ScrollView>
      );
    }
  }
