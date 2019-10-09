import React from 'react';
import { Text } from 'react-native';
import styles from '../styles/styles';

export default class FreeTaxScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: '',
    headerTitle: <Text style={ styles.headertitle }>Free Tax Filing</Text>,
    headerStyle: {
      elevation: 0.4,
      shadowOpacity: 0.4,
    },
  };

  // The reason that this code is blocked out is because the project partner didn't want this to be in the button anymore.
  //    We were able to get the button to go straight to the map tab, like our partner wanted, instead of showing the user
  //    essentially what was a repeat of the "About Us" button. The code down here will stay commented out only because we
  //    don't want to get rid of the code just yet, just in case we might need to get it back later.
  // We cannot get rid of this file either, because if we do, then it will throw an error, and the app will not run.
  render() {
    return (
      <ScrollView contentContainerStyle={{
        backgroundColor: 'white', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch', paddingBottom: 20,
      }}>
        <Card containerStyle={styles.miniHeader}
          dividerStyle={{ backgroundColor: 'transparent' }}>
            <View>
              <Text style={styles.title}>
                Free Tax Filing
                </Text>
            </View>
        </Card>
        <Text style={styles.paraText}>The Dallas Community Tax Centers provide free tax preparation for low-income families and individuals.</Text>

        <Card containerStyle={styles.miniHeader}
          dividerStyle={{ backgroundColor: 'transparent' }}>
            <View>
              <Text style={styles.title}>
                Eligibility
                </Text>
            </View>
        </Card>
        <Text style={styles.paraText}>We prepare taxes for free for individuals and families who make $54,000 or less annually.</Text>

        <Card containerStyle={styles.miniHeader}
          dividerStyle={{ backgroundColor: 'transparent' }}>
            <View>
              <Text style={styles.title}>
                What to Bring
                </Text>
            </View>
        </Card>
        <Text style={styles.paraText}>Download this easy checklist to make sure you bring everything you need to have your taxes prepared at one of our Community Tax Centers.</Text>

        <Card containerStyle={styles.miniHeader}
          dividerStyle={{ backgroundColor: 'transparent' }}>
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
