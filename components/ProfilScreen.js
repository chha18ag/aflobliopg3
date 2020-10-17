import * as React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import Header from "./Header";

export default class ProfilScreen extends React.Component {

    componentDidMount() {
        const { user } = firebase.auth();
        this.setState({ user });
    };


    getMail = () =>{
        var currentUser = firebase.auth().currentUser;
        return currentUser
    };


    handleLogOut = async () => {
        await firebase.auth().signOut();
    };

    render() {
// Hvis der ikke er en bruger logget ind, vises der ingenting
        const currentUser = this.getMail();
        if (!currentUser) {
            return (
                <View>
                    <Text> User er null</Text>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Header navigation={this.props.navigation} title='ProfilScreen'/>
                    <Text>Current user: {currentUser.email}</Text>
                    <Button onPress={this.handleLogOut} title="Log out" />
                </View>
            );
        }

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
