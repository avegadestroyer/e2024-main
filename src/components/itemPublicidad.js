//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { COLORS, icons } from '../constants/'

// create a component
class ItemPublicidad extends Component {

    state =
    {
        stars:null, 
        ranking: 0
    }

    componentDidMount()
    {
     
       
    }

    render() 
    {
        const {key, imagen} = this.props.registro;
        console.log(imagen.length)
        return (
            <View style={[styles.container,
                  {backgroundColor: COLORS.lightgray, color:COLORS.primary  }]}>                
                < View style={styles.vFicha} >                       
                        <View style={styles.containerIcon}>
                            {
                                imagen ==""  || null ?
                                <Image 
                                    source ={icons.arrow_right}
                                    style = {styles.icon}
                                /> 
                                :
                                <Image 
                                    source ={{uri:imagen}}
                                    style = {styles.icon}
                                /> 
                            }
                                
                        </View>     
                </View> 
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        //  flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        width:'100%',
        paddingHorizontal:10,
        height:100,
        flexDirection:'row'
    },
    vFicha:{
        flexDirection: 'row',
        width:100,
        // paddingLeft:10
        // backgroundColor:'blue'
    },
    vLine: {
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
        width: '100%',
        marginVertical: 10,
    },
    vFecha:{
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vDescripcion:{
        width:'70%',
        height:'100%',
        paddingHorizontal:5,
        marginVertical:10,
        // backgroundColor:'yellow'
    },
    txtDia:{
        fontSize: 25,
        textAlign:'center'
    }, txtMes:{
        fontSize:15,
        textAlign: 'center'
    },
    txtDetalle:{
        fontSize: 12,
        fontFamily:'Montserrat'
        
    },
    txtDependencia:{
        color: '#8bc04c'
    },
    txtTitle:{
        fontSize:30,
        fontFamily:'MontserratSemiBold'
    },
    icon :{ 
        height:80,
        width:80,
        resizeMode:'cover'
    },
    containerIcon: {
        width:'100%',
        alignItems:'center',
        justifyContent: 'center',
        // backgroundColor:'pink',
        flexDirection:'row'
    }
});

//make this component available to the app
export default ItemPublicidad;
