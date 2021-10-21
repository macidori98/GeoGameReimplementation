import {StyleSheet} from 'react-native';
import Colors from './Colors';
import {
  HeightDimension,
  MarginDimension,
  RadiusDimension,
  WidthDimension,
} from './Dimen';
import FontSizes from './FontSizes';
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

export const gameComponentStyles = StyleSheet.create({
  question: {
    margin: MarginDimension.large,
    fontWeight: 'bold',
    fontSize: FontSizes.large,
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    width: WidthDimension.extraLarge,
    height: HeightDimension.extraLarge,
    marginTop: MarginDimension.large,
    borderRadius: RadiusDimension.large,
  },
  list: {
    flexDirection: 'row',
  },
  listItem: {
    width: WidthDimension.extraLarge,
    height: HeightDimension.large,
    backgroundColor: Colors.darkPink,
    margin: MarginDimension.small,
    alignSelf: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: RadiusDimension.large,
    borderBottomRightRadius: RadiusDimension.large,
  },
  centeredText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: 'bold',
  },
});
