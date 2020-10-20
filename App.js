//Lavet af Thomas
import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet,ScrollView, Text, View,TouchableOpacity, AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { Card } from 'react-native-paper';
import {createAppContainer} from "react-navigation";
import {createDrawerNavigator} from "react-navigation-drawer";

//Lokale filer
import SignUpForm from './components/SignUpForm';
import LoginForm from "./components/LoginForm";
import ProfilScreen from "./components/ProfilScreen";
import HomeScreen from "./components/HomeScreen";
import GroceryListScreen from "./components/GroceryListScreen";
import CameraScreen from "./components/CameraScreen";
import MapScreen from "./components/MapScreen";

const fireBaseConfig ={
  apiKey: "AIzaSyB_Epj8q65oQOTSfS5s2UtNxbCUtHJmDMM",
  authDomain: "ovelse-5.firebaseapp.com",
  databaseURL: "https://ovelse-5.firebaseio.com",
  projectId: "ovelse-5",
  storageBucket: "ovelse-5.appspot.com",
  messagingSenderId: "430393569044",
  appId: "1:430393569044:web:d912a18a1871c3e457dc01",
  measurementId: "G-5JLJPB0G6N"
};
// vigtigt at tilføje nedestående if statement, da ellers init firebase flere gange
if (!firebase.apps.length) {
  firebase.initializeApp(fireBaseConfig);
}

//Navigation Drawer
const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  GroceryList:{
    screen: GroceryListScreen
  },
  Camera:{
    screen:CameraScreen
  },
  Map:{
    screen:MapScreen
  },
  ProfilScreen:{
    screen:ProfilScreen
  }
});

const AppNav = createAppContainer(MyDrawerNavigator);

export default class App extends React.Component {

  state = {user:null};

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }


  // Unsubscribe funktionen deklareres og er tom til at starte med

  render() {
    const {user} = this.state;
    if (!user){
      return(
          <View>
            <Card>
              <SignUpForm/>
            </Card>
            <Card>
              <LoginForm />
            </Card>
          </View>
      )}
    else {
      return (
          <AppNav/>
      );
    }
  }


}
//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});