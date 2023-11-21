import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Theme, {scale, verticalScale} from '../../Theme';
import CustomText from '../CustomText';
import Button from '../Button';

interface NumbersListProps {
  visible: boolean;
  name: string;
  numbers: Array<{label: string; number: string; isClicked: boolean}>;
  onClose: () => void;
}

const NumbersList: React.FC<NumbersListProps> = ({
  visible,
  name,
  numbers,
  onClose,
}) => {
  const sheetRef = useRef<RBSheet>(null);
  const [allNumbers, setAllNumbers] = useState<any>(numbers);

  useEffect(() => {
    if (visible) {
      sheetRef.current?.open();
    }
    console.log(
      '🚀 ~ file: index.tsx:27 ~ useEffect ~ allNumbers:',
      allNumbers,
    );
  }, [visible]);
  const updateArr = (index: number) => {
    var list = [...allNumbers];
    for (let i = 0; i < list.length; i++) {
      if (i === index) list[i] = {...list[i], isClicked: true};
      else list[i] = {...list[i], isClicked: false};
    }
    setAllNumbers(list);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: {label: string; number: string; isClicked: boolean};
    index: number;
  }) => {
    console.log('Numbers:', item);
    return (
      <TouchableOpacity
        onPress={() => updateArr(index)}
        style={{
          paddingVertical: scale(15),
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderColor: item.isClicked
            ? Theme.colors.yellow
            : Theme.colors.lightGray,
        }}>
        <CustomText
          style={[
            styles.number,
            item.isClicked && {color: Theme.colors.yellow},
          ]}>
          {item.number}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <RBSheet
      ref={sheetRef}
      height={verticalScale(numbers.length * 90)}
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
          data={allNumbers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
      <Button
        clickOpacity={0.5}
        disable={
          allNumbers?.filter((item: any) => {
            return item?.isClicked === true;
          }).length == 0
        }
        text="Call"
        // loading={true}
        onPress={() => console.log('Particular Phone number pressed!')}
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
  },
  name: {
    fontSize: Theme.fontSizes.xmedium,
    fontWeight: '500',
  },
  subName: {
    color: Theme.colors.gray,
  },
});

export default NumbersList;
