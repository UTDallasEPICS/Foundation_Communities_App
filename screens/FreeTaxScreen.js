import React from 'react';
import {View, StyleSheet, Card, ScrollView} from 'react-native';
import CustomText from '../components/CustomText';

// The reason that this code is blocked out is because the project partner didn't want this to be in the button anymore.
//    We were able to get the button to go straight to the map tab, like our partner wanted, instead of showing the user
//    essentially what was a repeat of the "About Us" button. The code down here will stay commented out only because we
//    don't want to get rid of the code just yet, just in case we might need to get it back later.
// We cannot get rid of this file either, because if we do, then it will throw an error, and the app will not run.

const FreeTaxScreen = () => {
  const navigationOptions = {
    tabBarLabel: '',
    headerTitle: (
      <CustomText style={styles.headertitle}>Free Tax Filing</CustomText>
    ),
    headerStyle: {
      elevation: 0.4,
      shadowOpacity: 0.4,
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
      <Card
        containerStyle={styles.miniHeader}
        dividerStyle={styles.transparentBG}>
        <View>
          <CustomText style={styles.title}>Free Tax Filing</CustomText>
        </View>
      </Card>
      <CustomText style={styles.paraText}>
        The Dallas Community Tax Centers provide free tax preparation for
        low-income families and individuals.
      </CustomText>

      <Card
        containerStyle={styles.miniHeader}
        dividerStyle={styles.transparentBG}>
        <View>
          <CustomText style={styles.title}>Eligibility</CustomText>
        </View>
      </Card>
      <CustomText style={styles.paraText}>
        We prepare taxes for free for individuals and families who make $54,000
        or less annually.
      </CustomText>

      <Card
        containerStyle={styles.miniHeader}
        dividerStyle={styles.transparentBG}>
        <View>
          <CustomText style={styles.title}>What to Bring</CustomText>
        </View>
      </Card>
      <CustomText style={styles.paraText}>
        Download this easy checklist to make sure you bring everything you need
        to have your taxes prepared at one of our Community Tax Centers.
      </CustomText>

      <Card
        containerStyle={styles.miniHeader}
        dividerStyle={styles.transparentBG}>
        <View>
          <CustomText style={styles.title}>2018 Locations</CustomText>
        </View>
      </Card>
      <CustomText style={styles.paraText}>
        Click on the "Locations" tab on the bottom to view.
      </CustomText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: 'white',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingBottom: 20,
  },
  transparentBG: {
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 0,
    fontFamily: 'System',
  },
  paraText: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'System',
    marginBottom: 5,
  },
  miniHeader: {
    borderColor: 'transparent',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 0,
    shadowOpacity: 0.0,
  },
});

export default FreeTaxScreen;
