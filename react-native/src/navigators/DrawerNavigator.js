import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStackNavigator from './HomeNavigator';
import SettingsStackNavigator from './SettingsNavigator';
import UsersStackNavigator from './UsersNavigator';
import MatchStackNavigator from './MatchNavigator';
import TenantsStackNavigator from './TenantsNavigator';
import DrawerContent from '../components/DrawerContent/DrawerContent';
import MatchScreen from '../screens/Match/MatchScreen';

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
    <Drawer.Navigator
      initialRouteName="Match"
      drawerContent={DrawerContent}
      // sceneContainerStyle={{ backgroundColor: '#1E1E1E' }}
    >
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="Users" component={UsersStackNavigator} />
      <Drawer.Screen name="Tenants" component={TenantsStackNavigator} />
      <Drawer.Screen name="Settings" component={SettingsStackNavigator} />
      <Drawer.Screen
        name="Match"
        component={MatchStackNavigator}
        // sceneContainerStyle={{ backgroundColor: '#1E1E1E' }}
      />
    </Drawer.Navigator>
  );
}
