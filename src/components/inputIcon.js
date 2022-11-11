import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput
} from 'react-native'
import { COLORS } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';

class InputIcon extends Component {
    
    press() {
        this.props.handleTouch()
    }
    
    render() {
        // console.log(this.props)

        const { icon } = this.props
        return(
            <View style={[{backgroundColor: this.props.color}, styles.container]}>
                      <View style={styles.containerInput}>
                          <View style={styles.containerDetalle}>
                                <Icon
                                    name = {icon}
                                    color = {COLORS.gray}
                                    size= {20}
                                />
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
        marginVertical:5, 
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
        justifyContent:'space-between',
        marginLeft:5,
        flexDirection:'row'
    },
    input: {
        fontSize:13,
        width: '100%',
        // backgroundColor:'purple'
    },
    txtDetalle:{
        color:COLORS.secondary,
        textAlign:'justify',
        fontWeight:'bold'
    },
    containerDetalle: {
        width:'10%',
        paddingRight:10
        // backgroundColor:COLORS.darkGray,
        // paddingVertical:10,
        // borderBottomWidth:0.3,
        // borderBottomColor: COLORS.gray,
        // paddingHorizontal:15
    }
})

export default InputIcon;