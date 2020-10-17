//Rebecca

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View, Platform, SafeAreaView, Linking, FlatList, Button, Image } from 'react-native';
import Header from "./Header";

import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default class CameraScreen extends React.Component {

    cameraRef = React.createRef();

    state = {
        hasCameraPermission: null,
        isClicked:false,
        cameraPosition:Camera.Constants.Type.front,
        lastPhoto:'',
        hasCameraRollPermission: null,
    };

    componentDidMount() {
        this.updateCameraPermission();
        this.updateCameraRollPermission();
    }

    /*Få adgang til kamera*/
    updateCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    /*Få adgang til galleri*/
    updateCameraRollPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: status === 'granted' });
    };

    /*Tag et billde*/
    handleTakePhoto = async () => {
        if (!this.cameraRef.current) {
            return;
        }
        const result = await this.cameraRef.current.takePictureAsync();
        this.setState({ lastPhoto: result.uri });
    };

    /*Skift imellem for og bag*/
    handleChangeCamera = () =>{
        if(this.state.isClicked){
            this.setState({cameraPosition:Camera.Constants.Type.front})
            this.setState({isClicked:false})
        }else{
            this.setState({cameraPosition:Camera.Constants.Type.back})
            this.setState({isClicked:true})
        }
    }

    /*Gå til indstillinger og få permission*/
    handleSettingLink = () =>{
        Linking.openSettings()
    }

    renderCameraView() {
        const { hasCameraPermission, type } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        }
        if (hasCameraPermission === false) {
            return (
                <View>
                    <Text>Du har ikke adgang til kamera.</Text>
                    <Button onPress={this.handleSettingLink} title='Get permissions to access camera'> </Button>
                </View>
            );
        }
        return (
            <View>
                <Camera
                    style={styles.cameraView}
                    type={this.state.cameraPosition}
                    ref={this.cameraRef}>
                </Camera>
                <Button style={styles.btn} title="Take photo" onPress={this.handleTakePhoto} />
                <Button style={styles.btn} title="Switch camera" onPress={this.handleChangeCamera} />
            </View>
        );
    }

    renderLastPhoto() {
        // Her vises det seneste billede
        const { lastPhoto } = this.state;
        if (!lastPhoto === null) {
            return <View />;
        }
        return (
            <View style={styles.lastPhotoContainer}>
                <Text style={{marginLeft: 150}} >Last photo</Text>
                <Image source={{ uri: lastPhoto }} style={styles.thumbnail} />
            </View>
        );
    }

    /*Main renderr*/
    render() {

        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='Camera'/>

                <SafeAreaView style={styles.container}>
                    <View style={styles.cameraContainer}>{this.renderCameraView()}</View>
                    <View style={styles.lastPhotoContainer}>{this.renderLastPhoto()}</View>
                </SafeAreaView>
            </View>);
    }

}

const containerStyle = {
    padding: 5,
    borderRadius: 10,
    margin: 6,
    borderWidth: 1,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    btn:{
        margin:100
    },
    Flatlist_render:{
        width:'100%'
    },
    cameraContainer: {
        // Fælles style
        ...containerStyle,
        backgroundColor: '#ffffff',
    },
    cameraView: {
        marginTop: 40,
        marginLeft: 35,
        marginBottom:15,
        aspectRatio: 1.2,
        width: 500,
        height: 270
    },
    lastPhotoContainer: {
        // Fælles style
        ...containerStyle,
        backgroundColor: '#ffffff',

    },
    thumbnail: {
        width: 210,
        height: 210,
        marginLeft: 80
    },thumbnail2: {
        width: 200,
        height: 200,
        margin: 10,
    },
    FlatList_image:{
        width: 200,
        height: 200,
        margin: 5
    },
});

