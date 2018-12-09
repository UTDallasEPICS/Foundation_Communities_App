import React from 'react';
import { StyleSheet } from 'react-native';
import { Font } from 'expo';

const styles = StyleSheet.create({
    container: {
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
    },
    headertitle: {
      textAlign: 'center',
      fontSize: 20,
      marginLeft: 15,
      fontFamily: 'mainFont',
    },
    title: {
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 0,
      fontFamily: 'mainFont',
    },
    requestTitle: {
      marginTop: 20,
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 0,
      fontFamily: 'mainFont',
    },
    cardtext: {
      fontSize: 16,
      color: 'white',
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'mainFont',
    },
    cardtextBlack: {
      fontSize: 16,
      color: 'black',
      marginBottom: 5,
      textAlign: 'center',
      fontFamily: 'mainFont',
    },
    cardtitle: {
      fontSize: 20,
      color: 'white',
      marginBottom: 20,
      textAlign: 'center',
      fontFamily: 'mainFont',
    },
    cardtitleBlack: {
      fontSize: 20,
      color: 'black',
      marginBottom: 5,
      textAlign: 'center',
      fontFamily: 'mainFont',
    },
    paraText: {
      marginTop: 10,
      marginLeft: 15,
      marginRight: 15,
      textAlign: 'center',
      fontSize: 16,
      fontFamily: 'mainFont',
      marginBottom: 5
    },
    activeTitle: {
      color: 'red',
    },
    btnText: {
        color: '#ffffff',
        fontFamily: 'mainFont',
    },
    oldbutton: {
      backgroundColor: 'transparent',
      borderRadius: 3,
      borderWidth: 0.5,
      borderColor: '#03a9f4',
      marginBottom: 10,
    },
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
    submitButton: {
      backgroundColor: '#2196f3',
      borderRadius: 3, 
      marginLeft: 10, 
      marginRight: 10, 
      marginBottom: 10,
      paddingBottom: 5,
      paddingTop: 8
    },
    cardButton: {
      backgroundColor: '#03A9F4',
      borderRadius: 3, 
      marginLeft: 0, 
      marginRight: 0, 
      marginBottom: 5,
    },
    cardStyle: { backgroundColor: '#ffffff', 
    margin: 10, 
    marginBottom: 0, 
    padding: 10, 
    borderRadius: 0, 
    elevation: 2, 
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 } },
    containerStyle: { 
      borderColor: 'transparent', 
      borderRadius: 6, 
      elevation: 2, 
      shadowOpacity: 0.5 
    },
    miniHeader: {
       borderColor: 'transparent', 
       backgroundColor: '#eeeeff', 
       borderRadius: 0, 
       elevation: 0, 
       shadowOpacity: 0.0 
      }
  });

  export default styles;
