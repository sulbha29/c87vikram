
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/loginScreen'
import {AppTabNavigator} from './components/apptabnavigator'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer,createSwitchNavigator} from 'react-navigation' 
import { AppDrawerNavigator } from './components/appdrawernavigator';

export default function App() {
  return (
   
      <Appcontainer/>
    
  );
}
const switchnavigator = createSwitchNavigator({
  loginscreen:{screen:LoginScreen},
  Drawer:{screen:AppDrawerNavigator}
})
const Appcontainer = createAppContainer(switchnavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
