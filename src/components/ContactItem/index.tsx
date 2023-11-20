import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Theme from '../../Theme';
import CustomText from '../CustomText';
import Collapsible from 'react-native-collapsible';
import {Icon} from 'react-native-elements';
interface ContactProps {
  image: any;
  name: string;
  phone: Array<any>;
  onCallPress?: () => void;
}

export default function ContactItem({
  image,
  name,
  phone,
  onCallPress,
}: ContactProps) {
  // const [extraNumbers,setExtraNumbers] = useState(phone.slice(2))
  const [isCollapse, setIsCollape] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <Image source={image} style={styles.image} />
      </View>
      <TouchableOpacity
        style={styles.centerView}
        onPress={() => setIsCollape(!isCollapse)}>
        <View>
          <CustomText style={styles.name}>
            {name !== '' ? name : 'Unknown'}
          </CustomText>
          {phone.map(
            (item, index) =>
              index < 2 && (
                <CustomText style={styles.phone} key={index}>
                  {item?.label}:{item?.number}
                </CustomText>
              ),
          )}
        </View>
        <Collapsible collapsed={isCollapse}>
          <View>
            {phone.map(
              (item, index) =>
                index > 1 && (
                  <CustomText style={styles.phone} key={index}>
                    {item?.label}:{item?.number}
                  </CustomText>
                ),
            )}
          </View>
        </Collapsible>
      </TouchableOpacity>
      <View style={styles.callView}>
        <Icon
          name="call"
          type="zocial"
          color={Theme.colors.yellow}
          size={scale(30)}
          onPress={onCallPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: scale(10),
    borderRadius: moderateScale(4),
    backgroundColor: Theme.colors.dimWhite,
  },
  imgView: {
    flex: 2,
    padding: scale(10),
    alignItems: 'center',
  },
  centerView: {
    flex: 7,
    padding: scale(10),
  },
  image: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(100),
    backgroundColor: Theme.colors.black,
    // Shadow for android
    elevation: 4,
    // Shadow for iOS
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  name: {
    fontWeight: '600',
    fontSize: Theme.fontSizes.medium,
    marginVertical: scale(5),
  },
  phone: {
    textTransform: 'capitalize',
    paddingVertical: scale(2),
  },
  callView: {
    flex: 1,
    alignItems: 'center',
    padding: scale(15),
  },
});
