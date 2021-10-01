import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MatchScreen from '../screens/Match/MatchScreen';
import TournamentScreen from '../screens/Match/ScheduleScreen';
import MenuIcon from '../components/MenuIcon/MenuIcon';
import { LocalizationContext } from '../contexts/LocalizationContext';
import { H1, H3, Text } from 'native-base';
import { Button } from 'react-native'
import { TournamentMatchDto } from '../models/match';
import ScheduleScreen from '../screens/Match/ScheduleScreen';
import TournamentsScreen from '../screens/Match/TournamentsScreen';

type MatchRouteStackParamList = {
  Match: { match: TournamentMatchDto },
  Tournaments: {}
  Schedule: {},
  Home: {}
}

type HeaderTitleProps = {
  match: TournamentMatchDto
}

function HeaderTitle(props: HeaderTitleProps) {
  return <>
    <H3>Match Analysis</H3>
    {/* {props.match && <Text>{props.match.homeTeam} vs {props.match.visitorTeam}</Text>} */}
  </>
}

const Stack = createStackNavigator<MatchRouteStackParamList>();

export default function MatchStackNavigator() {

  const { t } = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerStyle: { backgroundColor: '#00897B' }, cardStyle: { backgroundColor: '#fff' } }}  >
      <Stack.Screen
        name="Home"
        component={TournamentsScreen}
      />
      <Stack.Screen
        name="Schedule"
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
    </Stack.Navigator>
  );
}
