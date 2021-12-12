import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStackNavigator from './HomeNavigator';
import SettingsStackNavigator from './SettingsNavigator';
import UsersStackNavigator from './UsersNavigator';
import TournamentStackNavigator, { DevStackNavigator } from './MatchNavigator';
import TenantsStackNavigator from './TenantsNavigator';
import DrawerContent from '../components/DrawerContent/DrawerContent';
import DevScreen from '../screens/DevScreen';

// type RouteDrawerNavigationParamList = {
//   Home:{},
//   Users:{},
//   Tenants:{},
//   Settings:{},
//   Match: {},
//   Tournament: {},
// };

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={DrawerContent}>
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="Users" component={UsersStackNavigator} />
      <Drawer.Screen name="Tenants" component={TenantsStackNavigator} />
      <Drawer.Screen name="Settings" component={SettingsStackNavigator} />
      <Drawer.Screen name="Match" component={TournamentStackNavigator} />
      <Drawer.Screen name="Dev" component={DevStackNavigator}></Drawer.Screen>
    </Drawer.Navigator>
  );
}
