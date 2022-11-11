import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';




class ButtonFloat extends Component {
    
    press() {
        if (this.props.id){

            this.props.handleTouch(this.props.id)
        }
        else{
            this.props.handleTouch()
        }
    }
    
    render() {
        return(
            <View style={[{backgroundColor: this.props.color, bottom:this.props.bottom}, styles.container]}>
                <TouchableOpacity 
                    style ={styles.tContainer}
                    onPress={() => this.press()}>
                    <Icon 
                        name={ this.props.iconName }
                        color="white"
                        size={ 25 }
                        // style={{ left: 1 }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        width:40,
        height:40,        
        borderRadius:40,
        // marginVertical:5,
        // borderRadius: 10,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        // borderWidth: 1,
        // borderColor: 'white'
        position: 'absolute',
        margin: 0,
        right: 0
    },
    textButton:{
        textTransform:'uppercase',
        fontWeight:'bold'
    },
    tContainer:{
        // flex: 1,
        height:'100%',
        width: '100%',
        alignItems:'center',
        justifyContent:'center',
    }
})

export default ButtonFloat;