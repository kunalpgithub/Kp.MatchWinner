import { Text, Container, Content, CardItem, Card, Grid, Col, Row, Button, Tabs, Tab, Header, ScrollableTab, View } from 'native-base';
import { StyleSheet, ScrollView, FlatList, Platform } from 'react-native';
import React, { useCallback, useState } from 'react';
import { getMatchAnalysis } from '../../api/MatchAPI';
import { useFocusEffect } from '@react-navigation/core';
import { MatchAnalysisReport, TournamentDto, TournamentMatchDto } from '../../models/match';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { ScrollView } from 'react-native-gesture-handler';

function MatchScore(props: { match: TournamentMatchDto }) {
    const { match } = props;
    return (<>

        <Card style={{ width: 500 }} >
            <CardItem header>
                <Grid>

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
                            {match.homeTeamScoreCard.batsmen.sort((a, b) => b.run - a.run).slice(0, 5).map(batsman => <Text key={batsman.name}>{batsman.name} {batsman.run}</Text>)}
                        </Col>
                        <Col>
                            {match.visitorTeamScoreCard.batsmen.sort((a, b) => b.run - a.run).slice(0, 5).map(batsman => <Text key={batsman.name}>{batsman.name} {batsman.run}</Text>)}
                        </Col>
                    </Row>
                    <Row>
                        <Col><Text style={{ fontWeight: 'bold' }}>Bowler</Text></Col>
                        <Col><Text style={{ fontWeight: 'bold' }}>Bowler</Text></Col>
                    </Row>
                    <Row>
                        <Col>
                            {match.homeTeamScoreCard.bowlers.sort((a, b) => b.wicket - a.wicket).slice(0, 5).map(bowler => <Text key={bowler.name}>{bowler.name} {bowler.wicket}</Text>)}
                        </Col>
                        <Col>
                            {match.visitorTeamScoreCard.bowlers.sort((a, b) => b.wicket - a.wicket).slice(0, 5).map(bowler => <Text key={bowler.name}>{bowler.name} {bowler.wicket}</Text>)}
                        </Col>
                    </Row>
                </Grid>
            </CardItem>
            <CardItem footer>
                <Grid>
                    <Row><Text style={{ fontWeight: 'bold' }}>{match.winner}</Text></Row>
                    <Row>
                        <Text style={{ fontWeight: 'bold' }}>{match.venue}{moment(new Date(match.playedDate)).format('MMMM d, YYYY')}</Text>
                    </Row>
                </Grid>
            </CardItem>
        </Card>

    </>);
}

const renderItem = ({ item }: { item: TournamentMatchDto }) => <MatchScore match={item}></MatchScore >

const ListHeader = () => {
    //View to set in Header
    return (
        <View style={styles.headerFooterStyle}>
            <Text style={styles.textStyle}>
                This is Header
            </Text>
        </View>
    );
};


function MatchScreen({ navigation, route }) {
    const { match } = route.params;
    const columns = Platform.OS == "web" ? 5 : 1;
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
            <Tabs scrollWithoutAnimation={true}>
                <Tab heading={'One on One'}   >
                    {/* <View style={{ flex: 1, maxHeight: 600 }} > */}
                    <ScrollView horizontal={Platform.OS == "web"} >
                        {matchAnalysis && matchAnalysis.matchBetweenTeam && matchAnalysis.matchBetweenTeam.length > 0 && <FlatList data={matchAnalysis.matchBetweenTeam} renderItem={renderItem} numColumns={columns} horizontal={false} keyExtractor={item => item.id} />}
                    </ScrollView>
                    {/* </View> */}
                </Tab>
                <Tab heading={'Ground Battle'} >
                    <View style={{ maxHeight: 500 }} >
                        <ScrollView horizontal={Platform.OS == "web"}>
                            {matchAnalysis && matchAnalysis.homeTeamAtVenue && matchAnalysis.homeTeamAtVenue.length > 0 && <FlatList data={matchAnalysis.homeTeamAtVenue} renderItem={renderItem} numColumns={columns} horizontal={false} keyExtractor={item => item.id} />}
                        </ScrollView>
                        <ScrollView horizontal={Platform.OS == "web"}>
                            {matchAnalysis && matchAnalysis.visitorTeamAtVenue && matchAnalysis.visitorTeamAtVenue.length > 0 && <FlatList data={matchAnalysis.visitorTeamAtVenue} renderItem={renderItem} numColumns={columns} horizontal={false} keyExtractor={item => item.id} />}
                        </ScrollView>
                    </View>
                </Tab>
                <Tab heading={'Last Matches'} >
                    <View style={{ maxHeight: 500 }} >
                        <ScrollView horizontal={Platform.OS == "web"}>
                            {matchAnalysis && matchAnalysis.matchAgainstTeam && matchAnalysis.matchAgainstTeam.length > 0 && <FlatList data={matchAnalysis.matchAgainstTeam} renderItem={renderItem} numColumns={columns} horizontal={false} keyExtractor={item => item.id} />}
                        </ScrollView>
                        <ScrollView horizontal={Platform.OS == "web"}>
                            {matchAnalysis && matchAnalysis.matchByTeam && matchAnalysis.matchByTeam.length > 0 && <FlatList data={matchAnalysis.matchByTeam} renderItem={renderItem} horizontal={false} numColumns={columns} keyExtractor={item => item.id} />}
                        </ScrollView>
                    </View>

                </Tab>
            </Tabs>
        </Container >
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
    emptyListStyle: {
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
    },
    itemStyle: {
        padding: 10,
    },
    headerFooterStyle: {
        width: '100%',
        height: 45,
        backgroundColor: '#606070',
    },
    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        padding: 7,
    },
});

export default MatchScreen;

