import React from 'react';
import {
  View,
  ScrollView,
  Linking,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import localization from '../localizations';
import CustomText from '../components/CustomText';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <Touchable style={styles.cardStyle}>
        <View style={styles.containerDirection}>
          <ImageBackground
            style={styles.containerHeight}
            source={require('../assets/icon.png')}>
            <View style={styles.containerFlex} />
          </ImageBackground>
        </View>
      </Touchable>

      <Touchable
        //need to fix this with navigator
        onPress={() => navigation.navigate('AboutScreen')}
        style={styles.cardStyle}>
        <View style={styles.containerDirection}>
          <CustomText style={[styles.cardtitleBlack]}>
            {localization.aboutTitle}
          </CustomText>
          <CustomText style={styles.cardtextBlack}>
            {localization.aboutContent}
          </CustomText>
        </View>
      </Touchable>

      <Touchable
        onPress={() => {
          Linking.openURL(
            'http://www.foundcom.org/wp-content/uploads/2014/10/What-to-Bring-Checklist-Bilingual.pdf',
          );
        }}
        style={styles.cardStyle}>
        <View>
          <CustomText style={styles.cardtitleBlack}>
            {localization.checklistTitle}
          </CustomText>
          <CustomText style={styles.cardtextBlack}>
            {localization.checklistContent}
          </CustomText>
        </View>
      </Touchable>

      <Touchable
        onPress={() => {
          Linking.openURL(
            'https://sa.www4.irs.gov/irfof/lang/en/irfofgetstatus.jsp',
          );
        }}
        style={styles.cardStyle}>
        <View>
          <CustomText style={styles.cardtitleBlack}>
            {localization.refundTitle}
          </CustomText>
          <CustomText style={styles.cardtextBlack}>
            {localization.refundContent}
          </CustomText>
        </View>
      </Touchable>

      <Touchable
        onPress={() => {
          Linking.openURL('https://www.irs.gov/pub/irs-pdf/f13614c.pdf');
        }}
        style={styles.cardStyle}>
        <View>
          <CustomText style={styles.cardtitleBlack}>
            {localization.saveTimeTitle}
          </CustomText>
          <CustomText style={styles.cardtextBlack}>
            {localization.saveTimeContent}
          </CustomText>
        </View>
      </Touchable>

      <Touchable
        onPress={() => {
          Linking.openURL('https://www.dallastaxcenters.org/valetvita/');
        }}
        style={styles.cardStyle}>
        <View>
          <CustomText style={styles.cardtitleBlack}>
            {localization.virtualTax}
          </CustomText>
        </View>
      </Touchable>

      <Touchable
        onPress={() => {
          Linking.openURL('https://www.facebook.com/DallasCTC/');
        }}
        style={[styles.cardStyle, styles.buttonBGColor]}>
        <View>
          <CustomText style={[styles.cardtitle, styles.bottomMargin]}>
            {localization.facebookTitle}
          </CustomText>
          <CustomText style={styles.cardtext}>
            {localization.facebookContent}
          </CustomText>
        </View>
      </Touchable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: '#f2ca6d',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingBottom: 20,
  },
  cardStyle: {
    backgroundColor: '#ffffff',
    margin: 10,
    marginBottom: 0,
    padding: 10,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
  },
  containerStyle: {
    backgroundColor: '#f2ca6d',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingBottom: 20,
  },
  containerDirection: {
    flex: 1,
    flexDirection: 'column',
  },
  containerHeight: {
    flex: 1,
    height: 240,
  },
  containerFlex: {
    flex: 1,
  },
  buttonBGColor: {
    backgroundColor: '#4267B2',
  },
  bottomMargin: {
    marginBottom: 10,
  },
  cardtitleBlack: {
    fontSize: 20,
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  cardtextBlack: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'System',
  },
});

export default HomeScreen;
