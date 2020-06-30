import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, FlatList } from 'react-native';
import { Input, Card, Button, Icon} from 'native-base'

import * as firebase from 'firebase'
import { render } from 'react-dom';


var firebaseConfig = {
  apiKey: "AIzaSyDfcjkz_tTi2XyFgbDAK-ffzyh43eXZK_4",
  authDomain: "projectd2714.firebaseapp.com",
  databaseURL: "https://projectd2714.firebaseio.com",
  projectId: "projectd2714",
  storageBucket: "projectd2714.appspot.com",
  messagingSenderId: "1036259008985",
  appId: "1:1036259008985:web:1fcf9cb06fdabee1a7f9c8",
  measurementId: "G-0ZZYCZQRZX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.analytics();



export default class App extends React.Component{

  constructor(props){ 
    super(props);
    this.state = {
      message: " ",
      messageList: []
    };
  }

  sendMessage = message => {
    var messageListRef = firebase.database().ref("message_list");

    var newMessageRef = messageListRef.push() ;

    newMessageRef.set({
      text : message,
      time : Date.now()

    })
    
    this.setState({ message: ""}) ;
  }

  updateList = messageList =>{
    this.setState({messageList: messageList});

  }


  componentDidMount(){

    var self = this;

    var messageListRef = firebase.database().ref("message_list");

    messageListRef.on("value", dataSnapShot =>{
        // Callback function in a function
        if(dataSnapShot.val()){
          let messageList = Object.values(dataSnapShot.val());
          self.updateList(messageList.reverse());

        }
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    margin: 2,
    backgroundColor: "#01CBC6"
  },
  header: {
    backgroundColor: "#2B2B52",
    alignItems: "center",
    height: 40,
    justifyContent: "center"
  },
  headerText: {
    paddingHorizontal: 10,
    color: "#FFF",
    fontSize: 20
  },
  listContainer: {
    flex: 1,
    padding: 5
  },
  listItem: {
    padding: 10
  },
  messageText: {
    fontSize: 20
  },
  timeText: {
    fontSize: 10
  },
  inputContainer: {
    flexDirection: "row",
    padding: 5,
    borderWidth: 5,
    borderRadius: 15,
    borderColor: "#2B2B52",
    color: "#fff"
  }
});



