import { Tabs, Tab, Content, Text, Segment, Button } from 'native-base';
import { FlatList, Platform } from 'react-native';
import React, { useCallback, useState } from 'react';
import { getMatchAnalysis } from '../../api/MatchAPI';
import { useFocusEffect } from '@react-navigation/core';
import { MatchAnalysisReport, TournamentMatchDto } from '../../models/match';
import MatchScore from './MatchScore';


function MatchScreen({ navigation, route }) {
    const { match } = route.params;
    const isWeb = Platform.OS == 'web';
    const columns = isWeb ? 3 : 1;
    const [matchAnalysis, setMatchAnalysis] = useState<MatchAnalysisReport>();
    const [isGroundBattleHome, setIsGroundBattleHome] = useState<boolean>(true);
    const [isLastMatchHome, setIsLastMatchHome] = useState<boolean>(true);

    const getMatchAnalysisData = () => {
        getMatchAnalysis(match.homeTeam, match.visitorTeam, match.venue).then(data => {
            setMatchAnalysis(data);
        });
    };
    useFocusEffect(
        useCallback(() => {
            getMatchAnalysisData();
        }, []),
    );
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
        </Tabs>
    );
}
export default MatchScreen;
