import { Container, CardItem, Card, Tabs, Tab } from 'native-base';
import { StyleSheet, FlatList, Platform, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { getMatchAnalysis } from '../../api/MatchAPI';
import { useFocusEffect } from '@react-navigation/core';
import { MatchAnalysisReport, TournamentDto, TournamentMatchDto } from '../../models/match';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
// import { ScrollView } from 'react-native-gesture-handler';

function MatchScore(props: { match: TournamentMatchDto }) {
    const { match } = props;
    return (
        <Card style={{ flex: 1, flexDirection: 'column' }} >
            <CardItem header style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <Text style={{ fontWeight: 'bold' }} >{match.homeTeam}-{match.homeTeamScore}</Text>
                <Text style={{ fontWeight: 'bold' }}>{match.visitorTeam}-{match.visitorTeamScore}</Text>
            </CardItem>
            <CardItem style={{ flexDirection: 'column', alignItems: 'flex-start' }} >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{}}>
                        <Text style={{ fontWeight: 'bold' }}>Batsman</Text>
                        {match.homeTeamScoreCard.batsmen.sort((a, b) => b.run - a.run).slice(0, 5).map(batsman => <Text key={batsman.name}>{batsman.name} {batsman.run}</Text>)}
                    </View>
                    <View style={{}}>
                        <Text style={{ fontWeight: 'bold' }}>Batsman</Text>
                        {match.visitorTeamScoreCard.batsmen.sort((a, b) => b.run - a.run).slice(0, 5).map(batsman => <Text key={batsman.name}>{batsman.name} {batsman.run}</Text>)}
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Bowler</Text>
                        {match.homeTeamScoreCard.bowlers.sort((a, b) => b.wicket - a.wicket).slice(0, 5).map(bowler => <Text key={bowler.name}>{bowler.name} {bowler.wicket}</Text>)}
                    </View>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Bowler</Text>
                        {match.visitorTeamScoreCard.bowlers.sort((a, b) => b.wicket - a.wicket).slice(0, 5).map(bowler => <Text key={bowler.name}>{bowler.name} {bowler.wicket}</Text>)}
                    </View>
                </View>
            </CardItem>
            <CardItem footer style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{match.winner}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{match.venue}{moment(new Date(match.playedDate)).format('MMMM d, YYYY')}</Text>
                </View>
            </CardItem>
        </Card >

    );
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
    const isWeb = Platform.OS == "web";
    const columns = isWeb ? 3 : 1;
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
        <Container  >
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
            <Tabs locked={true} tabBarPosition={isWeb ? 'top' : 'bottom'} >
                <Tab heading={'One on One'} >

                    {/* <ScrollView > */}
                    {matchAnalysis && matchAnalysis.matchBetweenTeam && matchAnalysis.matchBetweenTeam.length > 0 && <FlatList data={matchAnalysis.matchBetweenTeam} renderItem={renderItem} horizontal={true} keyExtractor={item => item.id} />}
                    {/* </ScrollView> */}
                    {/* {matchAnalysis && matchAnalysis.matchBetweenTeam && matchAnalysis.matchBetweenTeam.length > 0 && <FlatList data={matchAnalysis.matchBetweenTeam} renderItem={renderItem} keyExtractor={item => item.id} />} */}

                </Tab>
                <Tab heading={'Ground Battle'} >
                    <ScrollView>
                        {/* {isWeb ?
                            <View >
                                {matchAnalysis && matchAnalysis.homeTeamAtVenue && matchAnalysis.homeTeamAtVenue.length > 0 && <FlatList data={matchAnalysis.homeTeamAtVenue} renderItem={renderItem} numColumns={columns} horizontal={false} keyExtractor={item => item.id} />}
                                {matchAnalysis && matchAnalysis.visitorTeamAtVenue && matchAnalysis.visitorTeamAtVenue.length > 0 && <FlatList data={matchAnalysis.visitorTeamAtVenue} renderItem={renderItem} numColumns={columns} horizontal={false} keyExtractor={item => item.id} />}
                            </View>
                            :} */}
                        <View style={{ maxHeight: 500 }}>
                            {matchAnalysis && matchAnalysis.homeTeamAtVenue && matchAnalysis.homeTeamAtVenue.length > 0 && <FlatList data={matchAnalysis.homeTeamAtVenue} renderItem={renderItem} horizontal={true} keyExtractor={item => item.id} />}
                            {matchAnalysis && matchAnalysis.visitorTeamAtVenue && matchAnalysis.visitorTeamAtVenue.length > 0 && <FlatList data={matchAnalysis.visitorTeamAtVenue} renderItem={renderItem} horizontal={true} keyExtractor={item => item.id} />}
                        </View>

                    </ScrollView>
                </Tab>
                <Tab heading={'Last Matches'} >
                    <ScrollView>
                        {/* {isWeb ?
                            <View style={{ maxHeight: 500 }} >
                                {matchAnalysis && matchAnalysis.matchAgainstTeam && matchAnalysis.matchAgainstTeam.length > 0 && <FlatList data={matchAnalysis.matchAgainstTeam} renderItem={renderItem} numColumns={columns} horizontal={false} keyExtractor={item => item.id} />}
                                {matchAnalysis && matchAnalysis.matchByTeam && matchAnalysis.matchByTeam.length > 0 && <FlatList data={matchAnalysis.matchByTeam} renderItem={renderItem} horizontal={false} numColumns={columns} keyExtractor={item => item.id} />}
                            </View>
                            :} */}
                        <View style={{ maxHeight: 500 }}>
                            {matchAnalysis && matchAnalysis.matchAgainstTeam && matchAnalysis.matchAgainstTeam.length > 0 && <FlatList data={matchAnalysis.matchAgainstTeam} renderItem={renderItem} horizontal={true} keyExtractor={item => item.id} />}
                            {matchAnalysis && matchAnalysis.matchByTeam && matchAnalysis.matchByTeam.length > 0 && <FlatList data={matchAnalysis.matchByTeam} renderItem={renderItem} horizontal={true} keyExtractor={item => item.id} />}
                        </View>


                    </ScrollView>
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

