import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {GameTypesObjects} from '~/constants/ConstantValues';
import {generateGuessCapitalQuestions} from '~/gamelogic/GenerateGuessTheCapitalQuestions';
import Colors from '~/theme/Colors';

var ans = 0;

/**
 * @param {GuessGameProps} props
 * @returns {JSX.Element}
 */
const GuessTheCapitalGame = props => {
  const {data} = props;

  /**
   * @type {ComponentState<number>}
   */
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * @type {ComponentState<{country: string, correctAnswer: string, options: string[]}[]>}
   */
  const [questions, setQuestions] = useState();

  /**
   * @param {string} item
   */
  const onItemSelected = item => {
    if (item === questions[currentIndex].correctAnswer) {
      ans++;
    }

    if (currentIndex + 1 !== data.numOfQuestions) {
      setCurrentIndex(prev => prev + 1);
    } else {
      Alert.alert(ans.toString());
    }
  };

  const question = GameTypesObjects.find(item => item.id === data.gameType);

  useEffect(() => {
    const getData = async () => {
      const questionResult = await generateGuessCapitalQuestions(
        data.region,
        data.numOfQuestions,
      );

      setQuestions(questionResult);
    };

    getData();
  }, [data]);

  return (
    <View>
      {questions && (
        <>
          <View>
            <Text style={styles.question}>
              {question.name} of {questions[currentIndex].country}
            </Text>
          </View>
          <View style={styles.list}>
            <FlatList
              data={questions[currentIndex].options}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => onItemSelected(item)}>
                  <Text style={styles.centeredText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  question: {
    margin: 20,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
  list: {
    flexDirection: 'row',
  },
  listItem: {
    width: 250,
    height: 60,
    backgroundColor: Colors.darkPink,
    margin: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  centeredText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GuessTheCapitalGame;
