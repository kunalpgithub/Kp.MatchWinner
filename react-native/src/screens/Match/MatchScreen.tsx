import { CardItem, Card, Tabs, Tab, Content, Text, View } from 'native-base';
import { StyleSheet, FlatList, Platform, } from 'react-native';
import React, { useCallback, useState } from 'react';
import { getMatchAnalysis } from '../../api/MatchAPI';
import { useFocusEffect } from '@react-navigation/core';
import { MatchAnalysisReport, TournamentDto, TournamentMatchDto } from '../../models/match';
import moment from 'moment';
import { baseStyles } from '../../styles/base'
import { ScrollView } from 'react-native-gesture-handler';
import matchStyle from './matchStyles'
import MatchScore from './MatchScore';


const renderItem = ({ item }: { item: TournamentMatchDto }) => <MatchScore match={item}></MatchScore >

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
        <Content contentContainerStyle={baseStyles.container}  >
            <Tabs locked={true} tabBarPosition={isWeb ? 'top' : 'bottom'} style={{ width: '100%' }} >
                <Tab heading={'One on One'} >

                    {/* <ScrollView > */}
                    {matchAnalysis && matchAnalysis.matchBetweenTeam && matchAnalysis.matchBetweenTeam.length > 0 &&
                        <FlatList data={matchAnalysis.matchBetweenTeam} renderItem={renderItem} horizontal={true} keyExtractor={item => item.id} />}
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
        </Content >
    );
}
export default MatchScreen;

