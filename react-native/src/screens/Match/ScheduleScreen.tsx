import { useFocusEffect } from '@react-navigation/core';
import { Text, Card, CardItem, Container, Content, Grid, Col, Row, H3, View, Body, Left, Right } from 'native-base';
import React, { useCallback, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { getRunningTournament, getMatches } from '../../api/MatchAPI';
import Moment from 'moment';
import { CurrentTournamentDto, TournamentMatchDto } from '../../models/match';
import matchStyles from './matchStyles'
import { baseStyles } from '../../styles/base'
import { MatchCard } from './MatchCard';

function ScheduleScreen({ navigation }) {
    const [tournament, setTournament] = useState<string>('');
    const [matches, setMatches] = useState<TournamentMatchDto[]>([]);

    const getTournament = () => {
        getRunningTournament().then((data: CurrentTournamentDto[]) => {
            setTournament(`${data[0].tournamentName} - ${data[0].season}`);
            getMatches(data[0].tournamentId, data[0].season).then((data: TournamentMatchDto[]) => {
                setMatches(data);
            });
        });
    };

    useFocusEffect(
        useCallback(() => {
            getTournament();
        }, []),
    );

    const navigateToMatch = (match: TournamentMatchDto) => {
        // navigation.navigate('Match', { screen: 'Match', params: { match: match, test: 'data' } });
        navigation.navigate('Match', { match: match, test: 'data' })
    }

    // const renderItem = ({ item, index }) => index < 3 ? (

    //     <MatchCard match={item} index={index} navigateToMatch={navigateToMatch}></MatchCard>
    // ) : null;

    return (
        <Content contentContainerStyle={baseStyles.container} >
            <Text primary style={baseStyles.header}>{tournament}</Text>
            <FlatList data={matches} renderItem={({ item, index }) => Moment(item.playedDate) >= Moment() && <MatchCard match={item} index={index} navigateToMatch={navigateToMatch}></MatchCard>} keyExtractor={item => item.id} />
        </Content>
    );
}
export default ScheduleScreen;

