import { Tabs, Tab, Content, Text, Segment, Button, Container, CardItem, Card, Left, Right, View } from 'native-base';
import { FlatList, Platform } from 'react-native';
import React, { useCallback, useState } from 'react';
import { getMatchAnalysis } from '../../api/MatchAPI';
import { useFocusEffect } from '@react-navigation/core';
import { BatsManDto, BowlerDto, MatchAnalysisReport, TournamentMatchDto } from '../../models/match';
import MatchScore from './MatchScore';
import { string } from 'prop-types';


function MatchScreen({ navigation, route }) {
    const { match } = route.params;
    const isWeb = Platform.OS == 'web';
    const columns = isWeb ? 3 : 1;
    const [matchAnalysis, setMatchAnalysis] = useState<MatchAnalysisReport>();
    const [isGroundBattleHome, setIsGroundBattleHome] = useState<boolean>(true);
    const [isLastMatchHome, setIsLastMatchHome] = useState<boolean>(true);
    const [rankedPlayerList, setRankedPlayerList] = useState<rankedPlayer[]>();

    const getMatchAnalysisData = () => {
        getMatchAnalysis(match.homeTeam, match.visitorTeam, match.venue).then(data => {
            setMatchAnalysis(data);
            RankPlayers(data);
        });
    };
    useFocusEffect(
        useCallback(() => {
            getMatchAnalysisData();
        }, []),
    );
    type rankedPlayer = {
        name: string,
        playerType: 'batsman' | 'bowler',
        rank: number,
        plus10: number,
        plus20: number,
        plus30: number,
        plus40: number,
        plus50: number,
        wickets: number
    }

    let rankedPlayers: rankedPlayer[] = []
    const rankPlayer = <Type extends BatsManDto | BowlerDto>(currentValue: Type): Type => {

        let player: rankedPlayer = {
            name: currentValue.name,
            rank: 0,
            plus10: 0,
            plus20: 0,
            plus30: 0,
            plus40: 0,
            plus50: 0,
            wickets: 0
        };
        if (rankedPlayers && rankedPlayers.some(player => player.name == currentValue.name)) {
            const index = rankedPlayers.findIndex((player) => player.name == currentValue.name);
            player = rankedPlayers[index];
            calculateRank(player, currentValue);
        }
        else {
            calculateRank(player, currentValue);
            rankedPlayers.push(player);
        }
        return currentValue;
    }

    function calculateRank(player: rankedPlayer, currentValue: BatsManDto | BowlerDto) {
        if ((currentValue as BatsManDto).wicketBy !== undefined) {
            if (currentValue.run < 10)
                player.plus10 += 1;
            else if (currentValue.run >= 10 && currentValue.run < 20)
                player.plus20 += 1
            else if (currentValue.run >= 20 && currentValue.run < 30)
                player.plus30 += 1
            else if (currentValue.run >= 30 && currentValue.run < 40)
                player.plus40 += 1
            else if (currentValue.run >= 50)
                player.plus50 += 1

            player.rank += currentValue.run / 10;
            player.playerType = 'batsman'

        }
        else if ((currentValue as BowlerDto).wicket !== undefined) {

            let currentPlayer = (currentValue as BowlerDto);

            if (currentPlayer.wicket <= 1)
                player.plus10 += 1;
            else if (currentPlayer.wicket <= 2 && currentPlayer.wicket > 1)
                player.plus20 += 1
            else if (currentPlayer.wicket <= 3 && currentPlayer.wicket > 2)
                player.plus30 += 1
            else if (currentPlayer.wicket > 3)
                player.plus40 += 1

            player.wickets += (currentValue as BowlerDto).wicket
            player.rank += (currentValue as BowlerDto).wicket / 3;
            player.playerType = 'bowler'
        }
    }

    const RankPlayers = (data: MatchAnalysisReport) => {

        data.matchBetweenTeam.forEach((match) => {
            match.homeTeamScoreCard.batsmen.forEach(batsman => rankPlayer(batsman));
            match.homeTeamScoreCard.bowlers.forEach(bowler => rankPlayer(bowler));
            match.visitorTeamScoreCard.batsmen.forEach(batsman => rankPlayer(batsman));
            match.visitorTeamScoreCard.bowlers.forEach(bowler => rankPlayer(bowler));
        });
        data.homeTeamAtVenue.forEach((homeTeam) => {
            if (homeTeam.homeTeam == match.homeTeam) {
                homeTeam.homeTeamScoreCard.batsmen.forEach(batsman => rankPlayer(batsman));
                homeTeam.homeTeamScoreCard.bowlers.forEach(bowler => rankPlayer(bowler));
            }
            if (homeTeam.visitorTeam == match.homeTeam) {
                homeTeam.visitorTeamScoreCard.batsmen.forEach(batsman => rankPlayer(batsman));
                homeTeam.visitorTeamScoreCard.bowlers.forEach(bowler => rankPlayer(bowler));
            }

        })
        data.visitorTeamAtVenue.forEach((visitorTeamMatch) => {
            if (visitorTeamMatch.visitorTeam == match.visitorTeam) {
                visitorTeamMatch.visitorTeamScoreCard.batsmen.forEach(batsman => rankPlayer(batsman));
                visitorTeamMatch.visitorTeamScoreCard.bowlers.forEach(bowler => rankPlayer(bowler));
            }
            if (visitorTeamMatch.homeTeam == match.visitorTeam) {
                visitorTeamMatch.homeTeamScoreCard.batsmen.forEach(batsman => rankPlayer(batsman));
                visitorTeamMatch.homeTeamScoreCard.bowlers.forEach(bowler => rankPlayer(bowler));
            }

        })
        data.matchAgainstTeam.forEach((againstMatch) => {
            if (againstMatch.visitorTeam == match.homeTeam) {
                againstMatch.visitorTeamScoreCard.batsmen.forEach(batsman => rankPlayer(batsman));
                againstMatch.visitorTeamScoreCard.bowlers.forEach(bowler => rankPlayer(bowler));
            }
            if (againstMatch.homeTeam == match.homeTeam) {
                againstMatch.homeTeamScoreCard.batsmen.forEach(batsman => rankPlayer(batsman));
                againstMatch.homeTeamScoreCard.bowlers.forEach(bowler => rankPlayer(bowler));
            }
        })

        data.matchByTeam.forEach((byMatch) => {
            if (byMatch.visitorTeam == match.homeTeam) {
                byMatch.visitorTeamScoreCard.batsmen.forEach(batsman => rankPlayer(batsman));
                byMatch.visitorTeamScoreCard.bowlers.forEach(bowler => rankPlayer(bowler));
            }
            if (byMatch.homeTeam == match.homeTeam) {
                byMatch.homeTeamScoreCard.batsmen.forEach(batsman => rankPlayer(batsman));
                byMatch.homeTeamScoreCard.bowlers.forEach(bowler => rankPlayer(bowler));
            }
        })

        setRankedPlayerList(rankedPlayers.sort((a, b) => { if (a.rank > b.rank) { return -1 } else if (a.rank < b.rank) { return 1 } else { return 0 } }));
    }
    const [activeTab, setActiveTab] = useState<number>(0);
    const renderMatchHeaders = () => {
        return (
            <Segment>
                <Button
                    onPress={() => (activeTab == 1 ? setIsGroundBattleHome(true) : setIsLastMatchHome(true))}
                    active={activeTab == 1 ? isGroundBattleHome : isLastMatchHome}>
                    <Text>{match.homeTeam}</Text>
                </Button>
                <Button
                    onPress={() =>
                        activeTab == 1 ? setIsGroundBattleHome(false) : setIsLastMatchHome(false)
                    }
                    active={activeTab == 1 ? !isGroundBattleHome : !isLastMatchHome}>
                    <Text>{match.visitorTeam}</Text>
                </Button>
            </Segment>
        );
    };

    const handleTabChange = (changeProps: { from: number; i: number }) => {
        setActiveTab(changeProps.i);
    };
    const [playerType, setPlayerType] = useState<'batsman' | 'bowler'>('batsman');
    return (
        <Tabs locked={true} tabBarPosition={isWeb ? 'top' : 'bottom'} onChangeTab={handleTabChange}>
            <Tab heading={'One on One'}>
                {matchAnalysis && matchAnalysis.matchBetweenTeam && (
                    <FlatList
                        data={matchAnalysis.matchBetweenTeam}
                        renderItem={({ item }) => <MatchScore match={item} teamToShow={""}></MatchScore>}
                        keyExtractor={item => item.id}
                        numColumns={1}
                        style={{ height: 750 }}
                        contentContainerStyle={{ alignItems: 'center' }}
                    />
                )}
            </Tab>
            <Tab heading={'Ground Battle'}>
                {isGroundBattleHome && matchAnalysis && matchAnalysis.homeTeamAtVenue && (
                    <FlatList
                        data={matchAnalysis.homeTeamAtVenue}
                        style={{ height: 750 }}
                        renderItem={({ item }) => (
                            <MatchScore match={item} teamToShow={match.homeTeam}></MatchScore>
                        )}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={renderMatchHeaders}
                        contentContainerStyle={{ alignItems: 'center' }}
                    />
                )}
                {!isGroundBattleHome && matchAnalysis && matchAnalysis.visitorTeamAtVenue && (
                    <FlatList
                        data={matchAnalysis.visitorTeamAtVenue}
                        style={{ height: 750 }}
                        renderItem={({ item }) => (
                            <MatchScore match={item} teamToShow={match.visitorTeam}></MatchScore>
                        )}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={renderMatchHeaders}
                        contentContainerStyle={{ alignItems: 'center' }}
                    />
                )}
            </Tab>
            <Tab heading={'Last Matches'}>
                {isLastMatchHome && matchAnalysis && matchAnalysis.matchByTeam && (
                    <FlatList
                        data={matchAnalysis.matchByTeam}
                        style={{ height: 750 }}
                        renderItem={({ item }) => <MatchScore match={item} teamToShow={match.homeTeam}></MatchScore >}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={renderMatchHeaders}
                        contentContainerStyle={{ alignItems: 'center' }}
                    />
                )}
                {!isLastMatchHome && matchAnalysis && matchAnalysis.matchAgainstTeam && (
                    <FlatList
                        data={matchAnalysis.matchAgainstTeam}
                        style={{ height: 750 }}
                        renderItem={({ item }) => <MatchScore match={item} teamToShow={match.visitorTeam}></MatchScore >}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={renderMatchHeaders}
                        contentContainerStyle={{ alignItems: 'center' }}
                    />
                )}
            </Tab>
            <Tab heading={'Players'}>
                {rankedPlayerList &&
                    (<FlatList
                        data={rankedPlayerList.filter(x => x.playerType == playerType)}
                        renderItem={({ item }) => <Card>
                            <CardItem header>
                                <Left>
                                    <Text> {item.name}</Text>
                                </Left>
                                <Right>
                                    <Text> {item.rank.toFixed(2)}</Text>
                                </Right>
                            </CardItem>
                            <CardItem>
                                {item.playerType == 'batsman' &&
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ padding: 5 }}>{'10+:' + item.plus10}</Text>
                                        <Text style={{ padding: 5 }}>{'20+:' + item.plus20}</Text>
                                        <Text style={{ padding: 5 }}>{'30+:' + item.plus30}</Text>
                                        <Text style={{ padding: 5 }}>{'40+:' + item.plus40}</Text>
                                        <Text style={{ padding: 5 }}>{'50+:' + item.plus50}</Text>
                                    </View>}
                                {item.playerType == 'bowler' &&
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ padding: 5 }}>{'1+:' + item.plus10}</Text>
                                        <Text style={{ padding: 5 }}>{'2+:' + item.plus20}</Text>
                                        <Text style={{ padding: 5 }}>{'3+:' + item.plus30}</Text>
                                        <Text style={{ padding: 5 }}>{'4+:' + item.plus40}</Text>
                                        <Text style={{ padding: 5 }}>{'Wkts:' + item.wickets}</Text>
                                    </View>}

                            </CardItem>
                        </Card>}
                        keyExtractor={item => item.name}
                        contentContainerStyle={{ alignItems: 'center' }}
                        style={{ height: 750 }}
                        ListHeaderComponent={() => <Segment>
                            <Button
                                onPress={() => setPlayerType('batsman')}
                                active={playerType == 'batsman'}>
                                <Text>{'Batsman'}</Text>
                            </Button>
                            <Button
                                onPress={() => setPlayerType('bowler')}
                                active={playerType == 'bowler'}>
                                <Text>{'Bowler'}</Text>
                            </Button>
                        </Segment>}
                    >
                    </FlatList>)}
            </Tab>
        </Tabs >
    );
}
export default MatchScreen;
