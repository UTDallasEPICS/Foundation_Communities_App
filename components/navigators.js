import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ItemList from '../screens/ItemList';
import LocationDetailsScreen from '../screens/LocationDetailsScreen';
import MoreScreen from '../screens/MoreScreen';
import MapScreen from '../screens/MapScreen';
import AboutScreen from '../screens/AboutScreen';
import Admin from '../screens/Admin';
//import FreeTaxScreen from '../screens/FreeTaxScreen';
const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="AboutScreen" component={AboutScreen} />
    </HomeStack.Navigator>
  );
};

const CheckListStack = createStackNavigator();

const CheckListStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Checklist" component={ItemList} />
    </HomeStack.Navigator>
  );
};

const MoreStack = createStackNavigator();

const MoreStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="More" component={MoreScreen} />
      <HomeStack.Screen name="Admin" component={Admin} />
    </HomeStack.Navigator>
  );
};

const MapStack = createStackNavigator();

const MapStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Map" component={MapScreen} />
      <HomeStack.Screen
        name="Location Details"
        component={LocationDetailsScreen}
      />
    </HomeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

//All Icon code is commented out
const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          style: {
            borderTopColor: '#DDD',
            backgroundColor: 'white',
            elevation: 10,
            shadowOpacity: 0.1,
          },
          activeTintColor: '#000',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontFamily: 'System',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          // options={{
          //   tabBarIcon: () => {
          //     <Ionicons ios="home-outline" android="home-sharp" size={30} />;
          //   },
          // }}
        />
        <Tab.Screen
          name="Checklist"
          component={CheckListStackScreen}
          // options={{
          //   //add color and size
          //   tabBarIcon: () => (
          //     <Ionicons ios="list-outline" android="list-sharp" size={30} />
          //   ),
          // }}
        />
        <Tab.Screen
          name="Map"
          component={MapStackScreen}
          // options={{
          //   tabBarIcon: () => (
          //     <Ionicons ios="map-outline" android="map-sharp" size={30} />
          //   ),
          // }}
        />
        <Tab.Screen
          name="Login"
          component={MoreStackScreen}
          // options={{
          //   tabBarIcon: () => (
          //     <Ionicons ios="log-in-outline" android="log-in-sharp" size={30} />
          //   ),
          // }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
