import { useFocusEffect } from "@react-navigation/core";
import { Card, CardItem } from "native-base";
import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context"
import { getTournamnetByAvailabilityByIsAvailable } from "../../api/MatchAPI";
import style from './styles'
// import iconSrc from '../../../assets/icon.png'

type tournament = {
    id: number,
    name: string,
    code: string,
    season: string
}
type tournamentProps = {
    tournament: tournament,
    onTournamentPress: () => void

}
const Tournament = (props: tournamentProps) => {
    const { tournament } = props;
    return (
        <TouchableOpacity key={tournament.id} onPress={props.onTournamentPress} >
            <Card >
                <CardItem style={style.cardFullWidth}>
                    <View>
                        <Text style={style.cardHeder}>{tournament.code}-{tournament.season}</Text>
                        <Text style={style.cardContent}>{tournament.name}</Text>
                        <Text style={style.cardDescription}>Get match analysis .</Text>
                    </View>
                </CardItem>
            </Card>
        </TouchableOpacity>
    );
}

const TournamentsScreen = ({ navigation, route }) => {

    const goToSchedule = () => {
        // navigation.navigate('Match', { screen: 'Schedule', params: {} });
        navigation.navigate('Schedule');
    }

    useFocusEffect(
        useCallback(
            () => {
                // getTournamnetByAvailabilityByIsAvailable();
            },
            [],
        )
    );

    const tournaments = [
        { id: 1, name: 'Indian Premier League', code: 'IPL', season: '2021' },
        { id: 2, name: 'Caribbean Premier League', code: 'CPL', season: '2021' },
        { id: 3, name: 'Big Bash League', code: 'BBL', season: '2022' },
        { id: 4, name: 'Pakistan Super League', code: 'PSL', season: '2022' }
    ];
    return (
        <SafeAreaView style={style.container}>
            <Text style={style.screenHeader}>Tournaments</Text>
            {tournaments && <FlatList
                data={tournaments}
                renderItem={({ item }: { item: tournament }) => <Tournament onTournamentPress={goToSchedule} tournament={item}></Tournament>}
            />}

        </SafeAreaView>
    )
}
export default TournamentsScreen;