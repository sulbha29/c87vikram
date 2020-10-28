import React ,{Component} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity, Alert,Text,Modal,ScrollView, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import {Card,Icon,Header} from 'react-native-elements'
export default class ReceiverDetails extends Component{
    constructor(props){
        super(props)
      this.state={
          emailid:firebase.auth().currentUser.email,
         receiverid:this.props.navigation.getParam("details")["emailid"],
         requestid:this.props.navigation.getParam("details")["requestid"],
         bookname:this.props.navigation.getParam("details")["bookname"],
         reason:this.props.navigation.getParam("details")["reason"],
         receivername:'',
         receivercontact:'',
         receiveraddress:'',
         receiverrequestdocid:'',
         username:''
      }
    } 

    getreceiverdetails(){
        db.collection("user").where("emailid","==",this.state.receiverid).get().then(snapshot=>{
            snapshot.forEach(doc => {
                this.setState({receivername:doc.data().firstname,receivercontact:doc.data().contact,receiveraddress:doc.data().address})
                
            });
        })
        db.collection("requestbooks").where("requestid","==",this.state.requestid).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({receiverrequestdocid:doc.id})
            })
        })
    }
    getUserDetails=(emailid)=>{
        db.collection("user").where('emailid','==', emailid).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            this.setState({
              username  :doc.data().firstname + " " + doc.data().lastname
            })
          })
        })
      }
    updatebookstatus=()=>{
        db.collection("donations").add({bookname:this.state.bookname,requestid:this.state.requestid,requestedby:this.state.receivername,donorid:this.state.emailid,requeststatus:"donor interested"})
    }
    componentDidMount(){
        this.getreceiverdetails();
        this.getUserDetails(this.state.emailid)
    }
    addnotification =()=>{
        var notification = this.state.username+"has shown interest in donating a book"
        db.collection("allnotifications").add({
            targeteduserid:this.state.receiverid,donorid:this.state.emailid,requestid:this.state.requestid,bookname:this.state.bookname,date:firebase.firestore.FieldValue.serverTimestamp(),notificationstatus:"unread",message:notification
        })
    }
    render(){
       return(
           <View style={styles.container}><View style={{flex:0.1}}>
             <Header leftComponent={<Icon name="arrow-left" type="feather" color="blue" onPress={()=>{
                 this.props.navigation.goBack();
             }}/>}
             
             centerComponent={{text:"Donate Books",style:{color:"violet",fontSize:16}}} backgroundColor="black"/>
           </View><View style={{flex:0.3}}>
              <Card title={"Book Information"} titleStyle={{fontSize:15}}> 
              <Card><Text>Name:{this.state.bookname}</Text></Card>
              <Card><Text>Reason:{this.state.reason}</Text></Card>

              </Card>

           </View>
           <View style={{flex:0.3}}>
            <Card title={"Receiver Information"} titleStyle={{fontSize:15}}>
            <Card><Text>Name:{this.state.receivername}</Text></Card>
            <Card><Text>Contact:{this.state.receiverconatct}</Text></Card>
            <Card><Text>Address:{this.state.receiveraddress}</Text></Card>
            </Card>
           </View>
            <View style={styles.buttonContainer}>
                {this.state.receiverid !== this.state.emailid?(<TouchableOpacity style={styles.button} onPress={()=>{
                    this.updatebookstatus()
                    this.addnotification()
                    this.props.navigation.navigate("Donations")
                }}>
                    <Text>I wanna donate</Text>
                </TouchableOpacity>):null}
            </View>
           </View>
       )
   }
}
const styles = StyleSheet.create({ container: { flex:1, }, buttonContainer : { flex:0.3, justifyContent:'center', alignItems:'center' }, button:{ width:200, height:50, justifyContent:'center', alignItems : 'center', borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation : 16 } })