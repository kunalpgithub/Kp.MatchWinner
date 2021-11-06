import { Content, H1, H2, H3, Text } from 'native-base';
import React from 'react';
import { baseStyles } from '../styles/base'
import { MatchCard } from './Match/MatchCard';
import { TournamentMatchDto } from '../models/match';
import MatchScore from './Match/MatchScore';

function DevScreen({ navigation, route }) {
    const match: TournamentMatchDto = {
        homeTeam: 'Mumbai Indians',
        visitorTeam: 'Chennai Super Kings',
        venue: 'Sardar Patel Stadium, Ahmedabad',
        homeTeamScore: '121/9',
        visitorTeamScore: '123/9',
        winner: 'Chennai super kings won by 2 runs',
        homeTeamScoreCard: {
            score: '123',
            name: 'Mumbai Indians',
            batsmen: [
                { name: 'Rohit S', run: 59, balls: 30, wicketBy: '', four: 0, six: 0 },
                { name: 'S Yadav', run: 59, balls: 30, wicketBy: '', four: 0, six: 0 },
                { name: 'I Kishan', run: 59, balls: 30, wicketBy: '', four: 0, six: 0 },
                { name: 'H Pandya', run: 59, balls: 30, wicketBy: '', four: 0, six: 0 },
                { name: 'E Lewis', run: 59, balls: 30, wicketBy: '', four: 0, six: 0 },
            ],
            bowlers: [
                { name: 'J Bumrah', run: 29, over: 24, wicket: 4 },
                { name: 'R Chahar', run: 21, over: 24, wicket: 1 },
                { name: 'H Pandya', run: 43, over: 24, wicket: 1 },
                { name: 'K Pandya', run: 45, over: 24, wicket: 1 },
                { name: 'T Boult', run: 73, over: 24, wicket: 1 }
            ]
        },
        visitorTeamScoreCard: {
            score: '123',
            name: 'Chennai Super Kings',
            batsmen: [
                { name: 'M Dhoni', run: 59, balls: 30, wicketBy: '', four: 0, six: 0 },
                { name: 'R Gaikwad', run: 59, balls: 30, wicketBy: '', four: 0, six: 0 },
                { name: 'F Duplesis', run: 59, balls: 30, wicketBy: '', four: 0, six: 0 },
                { name: 'A Rydu', run: 59, balls: 30, wicketBy: '', four: 0, six: 0 },
                { name: 'R Jadeja', run: 59, balls: 30, wicketBy: '', four: 0, six: 0 },
            ],
            bowlers: [
                { name: 'D Bravo', run: 29, over: 24, wicket: 4 },
                { name: 'R Jadeja', run: 21, over: 24, wicket: 1 },
                { name: 'M Gony', run: 43, over: 24, wicket: 1 },
                { name: 'T Curran', run: 45, over: 24, wicket: 1 },
                { name: 'M Ali', run: 73, over: 24, wicket: 1 }
            ]
        }
    }
    return (
        <Content contentContainerStyle={baseStyles.container} >
            {/* <H1>H1 Title</H1>
            <H2>H2 Title</H2>
            <H3>H3 Title</H3>
            <Text primary> Primary Text</Text>
            <Text success> Success Text</Text>
            <Text info> Success Text</Text>
            <Text danger>Danger Text</Text>
            <Text warning>Warning Text</Text>
            <Text dark>Dark Text</Text>
            <Text light>Light Text</Text>

            <Text primary style={baseStyles.subHeader}> SubHeader Title</Text>
            <Text primary style={baseStyles.largeText}> Large Title</Text>
            <Text primary style={baseStyles.contentText}> Content Text</Text>
            <Text primary style={baseStyles.smallText}>Small Text</Text>
            <Text primary style={baseStyles.header}> Header Title</Text> 
            <MatchCard match={match} index={1} navigateToMatch={() => { }}></MatchCard>*/}
            <MatchScore match={match}></MatchScore>

        </Content >
    );
}
export default DevScreen;