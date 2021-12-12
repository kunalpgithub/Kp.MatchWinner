import { useFocusEffect } from '@react-navigation/core';
import { Text, Card, CardItem, Container, Content, Grid, Col, Row, H3 } from 'native-base';
import React, { useCallback, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { getRunningTournament, getMatches } from '../../api/MatchAPI';
import Moment from 'moment';
import { CurrentTournamentDto, TournamentMatchDto } from '../../models/match';


function HomeScreen({ navigation }) {


  return (
    <Container style={styles.container} >
      <Text primary>Welcome Home</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // backgroundColor: '#fff',
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
  card: {
    // width: 500,
  },
  cardHeader: {
    // backgroundColor: '#FA56FA',
  },
  cardFooter: {
    // backgroundColor: '#FA56FA',
  },
  cardItem: {
    // backgroundColor: '#FA56FA',
    color: "#AE3CAE",

    // backgroundColor: '#FA56FA',
  }
});

export default HomeScreen;

