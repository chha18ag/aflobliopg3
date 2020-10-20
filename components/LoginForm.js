//Thomas

import * as React from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    Alert,
} from 'react-native';
import firebase from 'firebase';


export default class SignUpForm extends React.Component {
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };
    //Opretter funktioner, som håndterer loadings, samt evt. fejl.
    startLoading = () => this.setState({ isLoading: true });
    endLoading = () => this.setState({ isLoading: false });
    setError = errorMessage => this.setState({ errorMessage });
    clearError = () => this.setState({ errorMessage: null });

    //Opretter funktioner, som sætter email og password
    handleChangeEmail = email => this.setState({ email });
    handleChangePassword = password => this.setState({ password });

    //Opretter en funktion, som håndterer de indtastede oplysninger, her email og password og
    // returnerer en fejl, hvis koden er skrevet forkert.
    handleSubmit = async () => {
        const { email, password } = this.state;
        try {
            this.startLoading();
            this.clearError();
            const result = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(result);
            this.endLoading();
            this.setState({ isCompleted: true });
        } catch (error) {
            this.setError(error.message);
            this.endLoading();
        }
    };
    //Render funktion, som opretter tekstfelter og design.
    render = () => {
        const { errorMessage, email, password, isCompleted } = this.state;
        if (isCompleted) {
            return <Text>You are now logged in</Text>;
        }
        return (
            <View>
                <Text style={styles.header}>Login</Text>
                <TextInput
                    placeholder="email"
                    value={email}
                    onChangeText={this.handleChangeEmail}
                    style={styles.inputField}
                />
                <TextInput
                    placeholder="password"
                    value={password}
                    onChangeText={this.handleChangePassword}
                    secureTextEntry
                    style={styles.inputField}
                />
                {errorMessage && (
                    <Text style={styles.error}>Error: {errorMessage}</Text>
                )}
                {this.renderButton()}
            </View>
        );
    };
    //Knap som gør det muligt for brugeren af logge ind ved at kalde funktionen handleSubmit
    renderButton = () => {
        const { isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        return <Button onPress={this.handleSubmit} title="Login" />;
    };
}
//Styling
const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 2,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 40,
        marginTop: 20,
        marginLeft: 10,
        marginBottom:10,
    },
});