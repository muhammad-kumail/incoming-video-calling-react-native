import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Theme, {normalized, scale, verticalScale} from '../../Theme';
import CustomText from '../CustomText';
import Button from '../Button';
import {labelIcon} from '../../crudMethods';

interface NumbersListProps {
  visible: boolean;
  name: string;
  numbers: Array<{label: string; number: string}>;
  onClose: () => void;
  onCall: (e: any) => void;
}

const NumbersList: React.FC<NumbersListProps> = ({
  visible,
  name,
  numbers,
  onClose,
  onCall,
}) => {
  const sheetRef = useRef<RBSheet>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (visible) {
      sheetRef.current?.open();
    }
    setActiveIndex(0);
  }, [visible]);

  const renderItem = ({
    item,
    index,
  }: {
    item: {label: string; number: string};
    index: number;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => setActiveIndex(index)}
        style={{
          flexDirection: 'row',
          paddingVertical: scale(15),
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor:
            activeIndex === index
              ? Theme.colors.yellow
              : Theme.colors.lightGray,
        }}>
        <View style={{flex: 1}}>
          {labelIcon(
            item?.label,
            activeIndex === index ? Theme.colors.yellow : Theme.colors.black,
          )}
        </View>
        <View style={{flex: 6}}>
          <CustomText
            style={[
              styles.number,
              activeIndex === index && {color: Theme.colors.yellow},
            ]}>
            {item.number}
          </CustomText>
        </View>
        <View style={{flex: 3, alignItems: 'flex-end'}}>
          <CustomText
            style={[
              styles.number,
              activeIndex === index && {color: Theme.colors.yellow},
            ]}>
            ({item?.label})
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <RBSheet
      ref={sheetRef}
      height={numbers.length * normalized.width(15) + normalized.width(45)}
      animationType="fade"
      onClose={onClose}
      closeOnPressBack={true}
      closeOnPressMask={true}
      closeOnDragDown={true}
      customStyles={{
        container: {
          backgroundColor: Theme.colors.gray,
          borderTopRightRadius: scale(4),
          borderTopLeftRadius: scale(4),
          alignSelf: 'center',
          padding: scale(10),
          // width: '94%',
        },
        draggableIcon: {backgroundColor: 'red', display: 'none'},
      }}>
      <View style={styles.container}>
        <CustomText style={styles.name}>{name}</CustomText>
        <CustomText style={styles.subName}>
          Choose number for this call
        </CustomText>
        <FlatList
          data={numbers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
      <Button
        clickOpacity={0.5}
        disable={activeIndex < 0}
        text="Call"
        // loading={true}
        onPress={() => {
          sheetRef.current?.close();
          onCall(numbers[activeIndex]);
          // onClose();
        }}
        style={{marginVertical: scale(15)}}
      />
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(5),
    padding: scale(10),
    backgroundColor: Theme.colors.white,
  },
  number: {
    fontSize: Theme.fontSizes.small,
    textTransform: 'capitalize',
  },
  name: {
    fontSize: Theme.fontSizes.xmedium,
    fontWeight: '500',
  },
  subName: {
    color: Theme.colors.gray,
    paddingVertical: scale(5),
  },
});

export default NumbersList;
