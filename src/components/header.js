import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
}
from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import { icons, COLORS } from '../constants/'

class Header extends Component {
    press (){
        this.props.handleTouch ()
    }

    render () {
        return (
            <View style={styles.footer}>
                <View style={styles.vIcon}>
                    <Icon
                        name = {"address-card-o"}
                        color = {COLORS.primary}
                        size= {50}
                    />
                </View>
                <View style={styles.vUserInfo}>
                    <Text style={styles.txtMetas}>{this.props.id_usuario}</Text>
                    <Text style={styles.txtMetas}>{this.props.nombre}</Text>
                    <Text style={[styles.txtMetas,{fontSize:10, fontWeight:'normal'}]}>{"pr.1.0.10"}</Text>
                </View>
            </View>
        )
    }
}


const styles= StyleSheet.create ( {
    
    container : {
        width:'80%',
        height: 45,
        borderRadius:10,
        marginVertical:5
    },
    textButton : {
        fontSize:18,
        textAlign:'center',
        fontFamily: 'MontserratBold'
    },
    tContainer : {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    icon :{ 
        height:30,
        width:30
    },  
    footer:{
        height:80,
        width : '100%',
        marginVertical : 10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:COLORS.white,
        // paddingLeft:30,
        // backgroundColor:'purple'

    },
    txtMetas:{
        color:COLORS.gray,
        fontWeight:'500',
        fontSize:15
    },
    vUserInfo: {
        width:'70%',
        height:'100%',
        paddingHorizontal:10,
       //  paddingVertical:10,
        justifyContent:'center'
    },
    vIcon :{
       width:'30%',
       height:'100%',
       // paddingHorizontal:10,
       // paddingVertical:10,
       justifyContent:'center',
       alignItems:'center'
    }
})

export default Header