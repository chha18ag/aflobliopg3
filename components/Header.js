//Thomas
import React,{Component} from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class Header extends Component {
    //Opretter handlenavigatoren
    handleNavigation = () => {
        this.props.navigation.openDrawer()
    }

    render() {
        const {title}= this.props
        return(
            //Opretter en trykbar knap med navigationsmuligheder
            <View style={styles.container}>
                <TouchableOpacity style={styles.icon} onPress={this.handleNavigation}>
                    <MaterialCommunityIcons name="forwardburger" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.txt}>{title}</Text>
            </View>

        )
    }
}
//Styling
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