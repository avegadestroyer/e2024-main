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

class ButtonMenu extends Component {
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
                        <View style={styles.btnContainer}>
                            {/* <Icon
                                name = {this.props.icon}
                                color = 'white'
                                size= {50}
                            /> */}
                             <View style={styles.titleContainer}>
                                <Text style = {[styles.textButton,{color:this.props.textColor}]}>
                                    {`${this.props.name}`}
                                </Text>
                             </View>
                            <Image source={this.props.image} style={styles.ibutton}/>
                        </View>
                    </TouchableOpacity>
            </View>
        )
    }
}


const styles= StyleSheet.create ( {
    
    container : {
        width:'90%',
        height: 140,
        borderRadius:10,
        marginVertical:5,
        marginHorizontal:10
    },
    textButton : {
        fontSize:25,
        textAlign:'center',
        fontFamily: 'MontserratBold',
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
    ibutton :{
        height:130,
        width:'30%',
        resizeMode:'contain'
    },
    btnContainer:{
        width:'100%', 
        justifyContent: 'center', 
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    titleContainer :{
        width:'50%',
        height:'100%',
        alignItems:'center', 
        justifyContent:'center',
        flexDirection:'row',
        // backgroundColor:'purple'
    }
})

export default ButtonMenu