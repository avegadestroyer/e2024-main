//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { COLORS, icons } from '../constants/'
import Icon from 'react-native-vector-icons/FontAwesome';


// create a component
class ItemContacto extends Component {

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
        const {key, perfil, nombreCompleto, cargoDesc, responsabilidadDesc, celular} = this.props.registro;
        
        return (
            <View style={[styles.container,
                  {backgroundColor: COLORS.white, color:COLORS.primary  }]}>                
                < View style={styles.vFicha} >     
                        <View style={styles.containerIcon}>
                            {
                                perfil ==""  || null ?
                                <Icon
                                         name = {"user-o"}
                                         color = {COLORS.primary}
                                         size= {50}
                                />
                                :
                                <Image 
                                    source ={{uri:perfil}}
                                    style = {styles.icon}
                                /> 
                            }   
                        </View>                       
                        <View style={styles.vDescripcion}>
                            <Text style={[styles.txtTitle, {color:COLORS.gray  }]}>
                               {nombreCompleto}
                            </Text>
                            <Text style={[styles.txtDetalle, {color:COLORS.gray  }]}>
                                {cargoDesc}
                            </Text>
                            <Text style={[styles.txtDetalle, {color:COLORS.gray  }]}>
                                Responsabilidad: {responsabilidadDesc}
                            </Text>
                            <Text style={[styles.txtDetalle, {color:COLORS.gray  }]}>
                                 {celular}
                            </Text>
                        </View>
                        <View style={styles.containerButton}>
                            {
                               <Icon
                                         name = {"arrow-right"}
                                         color = {COLORS.secondary}
                                         size= {30}
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
        paddingHorizontal:20,
        height:100,
        flexDirection:'row',
        borderRadius:20,
        borderBottomWidth:3,
        borderBottomColor: COLORS.secondary
    },
    vFicha:{
        flexDirection: 'row',
        width:'100%',
        // paddingLeft:10
        // backgroundColor:'blue'
    },
    vLine: {
        borderBottomColor: COLORS.secondary,
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
        width:'50%',
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
        fontSize:16,
        // fontFamily:'MontserratSemiBold'
    },
    icon :{ 
        height:60,
        width:60,
        borderRadius:40
    },
    containerIcon: {
        width:'30%',
        alignItems:'center',
        justifyContent: 'center',
        // backgroundColor:'pink',
        flexDirection:'row'
    },
    containerButton:{
        width:'20%',
        alignItems:'center',
        justifyContent: 'center',
        // backgroundColor:'pink',
        flexDirection:'row'
    }
});

//make this component available to the app
export default ItemContacto;
