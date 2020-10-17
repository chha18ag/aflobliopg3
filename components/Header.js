//Thomas

import React,{Component} from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from 'firebase';

export default class Header extends Component {
    handleNavigation = () => {
        this.props.navigation.openDrawer()
    }
    render() {
        const {title}= this.props
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.icon} onPress={this.handleNavigation}>
                    <MaterialCommunityIcons name="forwardburger" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.txt}>{title}</Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'space-around',
        paddingTop:40,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    icon:{
        width:'10%',
        display: 'flex',
        justifyContent: 'flex-end',

    },
    txt:{
        width: '85%',
        textAlign:'center',
        fontSize:30,
        paddingRight:66
    }
})

/*
const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '18%',
        borderBottomWidth: 8,
        borderBottomColor: "#ddd",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#90A4AE'
    },
    text: {
        fontSize: 18,
        letterSpacing: 1.1,
        fontWeight: 'bold',
        color: '#fff'
    }
})
*/
