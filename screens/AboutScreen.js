import React from 'react';
import {
  Text, ScrollView, View, ImageBackground,
} from 'react-native';
import { Card } from 'react-native-elements';
import styles from '../styles/styles';
import localization from '../localizations';

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: '',
    headerTitle: <Text style={styles.headertitle}>{localization.aboutTitle}</Text>,
    // headerStyle: {
    //   elevation: 0.4,
    //   shadowOpacity: 0.4,
    // },
  };

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <ImageBackground
        // eslint-disable-next-line global-require
        source={require('../assets/bkg_texture.png')}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={{
          backgroundColor: '#f2ca6d', flexGrow: 1, justifyContent: 'flex-start', alignItems: 'stretch', paddingBottom: 20,
        }}>
          <Card
            containerStyle={styles.miniHeader}
            dividerStyle={{ backgroundColor: 'transparent' }}
          >
            <View>
              <Text style={styles.cardtitleBlack}>
                {localization.missionTitle}
              </Text>
            </View>
          </Card>
          <Text style={styles.paraText}>{localization.missionContent}</Text>
          <Card
            containerStyle={styles.miniHeader}
            dividerStyle={{ backgroundColor: 'transparent' }}
          >
            <View>
              <Text style={styles.cardtitleBlack}>
                {localization.storyTitle}
              </Text>
            </View>
          </Card>
          <Text style={styles.paraText}>
            {localization.storyContent}
          </Text>
        </ScrollView>
      </ImageBackground>
    );
  }
}
