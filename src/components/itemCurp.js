import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image
}
from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import { icons, COLORS } from '../constants/'

class ItemCurp extends Component {
 

    render () {
        return (
            <View style={styles.container}>
                <TextInput
                    {...this.props}                                
                    style={[styles.input, {color: this.props.colorFont}]}
                    placeholderTextColor = {this.props.placeholderColor}
                    autofocus={true}
                    underlineColorAndroid = 'transparent'
                    //maxLength={18}
                />
            </View>
        )
    }
}


const styles= StyleSheet.create ( {
    
    container : {
        width:40,
        height: 40,
        borderRadius:10,
        marginHorizontal:5,
        borderWidth:1
    },
    input:{
        textAlign:'center',
        fontSize:18
    }
})

export default ItemCurp