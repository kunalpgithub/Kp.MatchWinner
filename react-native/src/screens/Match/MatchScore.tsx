import React from "react";
import { CardItem, Card, Body, Left, Right, Text, View } from 'native-base';
import { TeamScoreDto, TournamentMatchDto } from '../../models/match';
import matchStyle from './matchStyles'

const TeamScore = (props: { team: TeamScoreDto, teamName: string, teamScore: string }) => (
    <>
        <CardItem zeroPadding style={[matchStyle.matchCardItem]} >
            <Left >
                <Body >
                    <Text style={[matchStyle.cardContent, { fontWeight: 'bold' }]} >{props.teamName} {props.teamScore}</Text>
                </Body>
            </Left>
        </CardItem>
        <CardItem zeroPadding style={matchStyle.matchCardItem}>
            <Left >
                <Body style={{ alignItems: 'flex-start', alignSelf: 'flex-start' }}>
                    <Text style={[matchStyle.cardContent, { fontWeight: 'bold' }]}>Batters</Text>
                    {props.team.batsmen.sort((a, b) => b.run - a.run).slice(0, 5).map(batsman => <Text key={batsman.name} style={matchStyle.cardContent}>{batsman.name}   ({batsman.run})</Text>)}
                </Body>
            </Left>
            <Right >
                <Body style={{ alignItems: 'flex-start', alignSelf: 'flex-start' }}>
                    <Text style={[matchStyle.cardContent, { fontWeight: 'bold' }]}>Bowler</Text>
                    {props.team.bowlers.sort((a, b) => b.wicket - a.wicket).slice(0, 5).map(bowler => <Text style={matchStyle.cardContent} key={bowler.name}>{bowler.name}   {bowler.wicket}/{bowler.run}</Text>)}
                </Body>
            </Right>
        </CardItem>
    </>
);

function MatchScore(props: { match: TournamentMatchDto }) {
    const { match } = props;
    return (
        <Card style={matchStyle.matchCard}>
            <TeamScore team={match.homeTeamScoreCard} teamName={match.homeTeam} teamScore={match.visitorTeamScore} ></TeamScore>
            <TeamScore team={match.visitorTeamScoreCard} teamName={match.visitorTeam} teamScore={match.visitorTeamScore}></TeamScore>
        </Card      >
    );
}

export default MatchScore
