import React from 'react';
import {StyleSheet, ScrollView, View, ImageBackground} from 'react-native';
import {Card} from 'react-native-elements';
import localization from '../localizations';
import CustomText from '../components/CustomText';

const AboutScreen = () => {
  const navigationOptions = {
    tabBarLabel: '',
    headerTitle: (
      <CustomText style={styles.headertitle}>
        {localization.aboutTitle}
      </CustomText>
    ),
    // headerStyle: {
    //   elevation: 0.4,
    //   shadowOpacity: 0.4,
    // },
  };

  return (
    <ImageBackground
      source={require('../assets/bkg_texture.png')}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewBG}>
        <Card
          containerStyle={styles.miniHeader}
          dividerStyle={styles.transparentBG}>
          <View>
            <CustomText style={styles.cardtitleBlack}>
              {localization.missionTitle}
            </CustomText>
          </View>
        </Card>
        <CustomText style={styles.paraText}>
          {localization.missionContent}
        </CustomText>
        <Card
          containerStyle={styles.miniHeader}
          dividerStyle={styles.transparentBG}>
          <View>
            <CustomText style={styles.cardtitleBlack}>
              {localization.storyTitle}
            </CustomText>
          </View>
        </Card>
        <CustomText style={styles.paraText}>
          {localization.storyContent}
        </CustomText>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headertitle: {
    textAlign: 'center',
    fontSize: 30,
    marginLeft: 15,
    fontFamily: 'System',
    color: 'black',
    fontWeight: 'bold',
  },
  scrollViewBG: {
    backgroundColor: '#f2ca6d',
    flexGrow: 2,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingBottom: 10,
  },
  transparentBG: {
    backgroundColor: 'transparent',
  },
  miniHeader: {
    borderColor: 'transparent',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 0,
    shadowOpacity: 0.0,
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
  cardtitleBlack: {
    fontSize: 30,
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
});

export default AboutScreen;
