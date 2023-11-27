import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

interface WavesProps {
  minHeight?: number;
  maxHeight?: number;
  barWidth?: number;
  borderRadius?: number;
  startFrom?: number;
  waveDuration?: number;
  color?: string;
  paused?: boolean;
  noOfWaves?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const Bar: React.FC<WavesProps> = ({
  minHeight,
  maxHeight,
  barWidth,
  borderRadius,
  startFrom,
  waveDuration,
  color,
  paused,
}) => {
  const [heightAnim] = useState(new Animated.Value(startFrom));

  const waveAnimation = () => {
    Animated.sequence([
      Animated.timing(heightAnim, {
        toValue: maxHeight,
        duration: waveDuration,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: minHeight,
        duration: waveDuration,
        useNativeDriver: false,
      }),
    ]).start(({finished}) => {
      if (finished) {
        // Repeat the sequence
        waveAnimation();
      }
    });
  };

  useEffect(() => {
    if (!paused) {
      waveAnimation();
    }

    return () => {
      // Stop the animation when the component unmounts
      heightAnim.stopAnimation();
    };
  }, [heightAnim, paused]);

  const togglePause = () => {
    if (paused) {
      waveAnimation();
    } else {
      // Pause animation and store the current height
      heightAnim.stopAnimation(value => heightAnim.setValue(value));
    }

    // Toggle the pause state
    setPaused(!paused);
  };

  return (
    <View style={[styles.container, {minHeight: maxHeight}]}>
      <Animated.View
        style={[
          styles.animatedView,
          {
            height: heightAnim,
            backgroundColor: color,
            width: barWidth,
            borderRadius,
          },
        ]}
      />
    </View>
  );
};

export default function Waves({
  minHeight = 20,
  maxHeight = 130,
  barWidth = 12,
  borderRadius = 15,
  waveDuration = 200,
  color = 'black',
  paused = false,
  noOfWaves = 10,
  containerStyle,
}: WavesProps) {
  const waveArr = Array.from({length: noOfWaves}, () =>
    getRandomInt(minHeight, maxHeight),
  );
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return (
    <View
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          flexDirection: 'row',
        },
        containerStyle,
      ]}>
      {waveArr.map((item: number, index: number) => (
        <Bar
          key={index}
          minHeight={minHeight}
          maxHeight={maxHeight}
          barWidth={barWidth}
          borderRadius={borderRadius}
          startFrom={item}
          waveDuration={waveDuration}
          color={color}
          paused={paused}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedView: {
    overflow: 'hidden',
  },
});
