import React ,{Component} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity, Alert,Text,Modal,ScrollView, KeyboardAvoidingView,FlatList} from 'react-native'
import firebase from 'firebase'
import {ListItem,Icon} from 'react-native-elements'
import Myheader from '../components/myheader'
import db from '../config'
import Swipableflatlist from '../components/swipableflatlist'
export default class NotificationScreen extends Component{
    constructor(props){
     super(props);
     this.state={
         emailid:firebase.auth().currentUser.email,
         allnotifications:[],

     }
     this.notificationref=null
    }
    getnotification=()=>{
        this.requestref=db.collection("allnotifications").where("notificationstatus","==","unread").where("targeteduserid","==",this.state.emailid).onSnapshot(((snapshot)=>{
            var allnotifications = []
            snapshot.docs.map((doc)=>{
                var notification=doc.data()
                notification["docid"]=doc.id 
                allnotifications.push(notification);
            })
            this.setState({allnotifications:allnotifications})
        }))
    }
    componentDidMount(){
        this.getnotification();
    }
    componentWillUnmount(){
        this.notificationref();
    }
    keyExtractor=(item,index)=>index.toString()
     renderItem=({item,index})=>{
         return(<ListItem key={index}
         leftElement={<Icon name="book" type="font-awesome" color="green"/>}
         title={item.bookname}
         titleStyle={{color:"black", fontWeight:"bold" }}
         subtitle={item.message}
         bottomDivider
         />)
     }
        
     
 
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flex:0.1}}>
                 <Myheader title={"Notifications"} navigation={this.props.navigation}/>
            </View>
            <View style={{flex:0.9}}>
                {this.state.allnotifications.length==0?(<View><Text>You have no notifications</Text></View>):(<Swipableflatlist allnotifications={this.state.allnotifications}/>)}

            </View>
                
            </View>
        )
    }
}