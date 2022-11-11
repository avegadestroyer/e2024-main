import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { COLORS } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';

class InputPassword extends Component {
    
    press() {
        this.props.handleTouch()
    }
    
    render() {
        // console.log(this.props)
        return(
            <View style={[{backgroundColor: this.props.color}, styles.container]}>
                      <View style={styles.containerInput}>
                          <View style={styles.containerDetalle}>
                            <Text style={styles.txtDetalle}>
                                {this.props.titulo}
                            </Text>
                          </View>
                          <View style={styles.vContainerInput}>
                            <TextInput
                                {...this.props}                                
                                style={[styles.input, {color: this.props.colorFont}]}
                                placeholderTextColor = {this.props.placeholderColor}
                                autofocus={true}
                                underlineColorAndroid = 'transparent'
                                //maxLength={18}
                            />
                             <TouchableOpacity style={styles.btnMostrar} onPress= { () => this.press()}>
                                  <Icon
                                     name = {"eye"}
                                     color = {COLORS.gray}
                                     size= {20}
                                 />
                            </TouchableOpacity>
                          </View>
                      </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        // width:250,
        height:70,       
        // borderRadius:10,
        marginVertical:20, 
        flexDirection:'row',
        alignItems: 'center',
        borderBottomWidth:0.5,
        borderBottomColor: COLORS.gray,
        // backgroundColor:'purple'
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
        marginLeft:5
    },
    input: {
        fontSize:13,
        width: '80%',
        fontFamily: 'Montserrat'
    },
    txtDetalle:{
        color:COLORS.secondary,
        textAlign:'justify',
        fontWeight:'bold'
    },
    containerDetalle: {
        width:'100%',
        paddingRight:10
        // backgroundColor:COLORS.darkGray,
        // paddingVertical:10,
        // borderBottomWidth:0.3,
        // borderBottomColor: COLORS.gray,
        // paddingHorizontal:15
    },
    vContainerInput: {
        width:'100%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        // paddingHorizontal:10
    },
    btnMostrar:{
        height:50,
        width: 50,
        // backgroundColor:'purple',
        alignItems:'center',
        justifyContent:'center'
    }
})

export default InputPassword;