import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
}
from 'react-native'


import { icons, COLORS } from '../constants/'

class ButtonUpload extends Component {
    press (){
        this.props.handleTouch ()
    }

    render () {
        return (
            <View style = {[{backgroundColor:this.props.color}, styles.container]}>
                    <TouchableOpacity
                        style = { styles.tContainer}
                        onPress= { () => this.press()}
                    >
                        <View style={{width:'100%', justifyContent:'space-around',flexDirection:'row', alignItems:'center'}}>
                            <Text style = {[styles.textButton,{color:this.props.textColor}]}>
                                {`${this.props.name}`}
                            </Text>
                            <Text style = {[styles.textButton,{color:this.props.textColor}]}>
                                {`${this.props.cantidad}`}
                            </Text>
                        </View>
                    </TouchableOpacity>
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
    }
})

export default ButtonUpload