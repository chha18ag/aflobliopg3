//Mads

//Importerer fra react-native
import React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {Accuracy, getCurrentPositionAsync} from "expo-location";

//Importerer lokale filer
import Header from "./Header";

//Opretter classe
export default class MapScreen extends React.Component {
    mapViewRef = React.createRef();

    //Opretter en række states for at tjekke følgende:
    state = {
        //Undersøger om der er tilladelse til lokation
        hasLocationPermission: null,
        //Finder brugerens nuværende lokaltion
        currentLocation: null,
        //Finder de fastsatte markers fra brugeren
        userMarkerCoordinates: [],
        //Finder koordinaten af den valgte markør
        selectedCoordinate: null,
        //Finder adressen å den valgte markør
        selectedAddress: null,
    };
    //Opretter funktion der skaffer lokation tilladelse
    getLocationPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({ hasLocationPermission: status });
    };

    componentDidMount = async () => {
        await this.getLocationPermission();
    };

    //Funktion er updaterer brugernes lokation.
    updateLocation = async () => {
        const {coords} = await Location.getCurrentPositionAsync({accuracy: Accuracy.Balanced});
        this.setState({currentLocation: coords});
    };

    //Funktion der finder info vedrørende valgte markør
    handleSelectMarker = coordinate => {
        this.setState({ selectedCoordinate: coordinate });
        this.findAddress(coordinate);
    };

    //Funktion der finder valgte adresse ud fra koordinater
    findAddress = async coordinate => {
        const [selectedAddress] = await Location.reverseGeocodeAsync(coordinate);
        this.setState({ selectedAddress });
    };
    //Funktion til at lukke informations boks ved at sætte states på koordinater og adresse til null
    closeInfoBox = () =>
        this.setState({ selectedCoordinate: null, selectedAddress: null });

    //Funktion til at tjekke om der er tilladelse til at finde lokation til bruger,
    //samt gør det muligt at opdaterer sin lokation
    renderCurrentLocation = () => {
        const { hasLocationPermission, currentLocation } = this.state;
        if (hasLocationPermission === null) {
            return null;
        }
        if (hasLocationPermission === false) {
            return <Text>No location access. Go to settings to change</Text>;
        }
        return (
            <View>
                <Button title="update location" onPress={this.updateLocation} />
                {currentLocation && (
                    <Text>
                        {`${currentLocation.latitude}, ${
                            currentLocation.longitude
                        } ${currentLocation.accuracy}`}
                    </Text>
                )}
            </View>
        );
    };

    //Render funktioner der opstillet kortet, samt sætter nogle pre kodet Markers på kortet
    render() {
        const {userMarkerCoordinates, selectedCoordinate, selectedAddress,
            currentLocation,} = this.state;
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='Kort over Fitness centrer'/>
                <SafeAreaView style={styles.container}>
                    {this.renderCurrentLocation()}
                    <MapView
                        provider="google"
                        style={styles.map}
                        ref={this.mapViewRef}
                        showsUserLocation
                        onLongPress={this.handleLongPress}
                    >

                        <Marker
                            coordinate={{ latitude: 55.706611, longitude: 12.587258 }}
                            title="Fitness World Århusgade"
                            description="Fitness World Århusgade"
                        />
                        <Marker
                            coordinate={{ latitude: 55.711584, longitude: 12.560460 }}
                            title="Fitness World Lyngbyvej"
                            description="Fitness World Lyngbyvej"
                        />

                    </MapView>
                    {selectedCoordinate && (
                        <View style={styles.infoBox}>
                            <Text style={styles.infoText}>
                                {selectedCoordinate.latitude}, {selectedCoordinate.longitude}
                            </Text>
                            {selectedAddress && (
                                <Text style={styles.infoText}>
                                    {selectedAddress.name} {selectedAddress.postalCode}
                                </Text>
                            )}
                            <Button title="close" onPress={this.closeInfoBox} />
                        </View>
                    )}
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ffffff',
        padding: 8,
    },
    map: { flex: 1 },
    infoBox: {
        height: 100,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    infoText: {
        fontSize: 20,
    },
});