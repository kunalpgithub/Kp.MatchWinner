import React from 'react';
import { CardItem, Card, Body, Left, Right, Text } from 'native-base';
import matchStyles from './matchStyles'
import { TournamentMatchDto } from '../../models/match';
import Moment from 'moment';

export type MatchCardProps =
    {
        match: TournamentMatchDto,
        index: number,
        navigateToMatch: (match: TournamentMatchDto) => void
    }

export const MatchCard = (props: MatchCardProps) => {
    const { match, index, navigateToMatch } = props;
    return (
        <Card style={matchStyles.matchCard}>
            <CardItem button style={matchStyles.matchCardItem} onPress={() => navigateToMatch(match)}>
                <Left>
                    <Body>
                        <Text style={matchStyles.cardHeader}>Match {index + 1} </Text>
                    </Body>
                </Left>
                <Right>
                    <Body>
                        <Text style={matchStyles.cardHeader}>{Moment(match.playedDate).format('ddd, Do MMM  YY')}</Text>
                    </Body>
                </Right>
            </CardItem>
            <CardItem button style={matchStyles.matchCardItem} onPress={() => navigateToMatch(match)}>
                <Body style={{ alignItems: 'center' }}>
                    <Text style={matchStyles.cardContent} >{match.homeTeam}</Text >
                    {/* <Text style={styles.cardDescription} >vs</Text> */}
                    <Text style={matchStyles.cardContent} >{match.visitorTeam}</Text >
                </Body>
            </CardItem>
            <CardItem footer button style={matchStyles.matchCardItem} onPress={() => navigateToMatch(match)}>
                <Body style={{ alignItems: 'center' }}>
                    <Text style={matchStyles.cardHeader} >{match.venue}</Text>
                </Body>
            </CardItem>
        </Card>);
}