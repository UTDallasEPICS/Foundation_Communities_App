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

import { Platform } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import FreeTaxScreen from './screens/FreeTaxScreen';
import DetailsScreen from './screens/DetailsScreen';
import AboutScreen from './screens/AboutScreen';
import MapScreen from './screens/MapScreen';
import MoreScreen from './screens/MoreScreen';
import ItemList from './screens/ItemList';
import admin from './screens/admin';

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
      tabBarLabel: 'About',
    },
  },
  Free: {
    screen: FreeTaxScreen,
    navigationOptions: {
      tabBarLabel: 'Tax',
    },
  },
  Login: {
    screen: MoreScreen,
    navigationOptions: {
      tabBarLabel: 'Login',
    }
  },
  admin: {
    screen: admin,
    navigationOptions: {
      tabBarLabel: 'admin',
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

const ItemStack = createStackNavigator({
  Item: { screen: ItemList },
});

const bottomTab = createBottomTabNavigator({
  Home: { screen: HomeStack },
  Map: { screen: MapStack },
  Item: { screen: ItemList },
  More: { screen: MoreStack },
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    // eslint-disable-next-line react/display-name
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (Platform.isPad) {
        iconName = 'ios';
      } else {
        iconName = 'md';
      }

      if (routeName === 'Home') {
        // iconName = `home${focused ? '' : '-outline'}`;
        iconName += '-home';
      } else if (routeName === 'Map') {
        // iconName = `map${focused ? '' : '-outline'}`;
        iconName += '-map';
      } else if (routeName === 'More') {
        // iconName = `more${focused ? '' : '-outline'}`;
        iconName += '-more';
      } else if (routeName === 'Item') {
        iconName += '-checkbox';
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
