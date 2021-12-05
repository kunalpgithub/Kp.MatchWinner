import React from 'react';
import { CardItem, Card, Body, Left, Right, Text, View, Thumbnail, Header, Content } from 'native-base';
import { TeamScoreDto, TournamentMatchDto } from '../../models/match';
import matchStyle from './matchStyles';


const PlayerScore = (props: { name: string, score: string }): JSX.Element => (
    <View style={{ flexDirection: 'row', width: '100%' }}>
        <Left style={{ flex: 0.7, marginLeft: 5 }}>
            <Text key={props.name} style={matchStyle.cardContent}>
                {props.name}
            </Text>
        </Left>
        <Right style={{ flex: 0.3 }}>
            <Text>
                {props.score}
            </Text>
        </Right>
    </View>
);

const TeamScore = (props: { team: TeamScoreDto; teamName: string; teamScore: string }) => (
    <>
        <CardItem zeroPadding >
            <Left>
                <Text style={[matchStyle.cardContent, { fontWeight: 'bold', marginLeft: 5 }]}>
                    {props.teamName} {props.teamScore}
                </Text>
            </Left>
        </CardItem>
        <CardItem zeroPadding  >
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <Left >
                    {
                        props.team.batsmen
                            .sort((a, b) => b.run - a.run)
                            .slice(0, 5)
                            .map(
                                batsman =>
                                    <PlayerScore name={batsman.name} score={batsman.run + "(" + batsman.balls + ")"} ></PlayerScore>
                            )
                    }
                </Left>
                <Right >
                    {/* <Text style={[matchStyle.cardContent, { fontWeight: 'bold' }]}>Bowler</Text> */}
                    {props.team.bowlers
                        .sort((a, b) => b.wicket - a.wicket)
                        .slice(0, 5)
                        .map(bowler => (
                            <PlayerScore name={bowler.name} score={bowler.wicket + "/" + bowler.run} ></PlayerScore>
                        ))}
                </Right>
            </View>
        </CardItem>
    </>
);

function MatchScore(props: { match: TournamentMatchDto, teamToShow: string }) {
    const { match } = props;
    return (
        <Card style={matchStyle.matchCard}>
            {(props.teamToShow === "" || props.teamToShow == match.homeTeam) && <TeamScore
                team={match.homeTeamScoreCard}
                teamName={match.homeTeam}
                teamScore={match.homeTeamScore}></TeamScore>
            }
            {(props.teamToShow === "" || props.teamToShow == match.visitorTeam) && <TeamScore
                team={match.visitorTeamScoreCard}
                teamName={match.visitorTeam}
                teamScore={match.visitorTeamScore}></TeamScore>}
        </Card>
    );
}

export default MatchScore;
