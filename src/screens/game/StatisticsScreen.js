import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import StatisticsItem from '~/components/game/StatisticsItem';
import TouchableItem from '~/components/common/TouchableItem';
import * as CommonStyles from '~/theme/CommonStyles';
import {MarginDimension} from '~/theme/Dimen';
import ShadowedTextContainer from '~/components/common/ShadowedTextContainer';
import {HelperButtonsLabel, NoGameYet} from '~/constants/ConstantValues';
import * as statisticsActions from '~/store/actions/statistics';
import {useDispatch, useSelector} from 'react-redux';
import CustomText from '~/components/common/CustomText';
import FontSizes from '~/theme/FontSizes';

/**
 * @param {import('@react-navigation/core').CompositeScreenProps<
 *            import('@react-navigation/native-stack').NativeStackScreenProps<GameNavigationParamList, 'Statistics'>,
 *            import('@react-navigation/core').CompositeScreenProps<
 *                import('@react-navigation/bottom-tabs').BottomTabScreenProps<BottomTabBarParamList>,
 *                import('@react-navigation/core').CompositeScreenProps<
 *                  import('@react-navigation/native-stack').NativeStackScreenProps<MainNavigationParamList>,
 *                  import('@react-navigation/native-stack').NativeStackScreenProps<ModalScreensParamList>>
 *                >
 *        >} props
 * @returns {JSX.Element}
 */
const StatisticsScreen = props => {
  const statisticsState = useSelector(
    /**@param {{statistics: StatisticsStateObj}} state*/ state => {
      return state.statistics;
    },
  );

  /**
   * @type {ComponentState<StatisticsDataWithQuestions[]>}
   */
  const [datas, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(statisticsActions.getPlayedGamesData());
    };

    getData();
  }, [dispatch]);

  useEffect(() => {
    if (statisticsState.games.length !== 0) {
      setData(statisticsState.games);
    }
  }, [statisticsState.games]);

  return (
    <ScrollView>
      <View style={CommonStyles.styles.centered}>
        <TouchableItem
          onPress={() => {
            props.navigation.navigate('ModalScreens', {
              screen: 'GameConfigModal',
              params: {
                onStartGame: data => {
                  props.navigation.goBack();
                  props.navigation.navigate('Gaming', {data: data});
                },
              },
            });
          }}>
          <ShadowedTextContainer title={HelperButtonsLabel.startGame} />
        </TouchableItem>
      </View>
      {datas.length > 0 &&
        datas.map((item, index) => (
          <View style={styles.itemContainer} key={item.data.date + index}>
            <TouchableItem
              onPress={() => {
                props.navigation.navigate('StatDetails', {data: item});
              }}>
              <StatisticsItem data={item} />
            </TouchableItem>
          </View>
        ))}
      {datas.length === 0 && (
        <View style={CommonStyles.styles.centered}>
          <CustomText text={NoGameYet.noGamePlayed} size={FontSizes.large} />
          <CustomText text={NoGameYet.letsPlay} size={FontSizes.large} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: MarginDimension.small,
    ...CommonStyles.styles.centered,
  },
});

export default StatisticsScreen;
