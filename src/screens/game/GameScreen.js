import React, {useEffect, useRef, useState} from 'react';
import {Alert, View} from 'react-native';
import GuessTheCapitalGame from '~/components/game/GuessTheCapitalGame';
import {GameTypes} from '~/constants/ConstantValues';
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
      Alert.alert(numberOfCorrectAnswers.current.toString());
    }
  };

  useEffect(() => {
    const getData = async () => {
      const questionResult = await generateGuessCapitalQuestionsAndAnswers(
        data.region,
        data.numOfQuestions,
      );

      setQuestions(questionResult);
    };

    getData();
  }, [data]);

  return (
    <View
      style={{...CommonStyles.styles.screen, ...CommonStyles.styles.centered}}>
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
