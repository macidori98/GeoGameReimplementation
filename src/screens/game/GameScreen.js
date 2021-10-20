import React from 'react';
import {View} from 'react-native';
import GuessTheCapitalGame from '~/components/game/GuessTheCapitalGame';
import GuessTheFlagGame from '~/components/game/GuessTheFlagGame';
import GuessTheNeighbourGame from '~/components/game/GuessTheNeighbourGame';
import {GameTypes} from '~/constants/ConstantValues';
import * as CommonStyles from '~/theme/CommonStyles';

/**
 * @param {GameScreenProps} props
 * @returns {JSX.Element}
 */
const GameScreen = props => {
  const {data} = props.route.params;

  return (
    <View
      style={{...CommonStyles.styles.screen, ...CommonStyles.styles.centered}}>
      {data.gameType === GameTypes.guessTheCapital && (
        <GuessTheCapitalGame data={data} onItemSelected={() => {}} />
      )}
      {data.gameType === GameTypes.guessTheFlag && (
        <GuessTheFlagGame data={data} onItemSelected={() => {}} />
      )}
      {data.gameType === GameTypes.guessTheNeighbour && (
        <GuessTheNeighbourGame data={data} onItemSelected={() => {}} />
      )}
    </View>
  );
};

export default GameScreen;
