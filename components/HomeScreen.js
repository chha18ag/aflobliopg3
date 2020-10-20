//Fælles indsats
//importerer fra react-native og lokale filer
import React, { Component } from 'react'
import {View, Text, StyleSheet,} from 'react-native';
import Header from "./Header";

export default class HomeScreen extends Component {

    state={
        email: null
    };

//kalder navigationen i viewet og tilføjer tekst
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.mainContainer}>
                <Header navigation={this.props.navigation} title='HomeScreen'/>
                <Text style={styles.text2}>VELKOMMEN{"\n"}</Text>
                <Text style={styles.text}>DENNE APP ER TIL DIG, SOM ØNSKER EN HVERDAG HVOR PLANLÆGNINGEN AF UGENS INDKØBSTUR, IKKE KRÆVER SÅ MEGET.{"\n"}</Text>
                <Text style={styles.text}>UDFORSK NAVIGATIONSBAREN I VENSTRE SIDE, FOR AT FÅ EN FORNEMMELSE AF HVAD APP'EN KOMMER TIL AT KUNNE TILBYDE DIG.{"\n"}</Text>
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
});