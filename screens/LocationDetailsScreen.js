import React from 'react';
import {View, Linking, ImageBackground, Alert, StyleSheet} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import localization from '../localizations';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../components/CustomText';

const LocationDetailsScreen = () => {
  const navigation = useNavigation();
  const navigationOptions = () => {
    return {
      tabBarLabel: '',
      headerTitle: () => (
        <CustomText style={styles.headertitle}>
          {navigation ? navigation.title : 'null'}
        </CustomText>
      ),
      headerStyle: {
        elevation: 0.4,
        shadowOpacity: 0.4,
      },
    };
  };

  //const {params} = navigation.state;
  const location = navigation ? navigation.location : null;
  const description = navigation ? navigation.description : null;
  const image = navigation ? navigation.image : null;
  //i don't fully understand how to use usenavigationstate yet so i keep getting some error so i'm using their default code for now
  //const {params} = useNavigationState((state) => state);
  // const location = useNavigationState((state) => state.location);
  // const description = useNavigationState((state) => state.description);
  // const image = useNavigationState((state) => state.image);

  //not sure about this one---------------------
  const GetETA = (currentLocation) => {
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

    compDate += curdate.getMonth() + 1;
    compDate += '/';
    compDate += day;
    compDate += '/';
    compDate += curdate.getFullYear() - 2000;
    // now we have a date that matches what we have in the firebase
    // compDate should contain: mm/dd/yyyy

    compDate += '_';
    compDate += currentLocation;
    console.log(compDate);
    // now compdate holds the currentLocation and the date
    const {params} = this.props.navigation.state;
    const wait = params ? params.waitTime : null;
    const update = params ? params.lastUpdated : null;

    Alert.alert(
      `${localization.waitContent} ${wait}\n${localization.updatedContent} ${update}`,
    );
  };

  return (
    <View style={styles.tileStyleStart}>
      <CustomText style={styles.cardtitleBlack}>{location}</CustomText>
      <ImageBackground style={styles.imgBGStyle} source={image}>
        <View style={styles.flexStyle} />
      </ImageBackground>
      <CustomText style={[styles.cardtitleBlack, styles.topMargin]}>
        {description}
      </CustomText>

      <View style={styles.tileStyleEnd}>
        <Touchable
          onPress={() => {
            Linking.openURL(
              `https://www.google.com/maps/dir/?api=1&origin&destination=${description}`,
            );
          }}
          style={[styles.button, styles.grayBG]}>
          <View>
            <CustomText style={styles.cardtext}>
              {localization.openMaps}
            </CustomText>
          </View>
        </Touchable>
      </View>

      <View style={styles.buttonStyle}>
        <Touchable
          onPress={() => {
            this.GetETA(location);
          }}
          style={[styles.button, styles.grayBG]}>
          <View>
            <CustomText style={styles.cardtext}>
              {localization.getWait}
            </CustomText>
          </View>
        </Touchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tileStyleStart: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  //from old code
  cardtitleBlack: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  tileStyleEnd: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  buttonStyle: {
    backgroundColor: 'white',
    paddingTop: 5,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  //from old code
  button: {
    backgroundColor: '#888888',
    borderRadius: 3,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    paddingBottom: 5,
    paddingTop: 8,
    padding: 5,
  },
  grayBG: {
    backgroundColor: '#888888',
  },
  imgBGStyle: {
    flex: 2,
    margin: 10,
    marginTop: 20,
  },
  topMargin: {
    marginTop: 20,
  },
  //from old code
  headertitle: {
    textAlign: 'center',
    fontSize: 30,
    marginLeft: 15,
    fontFamily: 'System',
    color: 'black',
    fontWeight: 'bold',
  },
  flexStyle: {
    flex: 2.5,
  },
});

export default LocationDetailsScreen;
