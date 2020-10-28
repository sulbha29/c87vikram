import React ,{Component} from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import BookDonate from '../screens/bookdonate'
import ReceiverDetails from '../screens/receiverdetailscreen'

export const AppStackNavigator = createStackNavigator({
    bookdonatelist:{screen:BookDonate, navigationOptions:{headerShown:false}},
    receiverdetails:{screen:ReceiverDetails,navigationOptions:{headerShown:false}}
},
{initialRouteName:"bookdonatelist"}
)
