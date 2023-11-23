import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Theme, {scale} from '../../Theme';
import CustomText from '../CustomText';
interface ButtonProps {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  disableStyle?: StyleProp<ViewStyle>;
  disable?: boolean;
  loading?: boolean;
  clickOpacity?: number;
  onPress: () => void;
}

export default function Button({
  text,
  textStyle,
  style,
  disableStyle,
  disable,
  loading,
  clickOpacity = 0.2,
  onPress,
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={clickOpacity}
      disabled={disable || loading}
      style={[
        styles.container,
        style,
        disable && styles.disableContainer,
        disable && disableStyle,
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={Theme.colors.black} size={'small'} />
      ) : (
        <CustomText
          style={[
            styles.text,
            disable && {color: Theme.colors.gray},
            textStyle,
          ]}>
          {text}
        </CustomText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: scale(10),
    borderRadius: scale(5),
    backgroundColor: Theme.colors.yellow,
    borderWidth: 1,
    borderColor: Theme.colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disableContainer: {
    backgroundColor: Theme.colors.lightGray,
    borderColor: Theme.colors.gray,
  },
  text: {
    fontSize: Theme.fontSizes.small,
    fontWeight: '500',
  },
});
