import React, {useCallback, useRef} from 'react';
import {View} from 'react-native';
import GenericComponent from '~/components/common/GenericComponent';
import GuessTheCapitalGame from '~/components/game/GuessTheCapitalGame';
import GuessTheFlagGame from '~/components/game/GuessTheFlagGame';
import GuessTheNeighbourGame from '~/components/game/GuessTheNeighbourGame';
import {GameTypes} from '~/constants/ConstantValues';
import {getDurationString} from '~/helpers/Utils';
import {
  generateGuessTheNeighbourQuestions,
  generateQuestionsAndAnswers,
} from '~/service/GenerateQuestionsAndAnswers';
import * as CommonStyles from '~/theme/CommonStyles';

/**
 * @param {GameScreenProps} props
 * @returns {JSX.Element}
 */
const GameScreen = props => {
  const {data} = props.route.params;

  /**
   * @type {React.MutableRefObject<number>}
   */
  const currentIndex = useRef(0);

  /**
   * @type {React.MutableRefObject<Questions[]>}
   */
  const questions = useRef();

  /**
   * @type {React.MutableRefObject<Date>}
   */
  const gameStartTime = useRef();

  /**
   * @type {React.MutableRefObject<number>}
   */
  const numberOfCorrectAnswers = useRef(0);

  /**
   * @param {string} item
   */
  const onItemSelected = item => {
    if (item === questions.current[currentIndex.current].correctAnswer) {
      numberOfCorrectAnswers.current++;
    }

    if (currentIndex.current + 1 !== data.numOfQuestions) {
      currentIndex.current = currentIndex.current + 1;
    } else {
      const gameEndTime = new Date();

      const seconds =
        (gameEndTime.getTime() - gameStartTime.current.getTime()) / 1000;

      props.navigation.replace('StatDetails', {
        data: {
          correctAns: numberOfCorrectAnswers.current,
          date: gameStartTime.current.toDateString(),
          time: gameStartTime.current.toTimeString().substr(0, 8),
          duration: getDurationString(seconds),
        },
      });
    }
  };

  const getData = useCallback(async () => {
    var questionResult;
    switch (data.gameType) {
      case GameTypes.guessTheCapital:
        questionResult = await generateQuestionsAndAnswers(
          data.region,
          data.numOfQuestions,
          c => c.capital,
          c => c.name,
        );
        break;
      case GameTypes.guessTheFlag:
        questionResult = await generateQuestionsAndAnswers(
          data.region,
          data.numOfQuestions,
          c => c.name,
          c => c.flag,
        );
        break;
      case GameTypes.guessTheNeighbour:
        questionResult = await generateGuessTheNeighbourQuestions(
          data.region,
          data.numOfQuestions,
        );
        break;
      default:
        break;
    }

    return questionResult;
  }, [data]);

  /**
   * @param {Questions[]} resultData
   * @returns {JSX.Element}
   */
  const createGameView = resultData => {
    questions.current = resultData;
    console.log(resultData);
    gameStartTime.current = new Date();

    return (
      <View
        style={{
          ...CommonStyles.styles.screen,
          ...CommonStyles.styles.centered,
        }}>
        {data.gameType === GameTypes.guessTheCapital && questions.current && (
          <GuessTheCapitalGame
            data={{
              options: questions.current[currentIndex.current].options,
              question: questions.current[currentIndex.current].question,
            }}
            onItemSelected={onItemSelected}
          />
        )}
        {data.gameType === GameTypes.guessTheFlag && questions.current && (
          <GuessTheFlagGame
            data={{
              options: questions.current[currentIndex.current].options,
              question: questions.current[currentIndex.current].question,
            }}
            onItemSelected={onItemSelected}
          />
        )}
        {data.gameType === GameTypes.guessTheNeighbour && questions.current && (
          <GuessTheNeighbourGame
            data={{
              options: questions.current[currentIndex.current].options,
              question: questions.current[currentIndex.current].question,
            }}
            onItemSelected={onItemSelected}
          />
        )}
      </View>
    );
  };

  return (
    <GenericComponent
      loadData={getData}
      onDataRecieved={resultData => createGameView(resultData)}
    />
  );
};

export default GameScreen;
