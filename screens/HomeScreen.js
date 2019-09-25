import React from 'react';
import {
  Text, View, ScrollView, Linking, ImageBackground,
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import styles from '../styles/styles';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Text style={styles.headertitle}>Home</Text>,
    headerStyle: {
      backgroundColor: 'white',
      elevation: 0.8,
      shadowOpacity: 0.8,
    },
  };

  /* These are the buttons for the homescreen.
        -The very top button (all buttons are surrounded with a set of </Touchable>) is the "About Us" button. When pressed, it will show the user
          a little bit about the organization, their mission, and their story.

        -The second button is the "Free Tax Filing" button. This button will have a little blurb on the homescreen that says "Click here to see locations!",
          and once it is clicked, it will bring the user to the second tab on the app, where they will be able to scroll between locations and see more
          information about them.

        -The third button is the "Item Checklist". Once clicked, it will bring the user to their web browser and open up a link that shows them what they
          should bring before they go to a location

        -The fourth button is the "Where's My Refund?" button. When clicked, the user will be redirected to a government page on their web browser where
          they can check on the status of their refunds.

        -The last button on the homescreen is the "Find Us On Facebook" button. When clicked, it will bring the user to the Facebook page for Foundation
          Communities.
     */
  render() {
    return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#f6f6f6', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch', paddingBottom: 20 }}>
            <Touchable onPress={() => this.props.navigation.navigate('About')} style={styles.cardStyle} >
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <ImageBackground
                  style={{ flex: 1, height: 200 }}
                  source={require('../assets/images/AboutUs.jpg')}
                  >
                  <View style={{ flex: 1 }} />
                  </ImageBackground>
                    <Text style={[styles.cardtitleBlack, { marginTop: 10 }]}>
                      About Us
                    </Text>
                    <Text style={styles.cardtextBlack}>
                      Learn about Community Tax Centers and what we do by clicking here!
                    </Text>
                </View>
          </Touchable>

          <Touchable onPress={() => this.props.navigation.navigate('Map')} style={[styles.cardStyle]} >
                <View>
                  <Text style={styles.cardtitleBlack}>
                    Free Tax Filing
                  </Text>
                  <Text style={styles.cardtextBlack}>
                    We can do your taxes for free. Click here to see our locations!
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

          <Touchable style={[styles.cardStyle]} onPress={() => { Linking.openURL('https://sa.www4.irs.gov/irfof/lang/en/irfofgetstatus.jsp') ;}} style={styles.cardStyle} >
                <View>
                  <Text style={styles.cardtitleBlack}>
                    Where's My Refund?
                  </Text>
                  <Text style={styles.cardtextBlack}>
                    Link to IRS Where's My Refund page
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
