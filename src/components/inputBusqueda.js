import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput
} from 'react-native'
import { COLORS } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';

class InputBusqueda extends Component {
    
    press() {
        this.props.handleTouch()
    }
    
    render() {
        // console.log(this.props)
        return(
            <View style={[styles.container]}>
                      <View style={styles.containerInput}>
                          {/* <View style={styles.containerDetalle}> */}
                            <Icon
                                    name = {"search"}
                                    color = {COLORS.gray}
                                    size= {30}
                                />
                          {/* </View> */}
                          {/* <View style={styles.containerDetalle}> */}
                            <TextInput
                                {...this.props}                                
                                style={[styles.input, {color: this.props.colorFont}]}
                                placeholderTextColor = {this.props.placeholderColor}
                                autofocus={true}
                                underlineColorAndroid = 'transparent'
                                //maxLength={18}
                            />
                          {/* </View> */}
                      </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        width:'100%',
        height:55,       
        // borderRadius:10,
        marginVertical:5, 
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        borderBottomWidth:0.5,
        borderBottomColor: COLORS.backColor,
        backgroundColor:COLORS.white
    },
    tContainer:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
    containerIcon:{
        marginRight:2,
        height:'100%',
        width:'20%',
        alignItems:'center',
        justifyContent:'center',
        borderTopLeftRadius: 10,
       
    },
    containerInput:{
        height: '100%',
        width: '100%',
        alignItems:'center',
        justifyContent:'center',
        // marginLeft:5,
        flexDirection:'row',
        paddingHorizontal:30
    },
    input: {
        fontSize:13,
        width: '100%',
        marginLeft:10
    },
    txtDetalle:{
        color:COLORS.secondary,
        textAlign:'justify',
        fontWeight:'bold'
    },
    containerDetalle: {
        width:'10%',
        height:'100%',
        paddingRight:10,
        // backgroundColor:COLORS.darkGray,
        // paddingVertical:10,
        // borderBottomWidth:0.3,
        // borderBottomColor: COLORS.gray,
        // paddingHorizontal:15
    }
})

export default InputBusqueda;