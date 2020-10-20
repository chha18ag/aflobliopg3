//Rebecca

//importerer fra react-native samt lokale filer
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Linking, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import Header from "./Header";

export default class CameraScreen extends React.Component {

    cameraRef = React.createRef();

//opretter en række states der bruges når man klikker på en bestemt knap
    state = {
        //Undersøger om der er tilladelse til kameraet
        hasCameraPermission: null,
        isClicked:false,
        cameraPosition:Camera.Constants.Type.front,
        lastPhoto:'',
        //Undersøger om der er tilladelse til galleriet
        hasCameraRollPermission: null,
    };

    componentDidMount() {
        this.updateCameraPermission();
        this.updateCameraRollPermission();
    }

    //adgang til kamera
    updateCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    //adgang til galleri
    updateCameraRollPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: status === 'granted' });
    };

    //gør det muligt at tage et billde og gemme det som det seneste billede
    handleTakePhoto = async () => {
        if (!this.cameraRef.current) {
            return;
        }
        const result = await this.cameraRef.current.takePictureAsync();
        this.setState({ lastPhoto: result.uri });
    };

    //gør det muligt at skifte imellem for- og bagkamera
    handleChangeCamera = () =>{
        if(this.state.isClicked){
            this.setState({cameraPosition:Camera.Constants.Type.front})
            this.setState({isClicked:false})
        }else{
            this.setState({cameraPosition:Camera.Constants.Type.back})
            this.setState({isClicked:true})
        }
    }

    //åbner indstillinger på telefonen for at få permission til kameraet
    handleSettingLink = () =>{
        Linking.openSettings()
    }

    renderCameraView() {
        //hvis cameraPermission er lig null, renders ingenting
        const { hasCameraPermission, type } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        }
        /*såfremt cameraPermission er lig false har man mulighed for at trykke på en knap for at få adgang,
        herefter vil ens indstillinger på telefonen åbnes hvor man kan give tilladelse til at kameraet benyttes*/
        if (hasCameraPermission === false) {
            return (
                <View>
                    <Text>Du har ikke adgang til kamera.</Text>
                    <Button onPress={this.handleSettingLink} title='Get permissions to access camera'> </Button>
                </View>
            );
        }
        /*når permission er true, vil viewet returnes og man har mulighed for at tage et billede
        og ændre imellem for- og bagkamera ved hjælp af knapperne*/
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

    //gør det muligt at vise det seneste billede
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

    //main render
    render() {

        return (
            //Kalder navigationen
            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='Camera'/>

                <SafeAreaView style={styles.container}>
                    <View style={styles.cameraContainer}>{this.renderCameraView()}</View>
                    <View style={styles.lastPhotoContainer}>{this.renderLastPhoto()}</View>
                </SafeAreaView>
            </View>);
    }

}

//al styling
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