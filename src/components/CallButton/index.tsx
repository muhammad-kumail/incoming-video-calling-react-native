import {PanResponder, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Theme, {scale} from '../../Theme';
import {Icon} from 'react-native-elements';
interface CallButtonProps {
  icon: string;
  onPress?: () => void;
}
export default function CallButton(props: CallButtonProps) {
  const [pressed, setPressed] = useState(false);
  const icons: any = {
    speaker: {
      type: 'font-awesome',
      name: 'volume-up',
    },
    mute: {
      type: 'ionicons',
      name: 'mic',
    },
    hold: {
      type: 'material',
      name: 'pause',
    },
    record: {
      type: 'material-community',
      name: 'phone-hangup',
    },
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponderCapture: () => false,
    onPanResponderGrant: () => {
      setPressed(!pressed);
    },
    onPanResponderRelease: () => {
      props.onPress && props?.onPress();
    },
  });
  return (
    <View
      style={[
        styles.optionView,
        pressed && {backgroundColor: Theme.colors.white},
      ]}
      {...panResponder.panHandlers}>
      <Icon
        type={icons[props.icon]?.type}
        name={icons[props.icon]?.name} //phone-hangup-outline
        size={scale(24)}
        color={!pressed ? Theme.colors.white : Theme.colors.yellow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  optionView: {
    height: scale(60),
    width: scale(60),
    // borderWidth: 4,
    borderColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(100),
  },
});
