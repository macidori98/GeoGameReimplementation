import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TouchableItem from '../common/TouchableItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '~/theme/Colors';
import {HelperButtonsLabel} from '~/constants/ConstantValues';
import {MarginDimension} from '~/theme/Dimen';
import FontSizes from '~/theme/FontSizes';

/**
 * @param {{onBack: () => void, title: string}} props
 * @returns {JSX.Element}
 */
const CustomNavBar = props => {
  return (
    <View style={styles.navContainer}>
      <View style={styles.rowItem}>
        <TouchableItem onPress={props.onBack}>
          <View style={styles.backButtonContainer}>
            <Ionicons
              name="arrow-back-outline"
              size={30}
              color={Colors.darkPink}
            />
            <Text style={styles.text}>{HelperButtonsLabel.back}</Text>
          </View>
        </TouchableItem>
      </View>
      <View style={styles.rowCenteredItem}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.rowItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: MarginDimension.small,
  },
  rowItem: {
    flex: 1,
    paddingRight: 10,
  },
  text: {
    fontSize: FontSizes.medium,
    color: Colors.darkPink,
    fontWeight: '200',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: FontSizes.medium,
  },
  rowCenteredItem: {
    flex: 1,
    paddingRight: 10,
    alignItems: 'center',
  },
});

export default CustomNavBar;
