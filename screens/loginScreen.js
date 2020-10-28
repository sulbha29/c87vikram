import React,{Component} from 'react'
import {View,StyleSheet,TextInput,TouchableOpacity, Alert,Text,Modal,ScrollView, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase'
import db from '../config'

export default class LoginScreen extends Component{
    constructor(){
        super();
        this.state={
            emailid:"",
            password:"",
            firstname:"",
            lastname:"",
            address:"",
            contact:"",
            confirmpassword:"",
            isModalVisible:false
        }
    }
    login=(emailid,password)=>{
     firebase.auth().signInWithEmailAndPassword(emailid,password).then(()=>{
         
         this.props.navigation.navigate("donatebooks");
        
     })
     .catch((error)=>{
         var errorcode=error.code;
         var errormessage=error.message
         return Alert.alert(errormessage)
         
     })
     
    }
    signup=(emailid,password,confirmpassword)=>{
        if(password !== confirmpassword){
            return Alert.alert("Password doesn't match")
            
        }
        else{

        
        firebase.auth().createUserWithEmailAndPassword(emailid,password)
        .then(()=>{
            db.collection("user").add({
                firstname:this.state.firstname,
                lastname:this.state.lastname,
                contact:this.state.contact,
                emailid:this.state.emailid,
                address:this.state.address,
                isbookrequestactive:false
              })
    
    return Alert.alert("User added sucessfully",""
                [{text:'ok',onPress:()=>{this.setState({'isModalVisible':false})}}]
                )
            })
        .catch((error)=>{
            var errorcode=error.code;
            var errormessage=error.message
            return Alert.alert(errormessage)
        })
        }
       
    }
    showmodal=()=>{
        return(
            <Modal
            animationtype="fade"
            transparent={true}
            visible={this.state.isModalVisible} >
              <View style={styles.modalContainer}>
                  <ScrollView style={{width:"65%"}}>
                  <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                <Text style= {styles.modalTitle}>Registration</Text>
                <TextInput style={styles.formTextInput}
                 placeholder={"First Name"} 
                 maxLength={10}
                onChangeText={(text)=>{
                    this.setState({firstname:text})
                }}
                />
                  <TextInput style={styles.formTextInput} placeholder={"Last Name"} maxLength={10}
                onChangeText={(text)=>{
                    this.setState({lastname:text})
                }}
                />
                 <TextInput style={styles.formTextInput} placeholder={"Contact"} maxLength={10} keyboardType={"numeric"}
                onChangeText={(text)=>{
                    this.setState({contact:text})
                }}
                />
                 <TextInput style={styles.formTextInput} placeholder={"Address"} multiline={true}
                onChangeText={(text)=>{
                    this.setState({address:text})
                }}
                />
                 <TextInput style={styles.formTextInput} 
                 placeholder={"Email id"} keyboardType={"email-address"}
                onChangeText={(text)=>{
                    this.setState({emailid:text})
                }}
                />
                 <TextInput style={styles.formTextInput}
                  placeholder={"Password"} secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({password:text})
                }}
                />
                  <TextInput style={styles.formTextInput} placeholder={"Confirm Password"} secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({confirmpassword:text})
                }}
                />
               <View style = {styles.modalBackButton}>
                    <TouchableOpacity style = {styles.registerButton}
                    onPress = {()=>{this.signup(this.state.emailid,this.state.password,this.state.confirmpassword)}} >
                      <Text style = {styles.registerButtonText}>Register</Text>

                    </TouchableOpacity>
                    </View>
                    <View style = {styles.modalBackButton}>
                    <TouchableOpacity style = {styles.cancelButton}
                    onPress = {()=>this.setState({"isModalVisible":false})}>
                      <Text style = {styles.registerButtonText}>cancel</Text>

                    </TouchableOpacity>
                  

                    </View>
        
               
                  </KeyboardAvoidingView>
                  </ScrollView>
                  </View>
            </Modal>
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{justifyContent:"center",alignItems:"center"}}>{this.showmodal()}</View>
               <Text>Book Santa</Text>
                
                    <TextInput style={styles.loginBox}
                    placeholder="abc@example.com"
                    keyboardType="email-address"
                    onChangeText={(text)=>{
                        this.setState({emailid:text})
                    }}
                    />
                    <TextInput style={styles.loginBox}
                    placeholder="enter password"
                    secureTextEntry={true}
                    onChangeText={(text)=>{
                        this.setState({password:text})
                    }}
                    />
                    <TouchableOpacity style={styles.button}
                     onPress={()=>{this.login(this.state.emailid,this.state.password)}}>
                    <Text>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                     onPress={()=>{this.setState({isModalVisible:true})}}>
                    <Text>Sign up</Text>
                    </TouchableOpacity>
                

            </View>
        )
    }
        
    
}
const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#ff3d00'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#ff8a65',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#ff5722',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'#ff5722',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
  
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'#ffff',
     fontWeight:'200',
     fontSize:20
   }
  })
