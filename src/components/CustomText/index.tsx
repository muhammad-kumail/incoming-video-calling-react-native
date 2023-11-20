import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Theme from '../../Theme';

export default function CustomText(props: any) {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Theme.colors.black,
  },
});
