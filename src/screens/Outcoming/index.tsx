import {FlatList, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Theme, {normalized, scale} from '../../Theme';
import {CallButton, Text} from '../../components';
import {Icon} from 'react-native-elements';
import {styles} from './style';

export default function Outcoming({navigation, route}: any) {
  const callie: {name: string; phone: any} = route.params;
  console.log('callie:', route.params);
  const options = ['Speaker', 'Mute', 'Hold', 'Record'];
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.flatlistItemView}>
        <CallButton
          icon={item?.toLowerCase()}
          onPress={() => console.log('speaker pressed')}
        />
        <Text style={styles.optionTitle}>{item}</Text>
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
        <Text style={styles.title}>{callie.name}</Text>
        <Text style={[styles.title, {fontWeight: 'bold'}]}>
          {callie.phone?.number}
        </Text>
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
            size={scale(40)}
            onPress={navigation.goBack}
          />
        </View>
      </View>
      <View style={{flex: 0.5}} />
    </LinearGradient>
  );
}
