import React from 'react';
import {
  createAppContainer,
} from 'react-navigation';
import {
  createStackNavigator,
} from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  TabBarBottom,
} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import FreeTaxScreen from './screens/FreeTaxScreen';
import DetailsScreen from './screens/DetailsScreen';
import AboutScreen from './screens/AboutScreen';
import MapScreen from './screens/MapScreen';
import MoreScreen from './screens/MoreScreen';

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  About: {
    screen: AboutScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  Free: {
    screen: FreeTaxScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
});

const MapStack = createStackNavigator({
  Map: { screen: MapScreen },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      tabBarLabel: 'Map',
    },
  },
});

const MoreStack = createStackNavigator({
  More: { screen: MoreScreen },
  LocationPicker: { screen: MapScreen },
});

const bottomTab = createBottomTabNavigator({
  Home: { screen: HomeStack },
  Map: { screen: MapStack },
  More: { screen: MoreStack },
},
{
  navigationOptions: ({ navigation }) => ({
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home${focused ? '' : '-outline'}`;
      } else if (routeName === 'Map') {
        iconName = `ios-map${focused ? '' : '-outline'}`;
      } else if (routeName === 'More') {
        iconName = `ios-more${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={30} color={tintColor} />;
    },
  }),
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      borderTopColor: '#DDD',
      backgroundColor: 'white',
      elevation: 10,
      shadowOpacity: 0.1,
    },
    activeTintColor: '#000',
    inactiveTintColor: 'gray',
    showLabel: false,
    labelStyle: {
      fontFamily: 'mainFont',
    },
  },
  animationEnabled: false,
  swipeEnabled: false,
});

export default createAppContainer(bottomTab);
