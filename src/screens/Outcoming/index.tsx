import {
  Animated,
  FlatList,
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

export default function Outcoming({navigtion}: any) {
  const options = [
    {
      title: 'Speaker',
      icon: (props: any) => (
        <View style={[styles.optionView, props?.style]} {...props}>
          <Icon
            type="font-awesome"
            name="volume-up"
            color={Theme.colors.yellow}
            size={scale(24)}
          />
        </View>
      ),
    },
    {
      title: 'Mute',
      icon: (props: any) => (
        <View style={[styles.optionView, props?.style]} {...props}>
          <Icon
            type="ionicons"
            name="mic"
            color={Theme.colors.yellow}
            size={scale(24)}
            {...props}
          />
        </View>
      ), //mic-off
    },
    {
      title: 'Hold',
      icon: (props: any) => (
        <Icon
          type="antdesign"
          name="pausecircle"
          color={Theme.colors.white}
          size={scale(45)}
          {...props}
        />
      ), // play
    },
    {
      title: 'Record',
      icon: (props: any) => (
        <View style={[styles.optionView, props?.style]} {...props}>
          <Icon
            type="material-community"
            name="phone-hangup-outline"
            size={scale(24)}
            color={Theme.colors.yellow}
            {...props}
          />
        </View>
      ),
    },
  ];
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.flatlistItemView}>
        <item.icon />
        <Text style={styles.optionTitle}>{item?.title}</Text>
      </View>
    );
  };
  return (
    <LinearGradient
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1.5}}
      colors={['#e8ae0d', '#DE7906']}>
      <View style={styles.upperView}>
        <Text style={styles.title}>{'Father'}</Text>
        <Text style={styles.statusTitle}>{'Calling...'}</Text>
      </View>

      <View style={styles.statusView}>
        <FlatList
          data={options}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.bottomView}>
        <View style={styles.CallBtnView}>
          <Icon
            type="material"
            name="call-end"
            color={Theme.colors.white}
            size={scale(30)}
          />
        </View>
      </View>
      <View style={{flex: 0.5}} />
    </LinearGradient>
  );
}
