import React, { Component } from 'react';
import moment from "moment";
import 'moment/locale/es';
import { View, Text, TouchableOpacity, StyleSheet, Modal,  Linking, Share, TouchableHighlight, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { COLORS, SIZES } from '../constants';
import { setPersona } from '../ws/setPersona';
import { setAdicional } from '../ws/setAdicional'
import Icon from 'react-native-vector-icons/FontAwesome';
import Storage from '../libs/Storage'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class modalUploadItems2 extends Component {

    constructor(props) {
        super(props)
        this.watchID=0;
        this.state = {
          mensaje:"Subiendo registros",
          cantidad:"",
          contador : 0,
          total : 0,
          todos: false,
          backColor : COLORS.primary,
          errorSinConexion: false,
          registrosPorSubir : []
        }
    }

    CheckConnectivity = () => {
        // For Android devices
        NetInfo.fetch().then(state => {
            if( !state.isConnected)
            {
                this.setState ({
                    mensaje:"Sin conexión, intente de nuevo",
                    errorSinConexion: true
                })
            }
            else
            {
                this.setState ({
                    total : this.props.cantidad,
                    cantidad : "0/"+this.props.cantidad
                })
        
                // setTimeout(() => {
                    this.enviarDato();
            //    }, 500)
            }
          });
    };
    
    componentDidMount()
    {
        this.CheckConnectivity()
    }

    // async guardarEncuestaEnviada (persona) 
    // {
    //     console.log("encuestasEnviadas")

    //     const encuestasEnviadas = await Storage.instance.getJson('encuestasEnviadas');
        
    //     if (encuestasEnviadas) 
    //     {
    //         encuestasEnviadas.push(persona)
    //         const stored = await Storage.instance.store('encuestasEnviadas', JSON.stringify(encuestasEnviadas))
    //         if (stored)
    //         {
    //             console.log("Se guardo ya habia")
    //             return true;
    //         }
    //         else
    //         {
    //             // setLoading(false)
    //             // setMessage("Se presentó un error")
    //         }
    //     }
    //     else
    //     {
    //         let encuestas = []; 
    //         encuestas.push(persona)
    //         const stored = await  Storage.instance.store('encuestasEnviadas', JSON.stringify(encuestas))
    //         console.log("stonred", stored )
    //         if (stored)
    //         {
    //             console.log("Se guardo primera vez")
    //             return true;
    //         }
    //         else
    //         {
    //             // setLoading(false)
    //             // setMessage("Se presentó un error")
    //         }
    //     }
    //     return false;
    // }


    
    async guardarEncuestasEnviada (listaPersonas) 
    {
        console.log("encuestasEnviadas", listaPersonas)
        
        const encuestasEnviadas = await Storage.instance.getJson('encuestasEnviadas');
        
        if (encuestasEnviadas) 
        {
            listaPersonas.forEach(persona => {

                encuestasEnviadas.push(persona)
            })

            const stored = await Storage.instance.store('encuestasEnviadas', JSON.stringify(encuestasEnviadas))
            if (stored)
            {
                console.log("Se guardo ya habia")
                return true;
            }
            else
            {
                // setLoading(false)
                // setMessage("Se presentó un error")
            }
        }
        else
        {
            let encuestas = []; 
            listaPersonas.forEach(persona => {

                encuestas.push(persona)
            })
            const stored = await  Storage.instance.store('encuestasEnviadas', JSON.stringify(encuestas))
            console.log("stonred", stored )
            if (stored)
            {
                console.log("Se guardaron primera vez")
                return true;
            }
            else
            {
                // setLoading(false)
                // setMessage("Se presentó un error")
            }
        }
        return false;
    }
    
    async EnviarDatosAsincrono () {
        RegistrosEnviar.forEach(persona => {
            // console.log(persona)
            
            let img = persona.imagen!="" ?  persona.imagen.substring(23) :""
            let estructura = {
                curp: persona.curp,
                // curp: "CAVA020604HQRBZNA3",
                nombre: persona.nombre,
                primerap: persona.primerap,
                segundoap: persona.segundoap,
                genero: persona.genero,
                lugarnacimiento: persona.lugarnacimiento,
                fechanacimiento : persona.fechaNacimiento,
                claveelector: persona.claveelector,
                cargo: persona.cargo,
                imagen: img,
                estado : persona.adicional.estado,
                municipio: persona.adicional.municipio,
                distritofederal: persona.adicional.distrito,
                seccion: persona.adicional.seccion,
                responsabilidad: persona.responsabilidad,
                otro:"OTRO"
            }

            console.log(estructura)

            let estructuraCompletar = {
                curp : persona.curp,
                // curp : "CAVA020604HQRBZNA3",
                celular :persona.adicional.celular,
                correo :persona.adicional.correo,
                redes: persona.adicional.facebook,
                twitter: persona.adicional.twitter,
                linkedin: persona.adicional.linkedin,
                instagram : persona.adicional.instagram,
                estado : persona.adicional.estado,
                municipio : persona.adicional.municipio,
                alcaldia: "",
                distritofederal: persona.adicional.distrito,
                seccion : persona.adicional.seccion,
                calle : persona.adicional.calle,
                next : persona.adicional.noexterior ?persona.adicional.noexterior:0 ,
                nint : persona.adicional.nointerior ?persona.adicional.nointerior:0 ,
                manzana : persona.adicional.manzana,
                lote : "",
                colonia : "",
                cp : "",
                categoria : persona.adicional.categoria
            }

            // console.log(persona)
            

            setPersona(estructura)
            .then((response)=> {
                console.log(response)
                const { error, errorDesc, message } = response.respuesta
                
                if (error == 0)
                {
                    setAdicional(estructuraCompletar)
                    .then(respuestaAdicional=> {
                        console.log(respuestaAdicional)
                    })
                    .catch(errAdicional => {
                        console.log(errAdicional)
                    })

                    console.log("response", response)
                    conta++;
                    this.setState({
                        cantidad: conta+ "/"+ tot,
                        contador: conta
                    })

                    //let respuesta = this.guardarEncuestaEnviada(persona)
                    // console.log("respuesta", respuesta)
                    // let guardo =  guardarEncuestaEnviada(persona)
                    console.log("conta", conta)
                    console.log("tot", tot)
                    if(conta == tot)
                    {
                        this.setState({
                            mensaje:"Registros subidos con éxito",
                            todos: true,
                            backColor : COLORS.secondary,
                            cantidad: conta+ "/"+ tot
                            
                        })
                        // AsyncStorage.removeItem('encuestas');
                    }

                    let datosEnvio = {
                        enviado : true,
                        fecha : Date.now(),
                        id : message,
                        error : ""
                    }

                    let PersonaEstatus = [
                        persona,
                        datosEnvio
                    ]

                    RegistrosParaGuardar.push(PersonaEstatus)
                }
                else
                {
                    this.setState({
                        mensaje:errorDesc,
                        todos: true,
                        backColor : COLORS.secondary,
                        cantidad: conta+ "/"+ tot
                    })
                    // let respuesta = this.guardarEncuestaEnviada(persona)
                    //  AsyncStorage.removeItem('encuestas');

                    console.log(persona)
                    let datosEnvio = {
                        enviado : false,
                        fecha : Date.now(),
                        error : errorDesc,
                        id : "0"
                    }
                    console.log(errorDesc)
                    console.log(datosEnvio)
                    let PersonaEstatus = [
                        persona,
                        datosEnvio
                    ]

                    RegistrosParaGuardar.push(PersonaEstatus)
                }


            })
            .catch(erro => {
                console.log("err", erro)
                this.setState({
                    mensaje:erro,
                    todos: true,
                    backColor : COLORS.primary,
                    //cantidad: conta+ "/"+ tot
                })

                let datosEnvio = {
                    enviado : false,
                    fecha : Date.now(),
                    error : erro,
                    id : "0"
                }

                let PersonaEstatus = [
                    ...persona,
                    datosEnvio
                ]

                RegistrosParaGuardar.push(PersonaEstatus)
            })
        })

    }

     enviarDato () {

        const RegistrosEnviar = this.props.registros 
        let conta = 0
        let tot = this.state.total
        // console.log(RegistrosEnviar) 
        let RegistrosParaGuardar = []
        
      
        

        // if (RegistrosParaGuardar.length>0){
        //     this.guardarEncuestasEnviada(RegistrosParaGuardar)
        // }
    }

    obtenerRegistros () {
        let cont = this.state.contador
        let tot = this.state.total

        console.log("cont", cont)
        console.log("tot", tot)

        // if (cont < tot) {
        //     ++cont;
        //     this.setState({
        //         cantidad: cont+ "/"+ tot,
        //         contador: cont
        //     })
        // }
        // else
        // {
        //     clearInterval(this.watchID)
        //     this.setState({
        //         mensaje:"Registros subidos con éxito",
        //         todos: true,
        //         backColor : COLORS.secondary
        //     })
        // }
    }

    onClick() {
        
    }

    press() {
        this.props.pressCerraModal()
    }



    resetSign() {
       this.props.pressCerraModal();
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
                                            <Text style={{alignItems:"center",justifyContent:"center",textAlign:'center', color:COLORS.white, fontSize: 20, paddingVertical:10,}}>
                                                {this.state.mensaje} 
                                            </Text>
                                            <Text style ={styles.txtMensaje}>{this.state.cantidad}</Text>                                            
                                        </View>
                                            {
                                                this.state.todos ?
                                                <View style={styles.vBotonCancelar}>
                                                            <TouchableOpacity
                                                                style={styles.tBtnSalir}
                                                                onPress={() => this.press()}>
                                                                        <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',width:'100%', paddingHorizontal:10}}>
                                                                            {/* <Text style={styles.txtSalir}>OK</Text> */}
                                                                            <Icon
                                                                                name = {"check-circle"}
                                                                                color = {COLORS.white}
                                                                                size= {40}
                                                                            />
                                                                        </View>
                                                            </TouchableOpacity>
                                                </View>: null
                                            }
                                             {
                                                this.state.errorSinConexion ?
                                                <View style={styles.vBotonCancelar}>
                                                            <TouchableOpacity
                                                                style={styles.tBtnSalir}
                                                                onPress={() => this.press()}>
                                                                        <View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center',width:'100%', paddingHorizontal:10}}>
                                                                            {/* <Text style={styles.txtSalir}>OK</Text> */}
                                                                            <Icon
                                                                                name = {"times-circle"}
                                                                                color = {COLORS.white}
                                                                                size= {40}
                                                                            />
                                                                        </View>
                                                            </TouchableOpacity>
                                                </View>: null
                                            }
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