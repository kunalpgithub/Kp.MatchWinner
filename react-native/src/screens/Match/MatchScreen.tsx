import { Text, Container, Content, CardItem, Card, Grid, Col, Row, Button, Tabs, Tab, Header, ScrollableTab, View } from 'native-base';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import React, { useCallback, useState } from 'react';
import { getMatchAnalysis } from '../../api/MatchAPI';
import { useFocusEffect } from '@react-navigation/core';
import { MatchAnalysisReport, TournamentDto, TournamentMatchDto } from '../../models/match';
import moment from 'moment';
// import { ScrollView } from 'react-native-gesture-handler';

function MatchScore(props: { match: TournamentMatchDto }) {
    const { match } = props;
    return (<>

        <Card>
            <CardItem header>
                <Grid>
                    <Row>
                        <Text style={{ fontWeight: 'bold' }}>{match.venue}{moment(new Date(match.playedDate)).format('MMMM d, YYYY')}</Text>
                    </Row>
                    <Row>
                        <Col><Text style={{ fontWeight: 'bold' }} >{match.homeTeam}-{match.homeTeamScore}</Text></Col>
                        <Col><Text style={{ fontWeight: 'bold' }}>{match.visitorTeam}-{match.visitorTeamScore}</Text></Col>
                    </Row>

                </Grid>
            </CardItem>
            <CardItem>
                <Grid>
                    <Row>
                        <Col><Text style={{ fontWeight: 'bold' }}>BatsMan</Text></Col>
                        <Col><Text style={{ fontWeight: 'bold' }} > BatsMan</Text></Col>
                    </Row>
                    <Row>
                        <Col>
                            {match.homeTeamScoreCard.batsmen.sort((a, b) => b.run - a.run).slice(0, 5).map(batsman => <Text>{batsman.name} {batsman.run}</Text>)}
                        </Col>
                        <Col>
                            {match.visitorTeamScoreCard.batsmen.sort((a, b) => b.run - a.run).slice(0, 5).map(batsman => <Text>{batsman.name} {batsman.run}</Text>)}
                        </Col>
                    </Row>

                </Grid>
            </CardItem>
            <CardItem>
                <Grid>
                    <Row>
                        <Col><Text style={{ fontWeight: 'bold' }}>Bowler</Text></Col>
                        <Col><Text style={{ fontWeight: 'bold' }}>Bowler</Text></Col>
                    </Row>
                    <Row>
                        <Col>
                            {match.homeTeamScoreCard.bowlers.sort((a, b) => b.wicket - a.wicket).slice(0, 5).map(bowler => <Text>{bowler.name} {bowler.wicket}</Text>)}
                        </Col>
                        <Col>
                            {match.visitorTeamScoreCard.bowlers.sort((a, b) => b.wicket - a.wicket).slice(0, 5).map(bowler => <Text>{bowler.name} {bowler.wicket}</Text>)}
                        </Col>
                    </Row>
                </Grid>
            </CardItem>
            <CardItem footer>
                <Row><Text style={{ fontWeight: 'bold' }}>{match.winner}</Text></Row>
            </CardItem>
        </Card>

    </>);
}

const renderItem = ({ item }: { item: TournamentMatchDto }) => <MatchScore match={item}></MatchScore >


function MatchScreen({ navigation, route }) {
    const { match } = route.params;
    const [matchAnalysis, setMatchAnalysis] = useState<MatchAnalysisReport>();

    const getMatchAnalysisData = () => {
        getMatchAnalysis(match.homeTeam, match.visitorTeam, match.venue).then((data) => {
            setMatchAnalysis(data);
        });
    };
    useFocusEffect(
        useCallback(() => {
            getMatchAnalysisData();
        }, []),
    );

    return (
        <Container >
            {/* style={styles.container} */}
            {/* <Content> */}
            {/* 
                <Card>
                    <CardItem button onPress={() => { navigation.navigate('Tournament') }}>
                        <Text>Go to Back</Text>
                    </CardItem>
                </Card> */}
            {/* <Button><Text>My Button</Text></Button> 
                
                */}
            {/* <Header hasTabs /> */}
            <Tabs >
                <Tab heading={'One on One'} >
                    {matchAnalysis && matchAnalysis.matchBetweenTeam && matchAnalysis.matchBetweenTeam.length > 0 && <FlatList data={matchAnalysis.matchBetweenTeam} style={{ maxHeight: 700, marginBottom: 20 }} renderItem={renderItem} keyExtractor={item => item.id} />}
                </Tab>
                <Tab heading={'Ground Battle'} >
                    <Tabs>
                        <Tab heading={match.homeTeam} >
                            {matchAnalysis && matchAnalysis.homeTeamAtVenue && matchAnalysis.homeTeamAtVenue.length > 0 && <FlatList data={matchAnalysis.homeTeamAtVenue} style={{ maxHeight: 700, marginBottom: 20 }} renderItem={renderItem} keyExtractor={item => item.id} />}
                        </Tab>
                        <Tab heading={match.visitorTeam}  >
                            {matchAnalysis && matchAnalysis.visitorTeamAtVenue && matchAnalysis.visitorTeamAtVenue.length > 0 && <FlatList data={matchAnalysis.visitorTeamAtVenue} style={{ maxHeight: 700, marginBottom: 20 }} renderItem={renderItem} keyExtractor={item => item.id} />}
                        </Tab>
                    </Tabs>
                </Tab>
                <Tab heading={'Recent Matches'} >
                    <Tabs>
                        <Tab heading={match.visitorTeam} >
                            {matchAnalysis && matchAnalysis.matchAgainstTeam && matchAnalysis.matchAgainstTeam.length > 0 && <FlatList data={matchAnalysis.matchAgainstTeam} style={{ maxHeight: 700, marginBottom: 20 }} renderItem={renderItem} keyExtractor={item => item.id} />}
                        </Tab>
                        <Tab heading={match.homeTeam} >
                            {matchAnalysis && matchAnalysis.matchByTeam && matchAnalysis.matchByTeam.length > 0 && <FlatList data={matchAnalysis.matchByTeam} style={{ maxHeight: 700, marginBottom: 20 }} renderItem={renderItem} keyExtractor={item => item.id} />}
                        </Tab>
                    </Tabs>
                </Tab>
            </Tabs>
            {/* </Content> */}
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
    }
});
export default MatchScreen;

