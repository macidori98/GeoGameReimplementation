import {StyleSheet} from 'react-native';
import Colors from './Colors';
import {RadiusDimension} from './Dimen';
export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  myShadow: {
    shadowColor: Colors.black,
    shadowOpacity: 0.86,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: RadiusDimension.extraSmall,
    elevation: RadiusDimension.extraSmall,
  },
});
