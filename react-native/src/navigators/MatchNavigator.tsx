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
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


type TournamentRouteStackParamList = {
  Match: { match: TournamentMatchDto },
  Tournaments: {}
  Schedule: {},
  Home: {},

}

type MatchRouteStackParamList = {
  Dev: {}
  Tournaments: TournamentRouteStackParamList
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

const TournamentStack = createStackNavigator<TournamentRouteStackParamList>();
const DevStack = createStackNavigator();

export function DevStackNavigator() {

  return (
    <DevStack.Navigator initialRouteName="Dev">
      <DevStack.Screen name="Dev" component={DevScreen} options={({ route, navigation }) => ({
        headerLeft: () => <MenuIcon onPress={() => navigation.openDrawer()} />,
        title: 'Tournaments',
        // headerRight: () => (<Button onPress={() => navigation.goBack()} title='BACK' />)
      })} ></DevStack.Screen>
    </DevStack.Navigator>
  )
}


export default function TournamentStackNavigator() {
  return (
    <TournamentStack.Navigator initialRouteName="Tournaments"  >
      {/* screenOptions={{ headerStyle: { backgroundColor: '#00897B' }, cardStyle: { backgroundColor: '#fff' } }}   */}
      <TournamentStack.Screen
        name="Tournaments"
        component={TournamentsScreen}
        options={({ route, navigation }) => ({
          headerLeft: () => <MenuIcon onPress={() => navigation.openDrawer()} />,
          title: 'Tournaments',
          // headerRight: () => (<Button onPress={() => navigation.goBack()} title='BACK' />)
        })}
      />
      <TournamentStack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={({ route, navigation }) => ({
          headerLeft: () => <MenuIcon onPress={() => navigation.openDrawer()} />,
          title: 'Schedule',
          // headerRight: () => (<Button onPress={() => navigation.goBack()} title='BACK' />)
        })}
      />
      <TournamentStack.Screen
        name="Match"
        component={MatchScreen}
        options={({ route, navigation }) => ({
          headerLeft: () => <MenuIcon onPress={() => navigation.openDrawer()} />,
          headerTitle: props => <HeaderTitle match={route.params.match} ></HeaderTitle>,
          // headerRight: () => (<Button onPress={() => navigation.goBack()} title='BACK' />)

        })}
      />
      {/* <Stack.Screen name="Dev" component={DevScreen}
        options={({ route, navigation }) => ({
          // headerLeft: () => <MenuIcon onPress={() => navigation.openDrawer()} />,
          title: 'Crash Here💣🔥🔥🔥',
          // headerRight: () => (<Button onPress={() => navigation.goBack()} title='BACK' />)

        })}
      ></Stack.Screen> */}
    </TournamentStack.Navigator>
  );
}

// const Tab = createBottomTabNavigator<MatchRouteStackParamList>();
// export default function MatchTabNavigator() {

//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Tournaments" component={TournamentStackNavigator}></Tab.Screen>
//       <Tab.Screen name="Dev" component={DevScreen}></Tab.Screen>
//     </Tab.Navigator>
//   )


// }
