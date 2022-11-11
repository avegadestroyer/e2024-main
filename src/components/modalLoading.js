import React, { Component } from 'react';
import moment from "moment";
import 'moment/locale/es';
import { View, Text,  ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { COLORS, SIZES } from '../constants';



export default class ModalLoading extends Component {

    constructor(props) {
        super(props)
        this.state = {
          mensaje:"Espere un momento",
          loading: true,
          backColor : COLORS.secondary
        }
    }
    
    componentDidMount(){
    }

   


    press() {
        this.props.pressCerraModal()
    }



  
  render() {      
    return (
            <Modal
                        animationType = 'fade'
                        transparent={true}
                        visible={this.props.visible}
                        onRequestClose={() => {
                        }}>
                        <View style={styles.vModalAlerta}>
                                    <View style={[styles.modalContent, {backgroundColor: this.state.backColor}]}>
                                        <View style={styles.vHeader}>
                                            <Text style={{alignItems:"center",justifyContent:"center",textAlign:'center', color:COLORS.white, fontSize: 30, paddingVertical:10,}}>
                                                {this.state.mensaje} 
                                            </Text>
                                            <ActivityIndicator size="large" color={COLORS.white} animating={this.state.loading} />                                          
                                        </View>
                                    </View>
                        </View>
                </Modal>
    );
  }
}


// define your styles
const styles = StyleSheet.create({
    container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:COLORS.primary
        },
        vModalAlerta: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.9)'
            // backgroundColor: COLORS.
        },
        vHeader :{
            // height:100, 
            width:'100%',
            alignItems:'center',
            // backgroundColor:COLORS.primary ,
            paddingVertical:20
        },
        vImagen:{
            height: '60%',
            alignItems: "center",
            justifyContent:'space-around',
            width: '100%',
            // backgroundColor:COLORS.blue,
        },
        imgNotificacion:{
            height:'100%',
            width:'100%',
            resizeMode:'contain'
        },
        modalContent: {
            // backgroundColor: COLORS.primary,
            padding: 10,
            height: '35%',
            alignItems: "center",
            justifyContent:'space-around',
            width: '65%',
            borderRadius:10
        },
        vBotonCancelar: {
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '90%',
            height: '10%',
            // marginHorizontal: 10,
            flexDirection:'row',
        },
        tBtnSalir: {
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: COLORS.white,
            height: 60,
            width: 60,
            // borderRadius:50
            // marginHorizontal: 10,
        },
        vInfoEvento: {
            height: '80%',
            width: '100%',
            alignItems: 'center',
            justifyContent:'center',
            borderColor:'lightgray',
            borderWidth:0.5,
            borderBottomRightRadius:5,
            borderBottomLeftRadius: 5
        },
        txtSalir: {
            color: COLORS.primary,
            fontSize:15,
            fontFamily: 'Montserrat'
        },
        header: {
            height: '100%',
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor:'yellow'
        },
        vInformacionEvento: {
            height: '25%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            // backgroundColor:'red',
            paddingHorizontal: 10,
        },
        vTitulo:{
            height:'10%',
           
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.primary,
            width: '100%',
            elevation: 2,
            borderBottomWidth: 0
            // marginHorizontal: 10,
        },
        txtAcceso:{
             fontSize:18,
            color: 'white',
            fontWeight:'bold',
        }, 
        imgDoc:{
            height:'100%',
            width:'80%',
            resizeMode:'contain'
        },
        vImage:{
            height:'80%',
            width:'100%',
            alignItems:'center',
            justifyContent:'center'
        },
        signature: {
            flex: 1,
            borderColor: '#0000ff',
            borderWidth: 1,
            backgroundColor:'purple'
        },
        buttonStyle: {
            flex: 1, 
            justifyContent: "center", 
            alignItems: "center", height: 50,
            backgroundColor: COLORS.secondary,
            margin: 10
        },
        txtMensaje: {
            color: COLORS.white,
            fontSize: 18,
        }
});