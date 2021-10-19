import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from '~/components/common/CustomText';
import FontSizes from '~/theme/FontSizes';
import * as CommonStyles from '~/theme/CommonStyles';

/**
 * @param {StatisticDetailsScreenProps} props
 * @returns {JSX.Element}
 */
const StatisticDetailsScreen = props => {
  const {data} = props.route.params;
  return (
    <View style={styles.container}>
      <CustomText
        text={`Correct answers number: ${data.correctAns}`}
        size={FontSizes.large}
      />
      <CustomText text={`Date: ${data.date}`} />
      <CustomText text={`Time: ${data.time}`} />
      <CustomText text={`Duration: ${data.duration}`} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.styles.centered,
    ...CommonStyles.styles.screen,
  },
});

export default StatisticDetailsScreen;
