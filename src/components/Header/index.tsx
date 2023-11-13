import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Theme, {normalized} from '../../Theme';
interface HeaderProps {
  title: string;
  leftIcon?: any;
  rightIcon?: any;
}

export default function Header({
  title,
  leftIcon,
  rightIcon,
}: HeaderProps): JSX.Element {
  return (
    <View style={styles.container}>
      {leftIcon && <View style={styles.edges}>{leftIcon}</View>}
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightIcon && <View style={styles.edges}>{rightIcon}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: normalized.width(2),
    paddingVertical: normalized.width(5),
    alignItems: 'center',
    backgroundColor: Theme.colors.yellow,
  },
  title: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.medium,
    fontWeight: 'bold',
  },
  edges: {
    flex: 1,
    justifyContent: 'center',
  },
  center: {
    paddingHorizontal: normalized.width(1),
    flex: 8,
  },
});
