import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from '~/components/common/CustomText';

/**
 * @param {StatisticDetailsScreenProps} props
 * @returns {JSX.Element}
 */
const StatisticDetailsScreen = props => {
  const {data} = props.route.params;
  return (
    <View>
      <CustomText text={`Correct answers number: ${data.correctAns}`} />
      <CustomText text={`Date: ${data.date}`} />
      <CustomText text={`Time: ${data.time}`} />
      <CustomText text={`Duration: ${data.duration}`} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default StatisticDetailsScreen;
