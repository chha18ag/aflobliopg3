//Christel

//importerer fra react-native
import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';

//Lokale filer
import Note from './Note';
import Header from "./Header";

export default class GroceryListScreen extends React.Component {

    //opretter en constructor der kører hver gang kompenenten kører i appen
    constructor(props) {
        super(props);
        this.state = { //definerer vores state
            noteArray: [], //skal holde "note array"
            noteText: '', //og notes teksten
        }
    }
    render () {
        let notes = this.state.noteArray.map((val, key) => {
            //laver en deleteMetode til vores note-component
            return <Note key={key} keyval={key} val={val}
                         deleteMethod={() => this.deleteNote(key)}/>
        });

        /*
        I nedenstående kode bliver der designet hvordan siden/Screen skal se ud
        Der er tilføjet en ScrollView så man kan se alle "noter/manglende varer" på siden
        så man kan rulle ned for at se dem. Det også her at noterne bliver tilføjet
        Under ScrollView er der nederst på siden en footer  TouchableOpacity, hvor man kan indtaste den manglende vare,
        og derefter trykke på "+" så det bliver tilføjet til listen
        OnChangeText sørger for at det man skriver i noten bliver gemt i "setState"
        OnPress funktionen sørger for at kalde "addNote" funktionen
         */
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='Grocery List'/>
                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(noteText) => this.setState({noteText})}
                        value={this.state.noteText}
                        placeholder='>Skriv din vare her og tryk på "+" for at tilføje varen til listen '
                        placeholderTextColot='white'
                        underlineColorAndroid='transparant'>
                    </TextInput>
                </View>
                <TouchableOpacity onPress= {this.addNote.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }

    //Denne her funktion bliver kaldt når man klikker op "+" (OnPress funktionen)
    addNote() {
        if (this.state.noteText) {
            var d = new Date();
            this.state.noteArray.push({ //tilføjer datoen til noten og notes teksten
                'date': d.getFullYear()+
                    "/" + (d.getMonth() + 1 ) +
                    "/" + d.getDate(),
                'note': this.state.noteText
            });
            this.setState({noteArray: this.state.noteArray}) //sætter værdien i notes array til de her værdier
            this.setState({noteText: ''}) //her resetter man notes teksten til at være tom igen
        }
    }
    deleteNote(key) {
        this.state.noteArray.splice(key, 1); //splice funktionen gør det muligt at fjerne en element fra vores array
        this.setState({ noteArray: this.state.noteArray}) //opdaterer array
    }
}

//alt styling
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    header:{
        backgroundColor:'#3b2129',
        alignItems:'center',
        borderBottomWidth:10,
        borderBottomColor:'#ddd'
    },
    headerText:{
        fontWeight: 'bold',
        color:'white',
        fontSize:18,
        padding:26
    },
    Scrollcontainer:
        {
            flex:1,
            marginBottom:100,
        },
    footer:
        {
            position: 'absolute',
            bottom: 0,
            left :0,
            right:0,
            zIndex:10
        },
    textInput :
        {
            alignSelf: 'stretch',
            color:'#fff',
            padding:20,
            backgroundColor:'#90A4AE',
            borderTopWidth :2,
            borderTopColor:'#ededed'
        },
    addButton :
        {
            position:'absolute'
            ,zIndex:11,
            right:20,
            bottom:20,
            backgroundColor:'#546E7A',
            width:90,
            height:90,
            borderRadius:20,
            alignItems:'center',
            justifyContent:'center',
            elevation: 8,
        },
    addButtonText :
        {
            color: '#fff',
            fontSize:24,
        }
})