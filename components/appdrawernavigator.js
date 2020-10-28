import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './apptabnavigator'
import Customsidebarmenu from './customsidebarmenu'
import SettingScreen from '../screens/settingscreen'
import Donations from '../screens/donations'
import NotificationScreen from '../screens/notificationscreen'
import MyReceivedBooksScreen from '../screens/recievebooklist'
export const AppDrawerNavigator=createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    Donations:{screen:Donations},
    Notifications:{screen:NotificationScreen},
    MyReceivedBooks :{
        screen: MyReceivedBooksScreen},
    setting:{screen:SettingScreen}},
    {contentComponent:Customsidebarmenu},{initialRouteName:'Home'

})