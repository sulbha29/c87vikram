import React ,{Component} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity, Alert,Text,Modal,ScrollView, KeyboardAvoidingView, Dimensions} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'
import {SwipeListView} from 'react-native-swipe-list-view'
import db from '../config'
import {ListItem,Icon} from 'react-native-elements'
export default class Swipableflatlist extends Component{
    constructor(props){
      super(props);
      this.state={
          allnotifications:this.props.allnotifications
      }
    }
    onswipechange = swipeData=>{
        var allnotifications = this.state.allnotifications
        const{key,value}=swipeData;
        if(value<-Dimensions.get("window").width){
            const newdata = [...allnotifications]
            const preindex = allnotifications.findIndex(item=>item.key==key)
            this.updateread(allnotifications[preindex])
            newdata.splice(preindex,1)
            this.setState({allnotifications:newdata})
        }
    }
    updateread = notification=>{
       db.collection("allnotifications").doc(notification.docid).update({notificationstatus:"read"})
    }
    renderItem = data=>(
     <ListItem 
     leftElement = {<Icon name="book" type="font-awesome" color="green"/> }
     title={data.item.bookname}
     titleStyle={{color:"white" }}
     subtitle = {data.item.message}

     />
    );
    renderHiddenItem = ()=>(<View style={styles.rowBack}>
        <View style={[styles.backRightBtn,styles.backRightBtnRight]}><Text style={styles.backTextWhite}></Text></View>
    </View>)
        
    
    render(){
        return(
            <View style={styles.container}>
                <SwipeListView
                disableRightSwipe
                data={this.state.allnotifications}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                rightOpenValue={-Dimensions.get("window").width}
                previewRowKey={"0"}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onSwipeValueChange={this.onswipechange}
                />
            </View>
        )   
    }
}
const styles = StyleSheet.create({ container: { backgroundColor: 'white', flex: 1, }, backTextWhite: { color: '#FFF', fontWeight:'bold', fontSize:15 }, rowBack: { alignItems: 'center', backgroundColor: '#29b6f6', flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, }, backRightBtn: { alignItems: 'center', bottom: 0, justifyContent: 'center', position: 'absolute', top: 0, width: 100, }, backRightBtnRight: { backgroundColor: '#29b6f6', right: 0, }, });