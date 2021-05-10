import { useFocusEffect } from '@react-navigation/core';
import i18n from 'i18n-js';
import { Text, Card, CardItem, Body } from 'native-base';

import React, { useCallback, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { getRunningTournament, getMatches } from '../../api/MatchAPI';
import Moment from 'moment';

function HomeScreen() {
  const [tournament, setTournament] = useState('');
  const [matches, setMatches] = useState([]);
  const getTournament = () => {
    getRunningTournament().then(data => {
      setTournament(`${data[0].tournamentName} - ${data[0].season}`);
      getMatches(data[0].tournamentId, data[0].season).then(data => {
        setMatches(data);
      });
    });
  };

  useFocusEffect(
    useCallback(() => {
      getTournament();
    }, []),
  );

  const renderItem = ({ item, index }) => (
    <Card>
      <CardItem header>
        <Text>
          Match {index + 1} {item.homeTeam} vs {item.visitorTeam}
        </Text>
      </CardItem>
      <CardItem>
        <Text>
          {item.venue}-{Moment(item.playedDate).format('dddd, MMMM Do YYYY')}
        </Text>
      </CardItem>
      <CardItem footer>
        <Text>{item.winner}</Text>
      </CardItem>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}> {i18n.t('::Welcome')}</Text>
      <Text style={styles.centeredText}> {i18n.t('::LongWelcomeMessage')}</Text> */}
      <Text>{tournament}</Text>
      <FlatList data={matches} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  centeredText: {
    textAlign: 'center',
  },
  title: {
    marginBottom: 30,
    fontSize: 32,
    fontWeight: '300',
    textAlign: 'center',
  },
});

export default HomeScreen;

