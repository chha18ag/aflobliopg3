//Christel

//importerer fra react-native
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity } from 'react-native';

/*
Denne her klasse vil indeholde alle de noter vi laver på "GroceryListScreen"
 */


export default class Note extends React.Component {

    /*
    Laver nedenfor layout for noter
    Bliver oprettet en "key" med props. For at sikre hvilke elementer der bliver oprettet og opdateret
     */
    render () {
        return (
            <View key={this.props.keyval} style={styles.note}>
                <Text style={styles.noteText}>{this.props.val.date}</Text>
                <Text style={styles.noteText}>{this.props.val.note}</Text>
                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight:100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    noteText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#546E7A',
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#546E7A',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    noteDeleteText: {
        color: 'white',
    }
});