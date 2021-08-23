import { useFocusEffect } from '@react-navigation/core';
import { Text, Card, CardItem, Container, Content, Grid, Col, Row, H3 } from 'native-base';
import React, { useCallback, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { getRunningTournament, getMatches } from '../../api/MatchAPI';
import Moment from 'moment';
import { CurrentTournamentDto, TournamentMatchDto } from '../../models/match';


function TournamentScreen({ navigation }) {
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
        navigation.navigate('Match', { screen: 'Match', params: { match: match, test: 'data' } });
    }

    const renderItem = ({ item, index }) => (

        <Card style={styles.card} >
            <CardItem header bordered button onPress={() => navigateToMatch(item)}>
                <Grid>
                    <Col style={{ alignItems: 'flex-start' }} ><Text>Match {index + 1} </Text></Col>
                    <Col style={{ alignItems: 'flex-end' }}><Text>{Moment(item.playedDate).format('dddd, MMMM Do YYYY')}</Text></Col>
                </Grid>
            </CardItem>
            <CardItem button onPress={() => navigateToMatch(item)}>
                <Grid style={{ alignItems: 'center' }}>
                    <Row >
                        <H3>{item.homeTeam}</H3>
                    </Row>
                    <Row>
                        <Text>vs</Text>
                    </Row>
                    <Row>
                        <H3>{item.visitorTeam}</H3>
                    </Row>
                </Grid>
            </CardItem>
            <CardItem footer bordered button onPress={() => navigateToMatch(item)}>
                <Grid style={{ alignItems: 'center' }}>
                    <Row><Text>{item.winner}</Text></Row>
                    <Row >
                        <Text>{item.venue}</Text>
                    </Row>
                </Grid>
            </CardItem>
        </Card>
    );

    return (
        <Container style={styles.container} >
            <Content>
                {/* <View style={styles.container}> */}
                {/* <Text style={styles.title}> {i18n.t('::Welcome')}</Text>
      <Text style={styles.centeredText}> {i18n.t('::LongWelcomeMessage')}</Text> */}
                <Text style={styles.title}>{tournament}</Text>
                {/* </View> */}
                {/* <View style={styles.container}> */}
                <FlatList data={matches} renderItem={renderItem} keyExtractor={item => item.id} />
                {/* </View> */}
            </Content>
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

export default TournamentScreen;

