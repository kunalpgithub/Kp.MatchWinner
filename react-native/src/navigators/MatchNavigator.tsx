import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MatchScreen from '../screens/Match/MatchScreen';
import TournamentScreen from '../screens/Match/ScheduleScreen';
import MenuIcon from '../components/MenuIcon/MenuIcon';
import { LocalizationContext } from '../contexts/LocalizationContext';
import { H1, H3, Subtitle, Text, Title } from 'native-base';
import { Button } from 'react-native'
import { TournamentMatchDto } from '../models/match';
import ScheduleScreen from '../screens/Match/ScheduleScreen';
import TournamentsScreen from '../screens/Match/TournamentsScreen';
import DevScreen from '../screens/DevScreen';

type MatchRouteStackParamList = {
  Match: { match: TournamentMatchDto },
  Tournaments: {}
  Schedule: {},
  Home: {},
  Dev: {}
}

type HeaderTitleProps = {
  match: TournamentMatchDto
}

function HeaderTitle(props: HeaderTitleProps) {
  return <>
    <Title style={{ color: "#000" }}>Match Analysis</Title>
    {props.match && <Subtitle style={{ color: "#000" }}>{props.match.homeTeam} vs {props.match.visitorTeam}</Subtitle>}
  </>
}

const Stack = createStackNavigator<MatchRouteStackParamList>();

export default function MatchStackNavigator() {

  const { t } = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator initialRouteName="Home" >
      {/* screenOptions={{ headerStyle: { backgroundColor: '#00897B' }, cardStyle: { backgroundColor: '#fff' } }}   */}
      <Stack.Screen
        name="Schedule"
        component={TournamentsScreen}
      />
      <Stack.Screen
        name="Home"
        component={ScheduleScreen}
        options={({ route, navigation }) => ({
          // headerLeft: () => <MenuIcon onPress={() => navigation.openDrawer()} />,
          title: 'Tournament',
          // headerRight: () => (<Button onPress={() => navigation.goBack()} title='BACK' />)
        })}
      />
      <Stack.Screen
        name="Match"
        component={MatchScreen}
        options={({ route, navigation }) => ({
          // headerLeft: () => <MenuIcon onPress={() => navigation.openDrawer()} />,
          // title:
          //   'Match Analysis for ' +
          //   route.params.match.homeTeam +
          //   ' vs ' +
          //   route.params.match.visitorTeam,
          headerTitle: props => <HeaderTitle match={route.params.match} ></HeaderTitle>,
          // headerRight: () => (<Button onPress={() => navigation.goBack()} title='BACK' />)

        })}
      />
      <Stack.Screen name="Dev" component={DevScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
