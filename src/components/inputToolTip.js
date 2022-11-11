import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput, 
    Alert,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants';

class Input extends Component {
    
    press() {
        this.props.handleTouch()
    }

    mostrarModal = (mensaje) => {
        Alert.alert("Información", mensaje)
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
                            <TouchableOpacity style={styles.btnTooltip} onPress= { () => mostrarModal("Titularidad que desempeña en su trabajo")}>
                                        <Icon
                                                name = {"question-circle-o"}
                                                color = {COLORS.secondary}
                                                size= {15}
                                        />
                            </TouchableOpacity>
                          </View>
                            <TextInput
                                {...this.props}                                
                                style={[styles.input, {color: this.props.colorFont}]}
                                placeholderTextColor = {this.props.placeholderColor}
                                autofocus={true}
                                underlineColorAndroid = 'transparent'
                                //maxLength={18}
                            />
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
        width: '100%',
        fontFamily: 'Montserrat'
    },
    txtDetalle:{
        color:COLORS.secondary,
        textAlign:'justify',
        fontWeight:'bold'
    },
    containerDetalle: {
        width:'100%',
        paddingRight:10,
        flexDirection:'row',
        justifyContent:'flex-start'
        // backgroundColor:COLORS.darkGray,
        // paddingVertical:10,
        // borderBottomWidth:0.3,
        // borderBottomColor: COLORS.gray,
        // paddingHorizontal:15
    },
    vTooltip:{
        height:'100%',
        width:'30%',
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'purple'
    },
    btnTooltip:{
        width:30,
        height:30,
        // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Input;