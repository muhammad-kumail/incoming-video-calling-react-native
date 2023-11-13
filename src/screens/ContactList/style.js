import {StyleSheet} from 'react-native';
import Theme, {normalized} from '../../Theme';

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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
