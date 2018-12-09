import React from 'react';
import { Text, ScrollView, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Card, Button } from 'react-native-elements';
import styles from ".././styles/styles";

export default class FreeTaxScreen extends React.Component {

  static navigationOptions = {
    tabBarLabel: '',
    headerTitle: <Text style={ styles.headertitle }>Free Tax Filing</Text>,
    headerStyle: {
      elevation: 0.4,
      shadowOpacity: 0.4
    }
  };

    render() {
      return (
        <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch', paddingBottom: 20}}>
          <Card containerStyle={styles.miniHeader}
            dividerStyle={{backgroundColor: 'transparent'}}>
              <View>
                <Text style={styles.title}>
                  Free Tax Filing
                  </Text>
              </View>
          </Card>
          <Text style={styles.paraText}>The Dallas Community Tax Centers provide free tax preparation for low-income families and individuals.</Text>

          <Card containerStyle={styles.miniHeader}
            dividerStyle={{backgroundColor: 'transparent'}}>
              <View>
                <Text style={styles.title}>
                  Eligibility
                  </Text>
              </View>
          </Card>
          <Text style={styles.paraText}>We prepare taxes for free for individuals and families who make $54,000 or less annually.</Text>

          <Card containerStyle={styles.miniHeader}
            dividerStyle={{backgroundColor: 'transparent'}}>
              <View>
                <Text style={styles.title}>
                  What to Bring
                  </Text>
              </View>
          </Card>
          <Text style={styles.paraText}>Download this easy checklist to make sure you bring everything you need to have your taxes prepared at one of our Community Tax Centers.</Text>
          
          <Card containerStyle={styles.miniHeader}
            dividerStyle={{backgroundColor: 'transparent'}}>
              <View>
                <Text style={styles.title}>
                  2018 Locations
                  </Text>
              </View>
          </Card>
          <Text style={styles.paraText}>Click on the "Locations" tab on the bottom to view.</Text>
        </ScrollView>
      );
    }
  }