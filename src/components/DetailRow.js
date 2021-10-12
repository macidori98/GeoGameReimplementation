import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as CommonStyles from '~/theme/CommonStyles';
import {MarginDimension} from '~/theme/Dimen';
import CustomText from './CustomText';

/**
 * @param {DetailRowProps} props
 * @returns {JSX.Element}
 */
const DetailRow = props => {
  return (
    <View style={styles.countryDetailsContainer}>
      <View style={CommonStyles.styles.screen}>
        <View style={styles.contur}>
          <CustomText text={props.label} />
        </View>
      </View>
      <View style={styles.countryDetailValuesContainer}>
        <View style={styles.contur}>{props.children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countryDetailsContainer: {
    marginTop: MarginDimension.extraLarge,
    flexDirection: 'row',
  },
  countryDetailValuesContainer: {
    flex: 2,
  },
  contur: {
    marginStart: 40,
  },
});

export default DetailRow;
