import { useFocusEffect } from '@react-navigation/core';
import { Text, Card, CardItem, Container, Content, Grid, Col, Row, H3, View } from 'native-base';
import React, { useCallback, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { getRunningTournament, getMatches } from '../../api/MatchAPI';
import Moment from 'moment';
import { CurrentTournamentDto, TournamentMatchDto } from '../../models/match';
import styles from './styles'

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

    const renderItem = ({ item, index }) => (

        <Card  >
            <CardItem style={styles.cardFullWidth} header bordered button onPress={() => navigateToMatch(item)}>
                <Grid>
                    <Col style={{ alignItems: 'flex-start' }} ><Text style={styles.cardDescription}>Match {index + 1} </Text></Col>
                    <Col style={{ alignItems: 'flex-end' }}><Text style={styles.cardDescription}>{Moment(item.playedDate).format('dddd, MMMM Do YYYY')}</Text></Col>
                </Grid>
            </CardItem>
            <CardItem style={styles.tournamentCardItem} button onPress={() => navigateToMatch(item)}>
                <Grid style={{ alignItems: 'center' }}>
                    <Row >
                        <Text style={styles.cardContent} >{item.homeTeam}</Text >
                    </Row>
                    <Row>
                        <Text style={styles.cardDescription} >vs</Text>
                    </Row>
                    <Row>
                        <Text style={styles.cardContent} >{item.visitorTeam}</Text >
                    </Row>
                </Grid>
            </CardItem>
            <CardItem style={styles.tournamentCardItem} footer bordered button onPress={() => navigateToMatch(item)}>
                <Grid style={{ alignItems: 'center' }}>
                    <Row><Text style={styles.cardDescription}>{item.winner}</Text></Row>
                    <Row >
                        <Text style={styles.cardDescription}>{item.venue}</Text>
                    </Row>
                </Grid>
            </CardItem>
        </Card>
    );

    return (
        <Container style={styles.container} >
            <Text style={styles.screenHeader}>{tournament}</Text>
            <FlatList data={matches} renderItem={renderItem} keyExtractor={item => item.id} />
        </Container>
    );
}
export default ScheduleScreen;

