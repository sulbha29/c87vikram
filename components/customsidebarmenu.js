import React ,{Component} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity, Alert,Text,Modal,ScrollView, KeyboardAvoidingView} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import db from '../config'
export default class Customsidebarmenu extends Component{
    constructor(){
        super();
        this.state={
            Image:"",
            name:"",
            emailid:firebase.auth().currentUser.email,
            docid:"",
        }
    }
    fetchimage=async()=>{
        const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,allowsEditing:true,aspect:[4,3],quality:1
        })
        if(!cancelled){
        this.uploadimage(uri,this.state.emailid)
        }
        
    }
    fetchdata=(imagename)=>{
        var ref = firebase.storage().ref().child("userprofiles/"+imagename)
        ref.getDownloadURL().then((url)=>{
            this.setState({Image:url})
            .catch((error)=>{
                this.setState({Image:"#"})
            })
        })
    }
    getuserprofile(){
        db.collection("user").where("emailid","==",this.state.emailid).onSnapshot((querysnapshot)=>{
            querysnapshot.forEach((doc)=>{
                this.setState({name:doc.data().firstname +" "+doc.data().lastname,docid:doc.id,image:doc.data().image})
            })
        })
    }
    componentDidMount(){
        this.fetchdata(this.state.emailid);
        this.getuserprofile();
    }
    uploadimage=async(uri,imagename)=>{
      {var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase.storage().ref().child("userprofiles/"+imagename)
    return(ref.put(blob).then((response)=>{
        this.fetchdata(imagename)
    }))
    }
    }

    render(){
        return(
          <View style={styles.container}>
              <Avatar rounded source={{uri:this.state.Image}}
            size="medium" onPress={()=>{
                this.fetchimage();}}
                showEditButton
            
            />
            <Text>{this.state.name}</Text>
             <View style={styles.drawerItemsContainer}><DrawerItems {...this.props}/></View>
             <View style={styles.logOutContainer}>
                 <TouchableOpacity style={styles.logOutButton}
                 onPress = {() => {
                    this.props.navigation.navigate('loginscreen')
                    firebase.auth().signOut()
                 }}>
                     <Text>LogOut</Text>
                 </TouchableOpacity>
             </View>
          </View>
        )
    }
}
var styles = StyleSheet.create({ container : { flex:1 }, drawerItemsContainer:{ flex:0.8 }, logOutContainer : { flex:0.2, justifyContent:'flex-end', paddingBottom:30 }, logOutButton : { height:30, width:'100%', justifyContent:'center', padding:10 }, logOutText:{ fontSize: 30, fontWeight:'bold' } })
