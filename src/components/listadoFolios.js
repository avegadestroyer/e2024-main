import React, { Component } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native';
import { COLORS, icons } from '../constants/'
import Separator from './separator'
import ItemBitacora from './itemBitacora'
import Storage from '../libs/Storage';
import Empty from '../components/empty'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getContratos } from '../ws/contratos'
import moment from 'moment';

export default class Lista extends Component {
   state={
        Accesos: [],
        acceso:[],
        visible: false,
        visibleActivo: false,
        visibleValoracion: false,
        isLoading: false,
        visibleCotizacion:false
    }

    renderEmpty() 
    {
        return(<Empty text = "Espere un momento" > </Empty>)
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    obtenerServicios = async() => {
        let firmas = [];
      
            this.setState({
                isLoading: true
            })

            const stored = await Storage.instance.getJson('userInfo');
            if (stored) {
                const { informacion } = stored;   
                
                var listaServicios = []
                console.log(informacion.id_cliente)

                // getContratos(informacion.id_cliente)
                // .then ((response) =>{
                //         console.log(response)
                //         const { respuesta } = response.respuesta.messages
                //         let ListaContratos = []
                //         respuesta.forEach((element) => {
                               
    
                //                     let contrato = {
                //                                 id : element.id_contrato,
                //                                 contrato : element.referencia, 
                //                                 meses : element.plazo,
                //                                 monto : element.cantidad_inversion,
                //                                 tipopago : element.nombre,
                //                                 backColor : COLORS.white,
                //                                 fontColor : COLORS.primary,
                //                                 pageNext : "DetalleContrato",
                //                                 cliente : informacion.nombre,
                //                                 fechaInicio  : element.fecha,
                //                                 cuenta : element.cuenta_bancaria,
                //                                 firmas: firmas,
                //                                 // porcentaje : Math.round(porcentajeDeDias),
                //                                 fecha_finalizacion : element.fecha_finalizacion,
                //                                 correo : element.correo,
                //                                 cuenta_bancaria : element.cuenta_bancaria,
                //                                 porcentaje: Math.round(element.porcentaje), 
                //                                 cantidad_pagos: element.cantidad_pagos,
                //                                 firmados : element.firmados,
                //                                 dia_pago: element.dia_pago, 
                //                                 id_cliente : informacion.id_cliente,
                //                                 estatus : element.estatus

                //                     };
                //                             ListaContratos.push(contrato)
                               
                //         })
                            
                //             this.setState({
                //                 Accesos: ListaContratos,
                //                 isLoading:false, 
                                
                //             }) 
                // })
                // .catch (error => {
                //     console.log("error" , error)
                // })
            }

                          
    }

    itemSeparator=() =><Separator/>

    componentDidMount() {
        this.obtenerServicios()
    }

    handlePress(item) 
    {
        console.log(item)
        // console.log(this.props.na)
        this.props.navigation.navigate(item.pageNext ,
                    { contrato:item }
        )
    }

    renderFlatListItem(item) {
        let evento={}


        return (
            evento = {
                key: item.id,
                id: item.id,
                contrato: item.contrato,
                meses: item.meses,
                tipopago: item.tipopago,
                monto: item.monto,
                backColor:COLORS.gray,
                fontColor: item.fontColor,
                cliente : item.cliente,
                fechaInicio: item.fechaInicio,
                cuenta : item.cuenta,
                firmas : item.firmas,
                pageNext : item.pageNext,
                porcentaje : item.porcentaje,
                fecha_finalizacion: item.fecha_finalizacion, 
                correo : item.correo,
                cuenta_bancaria : item.cuenta_bancaria,
                cantidad_pagos: item.cantidad_pagos,
                firmados : item.firmados,
                dia_pago: item.dia_pago, 
                id_cliente : item.id_cliente,
                estatus: item.estatus
            }
        )
    }

    render() {
        return (
        <View style={styles.container}>
                <FlatList 
                        data={this.state.Accesos}
                        ListEmptyComponent ={this.renderEmpty}
                        keyExtractor={(i,k)=>k.toString()}
                        refreshing={this.state.isLoading}
                        ItemSeparatorComponent = {this.itemSeparator}
                        onRefresh={this.obtenerServicios}
                        horizontal
                        // numColumns={2}
                        renderItem={({ item }) => {
                            if (item.estatus=="Activo" )
                            {
                                return (
                                    <TouchableOpacity
                                        onPress={() => this.handlePress(item)}>
                                        <ItemBitacora registro={this.renderFlatListItem(item)} />
                                    </TouchableOpacity>
                                )
                            }
                            else
                            {
                                return (
                                    <ItemBitacora registro={this.renderFlatListItem(item)} />
                                )
                            }
                        }}
                    />
            </View>
        );
    }
}



// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
