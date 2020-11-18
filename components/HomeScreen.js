//Fælles indsats
//importerer fra react-native og lokale filer
import React, { Component } from 'react'
import {View, Text, StyleSheet, Image} from 'react-native';
import Header from "./Header";
import Swiper from 'react-native-swiper';




export default class HomeScreen extends Component {

    state={
        email: null
    };

//kalder navigationen i viewet og tilføjer tekst
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.mainContainer}>
                <Header navigation={this.props.navigation} title='Find fitness buddy'/>

                <Swiper style={styles.wrapper} showsButtons={true}>
                    <View style={styles.slide1}>
                        <Image source={require('../components/fitguy1.jpg')}/>
                    </View>
                    <View style={styles.slide2}>
                        <Image source={require('../components/fitgirl1.jpg')}/>
                    </View>
                    <View style={styles.slide3}>
                        <Image source={require('../components/fitguy2.jpg')}/>
                    </View>
                </Swiper>
            </View>
        );
    }
}

//styling
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    text: {
        color: 'black',
        fontSize: 15,
        paddingRight:20,
        paddingLeft: 20,
    },
    text2: {
        color: 'black',
        fontSize: 25,
        paddingRight:20,
        paddingLeft: 20,
        alignItems: 'center',
        marginTop: 35,
    },
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});