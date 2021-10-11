import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as CommonStyles from '~/theme/CommonStyles';
import Dimen from '~/theme/Dimen';
import CustomText from './CustomText';

const DetailRow = props => {
  return (
    <View style={styles.countryDetailsContainer}>
      <View style={CommonStyles.styles.screen}>
        <View style={styles.contur}>
          <CustomText text={props.label} />
        </View>
      </View>
      <View style={CommonStyles.styles.screen}>
        <View style={styles.contur}>{props.children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countryDetailsContainer: {
    marginTop: Dimen.dim30,
    flexDirection: 'row',
  },
  contur: {
    marginStart: 40,
  },
});

export default DetailRow;
