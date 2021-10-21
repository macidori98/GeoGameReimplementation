import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import LoadingIndicator from '~/components/common/LoadingIndicator';
import GuessTheCapitalGame from '~/components/game/GuessTheCapitalGame';
import {GameTypes} from '~/constants/ConstantValues';
import {getDurationString} from '~/helpers/Utils';
import {generateGuessCapitalQuestionsAndAnswers} from '~/service/GenerateGuessTheCapitalQuestions';
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
   * @type {ComponentState<{country: string, correctAnswer: string, options: string[]}[]>}
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

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const questionResult = await generateGuessCapitalQuestionsAndAnswers(
        data.region,
        data.numOfQuestions,
      );

      setQuestions(questionResult);
      setIsLoading(false);
      gameStartTime.current = new Date();
    };

    getData();
  }, [data]);

  return (
    <View
      style={{...CommonStyles.styles.screen, ...CommonStyles.styles.centered}}>
      {isLoading && !questions && <LoadingIndicator />}
      {data.gameType === GameTypes.guessTheCapital && questions && (
        <GuessTheCapitalGame
          data={{
            options: questions[currentIndex].options,
            question: questions[currentIndex].country,
          }}
          onItemSelected={onItemSelected}
        />
      )}
    </View>
  );
};

export default GameScreen;
