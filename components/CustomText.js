import React from 'react';
import {Text, StyleSheet} from 'react-native';

const CustomText = ({font, style, children}) => {
  const fontStyles = StyleSheet.create({
    text: {
      // not sur what's happening with the font style
      fontFamily: font || 'System',
    },
  });
  return <Text style={[fontStyles.text, style]}>{children}</Text>;
};

export default CustomText;
