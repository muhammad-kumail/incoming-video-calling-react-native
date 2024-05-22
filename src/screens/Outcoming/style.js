import {StyleSheet} from 'react-native';
import Theme, {normalized} from '../../Theme';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.big,
  },
  statusView: {
    flex: 4,
    alignItems: 'center',
  },
  statusTitle: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.small,
  },
  optionTitle: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.small,
  },
  bottomView: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CallBtnView: {
    padding: scale(10),
    backgroundColor: Theme.colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(100),
    zIndex: 1,
  },
  optionView: {
    height: scale(60),
    width: scale(60),
    // borderWidth: 4,
    borderColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(100),
  },
  flatlistItemView: {
    margin: scale(45),
    marginVertical: scale(35),
    gap: scale(8),
    alignItems: 'center',
  },
});
