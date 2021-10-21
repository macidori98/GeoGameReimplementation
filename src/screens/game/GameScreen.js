import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import LoadingIndicator from '~/components/common/LoadingIndicator';
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
   * @type {ComponentState<number>}
   */
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * @type {ComponentState<Questions[]>}
   */
  const [questions, setQuestions] = useState();

  /**
   * @type {ComponentState<boolean>}
   */
  const [isLoading, setIsLoading] = useState(false);

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
    if (item === questions[currentIndex].correctAnswer) {
      numberOfCorrectAnswers.current++;
    }

    if (currentIndex + 1 !== data.numOfQuestions) {
      setCurrentIndex(prev => prev + 1);
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
    setIsLoading(true);
    var questionResult;
    switch (data.gameType) {
      case GameTypes.guessTheCapital:
        questionResult = await generateQuestionsAndAnswers(
          data.region,
          data.numOfQuestions,
          'capital',
          'name',
        );
        break;
      case GameTypes.guessTheFlag:
        questionResult = await generateQuestionsAndAnswers(
          data.region,
          data.numOfQuestions,
          'name',
          'flag',
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

    setQuestions(questionResult);
    setIsLoading(false);
    gameStartTime.current = new Date();
  }, [data]);

  useEffect(() => {
    getData();
  }, [data, getData]);

  return (
    <View
      style={{...CommonStyles.styles.screen, ...CommonStyles.styles.centered}}>
      {isLoading && !questions && <LoadingIndicator />}
      {data.gameType === GameTypes.guessTheCapital && questions && (
        <GuessTheCapitalGame
          data={{
            options: questions[currentIndex].options,
            question: questions[currentIndex].question,
          }}
          onItemSelected={onItemSelected}
        />
      )}
      {data.gameType === GameTypes.guessTheFlag && questions && (
        <GuessTheFlagGame
          data={{
            options: questions[currentIndex].options,
            question: questions[currentIndex].question,
          }}
          onItemSelected={onItemSelected}
        />
      )}
      {data.gameType === GameTypes.guessTheNeighbour && questions && (
        <GuessTheNeighbourGame
          data={{
            options: questions[currentIndex].options,
            question: questions[currentIndex].question,
          }}
          onItemSelected={onItemSelected}
        />
      )}
    </View>
  );
};

export default GameScreen;
