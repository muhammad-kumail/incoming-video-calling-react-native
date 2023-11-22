import {StyleSheet} from 'react-native';
import Theme, {normalized} from '../../Theme';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  backImage: {
    flex: 1,
    height: normalized.height(100),
    width: normalized.width(100),
  },
  text: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.small,
  },
  mainView: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    margin: normalized.width(1.5),
    padding: normalized.width(2),
    borderRadius: scale(10),
    backgroundColor: Theme.colors.dimWhite,
  },
  itemView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(100),
  },
  itemView2: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  itemText: {
    color: Theme.colors.black,
    fontSize: Theme.fontSizes.medium,
    fontWeight: '600',
  },
  searchBarContainerStyle: {
    backgroundColor: 'transparent',
    paddingHorizontal: scale(10),
    paddingTop: scale(10),
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchBarInputContainerStyle: {
    backgroundColor: Theme.colors.dimWhite,
    borderRadius: moderateScale(4),
  },
  searchBarInputStyle: {
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.black,
  },
  searchBarLeftIconContainerStyle: {
    paddingLeft: normalized.width(2),
  },
});
