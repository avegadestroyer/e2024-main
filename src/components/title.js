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

class Title extends Component {


    render () {
        return (
            <View style={styles.vTitle}>
                <Text style={styles.txtTitle}>{this.props.titulo}</Text>
            </View>
        )
    }
}


const styles= StyleSheet.create ( {
    
    vTitle : {
        width:'70%',
        height: 40,
        borderRadius:10,
        // marginVertical:5,
        // backgroundColor:,
        justifyContent:'center',
        alignItems :'center',
        borderWidth:2,
        borderColor:COLORS.primary
    },
    txtTitle:{
        color:COLORS.primary,
        fontWeight:'600',
        fontSize:16,

    }
})

export default Title