//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';



// create a component
class ItemFolio extends Component {

    render() {
        const {key,folio,activado, idfolio} = this.props.registro;
        
        
        return (
            <View style={[styles.container,
                  {backgroundColor: backColor, color:fontColor  }]}>
                
                <View style={styles.vFicha} >                       
                        <View style={styles.vDescripcion}>
                            <Text style={[styles.txtFuente, styles.txtTitle, {color:fontColor  }]}>
                               Folio: #{folio}
                            </Text>
                           
                        </View>
                </View>
                
                <View style={styles.vFecha}>
                        <Switch
                            // trackColor={{ false: "#767577", true: "#6783F9" }}
                            trackColor={{ false: "#767577", true: "#F09020" }}
                            // thumbColor={activado? "#2C41BF" : "#f4f3f4"}
                            thumbColor={activado? "#F09020" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={ (value) =>{
                                changeState (value)
                            } } 
                            value={ activado}
                        />
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
        height:200,
        flexDirection:'row'
    },
    vFicha:{
        flexDirection: 'row',
        width:'75%',
        paddingLeft:10
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
        width:'100%',
        paddingHorizontal:5
    },
    txtFuente:{
        color: 'gray'
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
    },
    txtDependencia:{
        color: '#8bc04c'
    },
    txtTitle:{
        fontSize:16
    },
    logo:{
        width:50,
        height:50,
        resizeMode:'contain'
    }
});

//make this component available to the app
export default ItemFolio;
