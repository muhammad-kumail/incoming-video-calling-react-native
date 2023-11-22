import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Theme, {moderateScale, normalized, scale} from '../../Theme';
import CustomText from '../CustomText';
import Collapsible from 'react-native-collapsible';
import {Icon} from 'react-native-elements';
import {SvgXml} from 'react-native-svg';
import {defaultAvatar} from '../../assets/svgs';
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
        <View
          style={{
            backgroundColor: Theme.colors.gray,
            borderRadius: scale(100),
            // Shadow for android
            elevation: 6,
            // Shadow for iOS
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 6,
            overflow: 'hidden',
          }}>
          {image ? (
            <Image source={{uri: image}} style={styles.image} />
          ) : (
            <SvgXml xml={defaultAvatar} height={scale(50)} width={scale(50)} />
          )}
        </View>
      </View>
      <Pressable
        style={styles.centerView}
        onPress={() => setIsCollape(!isCollapse)}>
        <View>
          <CustomText style={styles.name}>
            {name !== '' && name !== undefined ? name : 'Unknown'}
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
      </Pressable>
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
    justifyContent: 'center',
    height: normalized.width(27),
  },
  centerView: {
    flex: 7,
    padding: scale(10),
  },
  image: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(100),
    // backgroundColor: Theme.colors.black,
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
    justifyContent: 'center',
    padding: scale(15),
    height: normalized.width(27),
  },
});
