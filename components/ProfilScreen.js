//Rebecca

//importerer fra react-native samt lokale filer
import * as React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import Header from "./Header";

export default class ProfilScreen extends React.Component {

    componentDidMount() {
        const { user } = firebase.auth();
        this.setState({ user });
    };
    //gør det muligt at hente brugerens e-mail adresse såfremt brugeren er registreret og logget ind
    getMail = () =>{
        var currentUser = firebase.auth().currentUser;
        return currentUser
    };

    //askynkront kald som venter på sign out metoden
    handleLogOut = async () => {
        await firebase.auth().signOut();
    };

    render() {
        //hvis der ikke er en bruger logget ind, vises ingenting
        const currentUser = this.getMail();
        if (!currentUser) {
            return (
                <View>
                    <Text> User er null</Text>
                </View>
            );
        }
        //hvis brugeren er logget ind, hentes brugerens e-mail. Ligeledes vises en række knapper
        else {
            return (
                <View style={styles.container}>
                    <Header navigation={this.props.navigation} title='ProfileScreen'/>
                    <Text>Current user: {currentUser.email}</Text>
                    <Text style={styles.text}>{"\n"}</Text>
                    <Button onPress={this.handleLogOut} title="Log out" />
                    <Button style={styles.btn} title="Personal Details"  />
                    <Button style={styles.btn} title="Latest Grocery Lists"  />
                    <Button style={styles.btn} title="Share" />
                    <Button style={styles.btn} title="FAQ" />
                </View>
            );
        }
    }
}

//styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: 'black',
        fontSize: 25,
        paddingRight:20,
        paddingLeft: 20,
        alignItems: 'center',
        marginTop: 10,
    },
});
