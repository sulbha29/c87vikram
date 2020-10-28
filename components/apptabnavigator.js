import React  from 'react'
import {Image} from 'react-native'
import {createBottomTabNavigator} from  'react-navigation-tabs'
import BookDonate from '../screens/bookdonate'
import BookRequest from '../screens/bookrequest'
import {AppStackNavigator} from './appstacknavigator'

export const AppTabNavigator = createBottomTabNavigator({
    donatebooks:{screen:AppStackNavigator,
        navigationOptions:{
        tabBarIcon : <Image source={require("../assets/request-list.png")} style={{width:25,height:25}}/>,
        tabBarLabel : "Donate Books"
    }},
    requestbooks:{screen:BookRequest,
        navigationOptions:{
        tabBarIcon : <Image source={require("../assets/request-book.png")} style={{width:25,height:25}}/>,
        tabBarLabel : "Request Books"
    }},

})