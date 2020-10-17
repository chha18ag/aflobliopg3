import React, { Component } from 'react'
import {View, Text, StyleSheet, Button,TouchableOpacity, Alert} from 'react-native';
import firebase from 'firebase';
import Header from "./Header";
export default class HomeScreen extends Component {

    state={
        clicked:false,
        btnTitle:'Tryk på mig!!!',
        email: null
    };

    onPress = () => {
        if(!this.state.clicked){
            this.setState({
                btnTitle: 'Den skal være grøn',
                clicked: true
            })
        }else {
            this.setState({
                btnTitle: 'Den skal være blå',
                clicked: false
            })
        }
    };

    render() {

        const { navigation } = this.props;
        return (
            <View style={styles.mainContainer}>
                <Header navigation={this.props.navigation} title='HomeScreen'/>
                <View style={styles.textContainer}>
                    <TouchableOpacity
                        style={[styles.btn,this.state.clicked ? styles.blue : styles.green]}
                        onPress={this.onPress} >
                        <Text style={styles.btn_txt}> {this.state.btnTitle}</Text>
                    </TouchableOpacity>


                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%'
    },
    btn:{
        padding:40,
        borderRadius:10
    },
    btn_txt:{
        color:'white'
    },
    blue:{
        backgroundColor:'blue',
    },
    green:{
        backgroundColor:'green',
    },
    textContainer: {
        flex: 0.1,
        marginTop: 200,
        alignItems: 'center',
        height: 100,
    },
});


