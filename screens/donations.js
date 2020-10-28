import React ,{Component} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity, Alert,FlatList,Text,Modal,ScrollView, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import Myheader from '../components/myheader'
import {ListItem,Icon,Card} from 'react-native-elements'

export default class Donations extends Component{
 
    constructor(){
        super()
        this.state={
            donorid:firebase.auth().currentUser.email,
            alldonations:[],
            donorname:"",
        }
        this.requestref=null;
    }
    static navigationOptions = {header:null}
    getalldonations=()=>{
        this.requestref=db.collection("donations").where("donorid","==",this.state.donorid).onSnapshot((snapshot)=>{
            var alldonations =[]
             snapshot.docs.map((doc)=>{
                 var donation=doc.data()
                 donation["docid"] = doc.id
                 alldonations.push(donation)});
            this.setState({alldonations:alldonations})
        })
    }
    getDonorDetails=(donorid)=>{
        db.collection("user").where("emailid","==", donorid).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            this.setState({
              "donorname" : doc.data().firstname + " " + doc.data().lastname
            })
          });
        })
      }
   
    

     componentDidMount(){
         this.getalldonations();
         this.getDonorDetails(this.state.donorid)
     }

    componentWillUnmount(){
        this.requestref();
    }
    
    sendnotification=(bookdetails,requeststatus)=>{
        var requestid = bookdetails.requestid;
        var donorid = bookdetails.donorid;
        db.collection("allnotifications").where("requestid","==",requestid).where("donorid","==",donorid).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var message = ""
                if(requeststatus=="book sent"){
                    message=this.state.donorname+"sent you book"
                }
                else{
                    message=this.state.donorname+"has shown interest to send you book"
                }
                db.collection("allnotifications").doc(doc.id).update({
                    message:message,
                    notificationstatus:"unread",
                    date:firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
    }

    sendbook=(bookdetails)=>{
        if(bookdetails.requeststatus=="send book"){
            var requeststatus = "donor interested"
            db.collection("donations").doc(bookdetails.docid).update({
                requeststatus:"donor interested"
            })
            this.sendnotification(bookdetails,requeststatus)
        }
        else{
            var requeststatus = "book sent"
            db.collection("donations").doc(bookdetails.docid).update({
                requeststatus:"book sent"
            })
            this.sendnotification(bookdetails,requeststatus)
        }
    }
    keyExtractor=(item,index)=>index.toString();
    renderItem=({item,i})=>(
        <ListItem
        key={i}
        title={item.bookname}
        subtitle={"requested by:"+item.requestedby +"\nstatus:"+item.requeststatus}
        leftElement={<Icon name="book" type="font-awesome" color="blue"/>}
        titleStyle={{color:"white",fontWeight:"bold"}}
        rightElement={ <TouchableOpacity style={[ styles.button, { backgroundColor : item.requeststatus === "book sent"? "green" : "red"}]}
        onPress={()=>{
            this.sendbook(item)
        }}>
            <Text>{item.requeststatus=="book sent"?"book sent":"send book"}</Text>
        </TouchableOpacity>}
        />
    )
    render(){
        return(
            <View style={{flex:1}}>
              <Myheader navigation={this.props.navigation} title="donations" />
              <View style={{flex:1}}>
                  {this.state.alldonations.length==0?(<View><Text>List off all book donations</Text></View>):(<FlatList keyExtractor={this.keyExtractor}
                  data={this.state.alldonations}
                  renderItem={this.renderItem}
                  />)}
              </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({ button:{ width:100, height:30, justifyContent:'center', alignItems:'center', shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation : 16 }, subtitle :{ flex:1, fontSize: 20, justifyContent:'center', alignItems:'center' } })