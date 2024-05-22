import {StyleSheet} from 'react-native';
import Theme, {normalized} from '../../Theme';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperView: {
    flex: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: scale(10),
  },
  title: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.big,
  },
  contactPicView: {
    borderRadius: scale(400),
    overflow: 'hidden',
    height: scale(145),
    width: scale(145),
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusView: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTitle: {
    color: Theme.colors.white,
    fontSize: Theme.fontSizes.xmedium,
  },
  bottomView: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBtnView: {
    padding: scale(10),
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(100),
    zIndex: 1,
  },
  arrows: {
    width: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
