import React ,{Component} from 'react'
import {Header,Icon,Badge} from 'react-native-elements'
import {View,Stylesheet} from 'react-native'
import { render } from 'react-dom';
import db from '../config'
export default class Myheader extends Component{
    constructor(props){
        super(props);
        this.state={
         value:"",
        }
    }

 bellIcon=()=>{
    return(
        <View>
           <Icon name="bell" type="font-awesome" color="red" size={20}
           onPress={()=>{this.props.navigation.navigate("Notifications")}}
           />
           <Badge value={this.state.value}
           containerStyle={{position:"absolute",top:-4,right:-4}}
           />
        </View>
    )
}
getunreadnotification(){
    db.collection("allnotifications").where("notificationstatus","==","unread").onSnapshot((snapshot)=>{
        var unreadnotification = snapshot.docs.map((doc)=>doc.data())
        this.setState({value:unreadnotification.length})
    })
}
componentDidMount(){
    this.getunreadnotification();
}
render(){
     
    return(
        <Header 
        leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => this.props.navigation.toggleDrawer()}/>}

        centerComponent={{text:this.props.title,style:{color:"white",fontSize:14,fontWeight:"bold"}}}
        rightComponent={<this.bellIcon {...this.props}/>}
        backgroundColor="black"
        />
    )
}}
