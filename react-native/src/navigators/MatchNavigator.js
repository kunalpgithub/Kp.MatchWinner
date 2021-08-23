import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MatchScreen from '../screens/Match/MatchScreen';
import TournamentScreen from '../screens/Match/TournamentScreen';
import MenuIcon from '../components/MenuIcon/MenuIcon';
import { LocalizationContext } from '../contexts/LocalizationContext';
import { Button, Text } from 'native-base';

const Stack = createStackNavigator();

export default function MatchStackNavigator() {
  const { t } = React.useContext(LocalizationContext);

  return (
    <Stack.Navigator initialRouteName="Match">
      <Stack.Screen
        name="Match"
        component={MatchScreen}
        options={({ route, navigation }) => ({
          headerLeft: () => <MenuIcon onPress={() => navigation.openDrawer()} />,
          title:
            'Match Analysis for' +
            route.params.match.homeTeam +
            ' vs ' +
            route.params.match.visitorTeam,
          // headerTitle: 'Info',
          // headerRight: () => (
          //   // <Button onPress={() => alert('This is a button!')} title="Go Back" color="#000" />
          //   <Button onPress={() => alert('This is a button!')}>
          //     <Text>My Button</Text>
          //   </Button>
          // ),
        })}
      />
      <Stack.Screen
        name="Tournament"
        component={TournamentScreen}
        options={({ route, navigation }) => ({
          headerLeft: () => <MenuIcon onPress={() => navigation.openDrawer()} />,
          title: 'Tournament',
        })}
      />
    </Stack.Navigator>
  );
}
