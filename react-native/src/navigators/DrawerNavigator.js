import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStackNavigator from './HomeNavigator';
import SettingsStackNavigator from './SettingsNavigator';
import UsersStackNavigator from './UsersNavigator';
import MatchStackNavigator from './MatchNavigator';
import TenantsStackNavigator from './TenantsNavigator';
import DrawerContent from '../components/DrawerContent/DrawerContent';
import MatchScreen from '../screens/Match/MatchScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={DrawerContent}>
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="Users" component={UsersStackNavigator} />
      <Drawer.Screen name="Tenants" component={TenantsStackNavigator} />
      <Drawer.Screen name="Settings" component={SettingsStackNavigator} />
      <Drawer.Screen name="Match" component={MatchStackNavigator} />
    </Drawer.Navigator>
  );
}
