import {
  Animated,
  PanResponder,
  StyleSheet,
  Vibration,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './style';
import Theme, {normalized, scale} from '../../Theme';
import {Text} from '../../components';
import {Icon, Image} from 'react-native-elements';
import {SvgXml} from 'react-native-svg';
import {defaultAvatar} from '../../assets/svgs';

export default function Incoming({navigtion}: any) {
  const [colorNum, setColorNum] = useState<number>(0);
  const [noOfArrowShow, setNoOfArrowShow] = useState<number>(3);
  const [noOfArrowShow2, setNoOfArrowShow2] = useState<number>(3);
  const pan = useRef(new Animated.ValueXY()).current;
  const pan2 = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // Limit the drag to the threshold of 122
        // console.log('realtime pan:', pan.x._value);
        if (Math.abs(pan.x._value) >= 43 && Math.abs(pan.x._value) < 63) {
          setNoOfArrowShow(2);
        } else if (
          Math.abs(pan.x._value) >= 63 &&
          Math.abs(pan.x._value) < 83
        ) {
          setNoOfArrowShow(1);
        } else if (Math.abs(pan.x._value) >= 83) {
          setNoOfArrowShow(0);
        }
        if (Math.abs(pan.x._value) <= 122) {
          Animated.event([null, {dx: pan.x}], {
            useNativeDriver: false,
          })(event, gesture);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        // Threshold for considering the view at the center
        setNoOfArrowShow(3);
        const centerThreshold = 121;

        if (Math.abs(gesture.dx) > centerThreshold) {
          // View dragged to the right, reject call
          console.log('Call Rejected');

          // Add your logic to handle call rejection
        }

        // Reset position to the center
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;
  const panResponder2 = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // Limit the drag to the threshold of 122
        // console.log('realtime pan:', pan2.x._value);
        if (Math.abs(pan2.x._value) >= 43 && Math.abs(pan2.x._value) < 63) {
          setNoOfArrowShow2(2);
        } else if (
          Math.abs(pan2.x._value) >= 63 &&
          Math.abs(pan2.x._value) < 83
        ) {
          setNoOfArrowShow2(1);
        } else if (Math.abs(pan2.x._value) >= 83) {
          setNoOfArrowShow2(0);
        }
        if (Math.abs(pan2.x._value) <= 122) {
          Animated.event([null, {dx: pan2.x}], {
            useNativeDriver: false,
          })(event, gesture);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        // Threshold for considering the view at the center
        // console.log('terminate');
        setNoOfArrowShow2(3);
        const centerThreshold = 121;

        if (Math.abs(gesture.dx) > centerThreshold) {
          // View dragged to the right, reject call
          console.log('Call Accepted');
          // Add your logic to handle call rejection
        }

        // Reset position to the center
        Animated.spring(pan2, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  //   const panResponder =
  useEffect(() => {
    Vibration.vibrate([0], true);
    const interval = setInterval(() => {
      //   console.log('interval running: ', colorNum);
      if (colorNum === 3) {
        setColorNum(1);
      } else {
        setColorNum(colorNum + 1);
      }
    }, 200);
    return () => {
      clearInterval(interval);
      Vibration.cancel();
    };
  });
  return (
    <LinearGradient
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1.5}}
      colors={['#e8ae0d', '#DE7906']}>
      <View
        style={{
          flex: 4,
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: scale(10),
          //   borderWidth: 1,
        }}>
        <Text
          style={{
            color: Theme.colors.white,
            fontSize: Theme.fontSizes.big,
          }}>
          {'Father'}
        </Text>
        <View
          style={{
            borderRadius: scale(400),
            overflow: 'hidden',
            // backgroundColor: 'red',
            height: scale(145),
            width: scale(145),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SvgXml xml={defaultAvatar} height={scale(150)} width={scale(150)} />
        </View>
      </View>
      <View
        style={{
          flex: 2.5,
          justifyContent: 'center',
          alignItems: 'center',
          //   borderWidth: 1,
        }}>
        <Text
          style={{
            color: Theme.colors.white,
            fontSize: Theme.fontSizes.xmedium,
          }}>
          {'Calling...'}
        </Text>
      </View>
      <View
        style={{
          flex: 1.5,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          //   borderWidth: 1,
        }}>
        <Animated.View
          style={{
            padding: scale(10),
            backgroundColor: Theme.colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(100),
            zIndex: 1,
            transform: [{translateX: pan2.x}],
          }}
          {...panResponder2.panHandlers}>
          <Icon
            type="material"
            name="call"
            color={Theme.colors.lightGreen}
            size={scale(30)}
          />
        </Animated.View>
        <Icon
          type="material"
          name="keyboard-arrow-right"
          color={
            noOfArrowShow2 > 2
              ? colorNum === 1
                ? Theme.colors.lightGreen
                : Theme.colors.white
              : 'transparent'
          }
          size={scale(30)}
          style={{
            width: scale(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <Icon
          type="material"
          name="keyboard-arrow-right"
          color={
            noOfArrowShow2 > 1
              ? colorNum === 2
                ? Theme.colors.lightGreen
                : Theme.colors.white
              : 'transparent'
          }
          size={scale(30)}
          style={{
            width: scale(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <Icon
          type="material"
          name="keyboard-arrow-right"
          color={
            noOfArrowShow2 > 0
              ? colorNum === 3
                ? Theme.colors.lightGreen
                : Theme.colors.white
              : 'transparent'
          }
          size={scale(30)}
        />

        <Icon
          type="font-awesome"
          name="dot-circle-o"
          color={Theme.colors.white}
          size={scale(30)}
        />

        <Icon
          type="material"
          name="keyboard-arrow-left"
          color={
            noOfArrowShow > 0
              ? colorNum === 3
                ? Theme.colors.red
                : Theme.colors.white
              : 'transparent'
          }
          size={scale(30)}
          style={{
            width: scale(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <Icon
          type="material"
          name="keyboard-arrow-left"
          color={
            noOfArrowShow > 1
              ? colorNum === 2
                ? Theme.colors.red
                : Theme.colors.white
              : 'transparent'
          }
          size={scale(30)}
          style={{
            width: scale(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <Icon
          type="material"
          name="keyboard-arrow-left"
          color={
            noOfArrowShow > 2
              ? colorNum === 1
                ? Theme.colors.red
                : Theme.colors.white
              : 'transparent'
          }
          size={scale(30)}
        />
        <Animated.View
          style={{
            padding: scale(10),
            backgroundColor: Theme.colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(100),
            zIndex: 1,
            transform: [{translateX: pan.x}],
          }}
          {...panResponder.panHandlers}>
          <Icon
            type="material"
            name="call-end"
            color={Theme.colors.red}
            size={scale(30)}
          />
        </Animated.View>
      </View>
      <View style={{flex: 1}} />
    </LinearGradient>
  );
}
