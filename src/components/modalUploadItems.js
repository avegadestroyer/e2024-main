import React, { Component } from 'react';
import moment from "moment";
import 'moment/locale/es';
import { View, Text, TouchableOpacity, StyleSheet, Modal,  Linking, Share, TouchableHighlight, Alert, ScrollView } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { COLORS, SIZES } from '../constants';
import { setPersona } from '../ws/setPersona';
import { setAdicional } from '../ws/setAdicional'
import Icon from 'react-native-vector-icons/FontAwesome';
import Storage from '../libs/Storage'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ModalUploadItems extends Component {

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
          registrosEstatus :[]
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
                    this.EnviarDatos();
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
    

    subirRegistro = async (persona, estructura, estructuraCompletar) => {
    return await setPersona(estructura)
                .then(async (response)=> {
                        console.log("1")
                        const { error, errorDesc, message } = response.respuesta
                        // return  response;
                        let PersonaEstatus =  {}
                        if (error == 0)
                        {
                            console.log("2")
                            await setAdicional(estructuraCompletar)
                            .then((respuestaAdicional)=> {
                                console.log("5")
                                console.log(respuestaAdicional)
                                const { error, errorDesc, message } = respuestaAdicional.respuesta
                                if (error==0) 
                                {
                                    console.log("8")
                                    PersonaEstatus = {
                                        ...persona,
                                        datosEnvio : {
                                            enviado : true,
                                            fecha : Date.now(),
                                            id : message,
                                            error : ""
                                        }
                                    }
                                    console.log("9", PersonaEstatus)
                                   
                                }
                                else
                                {
                                    console.log("6")
                                    PersonaEstatus = {
                                        ...persona,
                                        datosEnvio :   {
                                            enviado : false,
                                            fecha : Date.now(),
                                            error : message,
                                            id : "0"
                                        }
                                    }
                                    console.log("10",PersonaEstatus)
                                    // return  PersonaEstatus
                                }
                                
                            })
                            .catch(errAdicional => {
                                console.log("7")
                                let datosEnvio = {
                                    enviado : false,
                                    fecha : Date.now(),
                                    error : JSON.stringify(errAdicional),
                                    id : "0"
                                }
                
                                PersonaEstatus = {
                                    ...persona,
                                    datosEnvio
                                }
                
                                // return PersonaEstatus 
                            }) 

                            console.log("5.5$$$$$$$$$$$$$$$$$$$$$$$")   
                            return  PersonaEstatus
                        }
                        else
                        {
                            console.log("3")
                            let datosEnvio = {
                                enviado : false,
                                fecha : Date.now(),
                                error : errorDesc,
                                id : "0"
                            }
            
                            let PersonaEstatus = {
                                ...persona,
                                datosEnvio
                            }
                            console.log("3.5$$$$$$$$$$$$$$$$$$$$$$$") 
            
                            return PersonaEstatus 
                        }
                       
            })
            .catch(erro => {
                console.log("4")
                console.log("err", erro)
                // this.setState({
                //     mensaje:erro,
                //     todos: true,
                //     backColor : COLORS.primary,
                //     //cantidad: conta+ "/"+ tot
                // })

                let datosEnvio = {
                    enviado : false,
                    fecha : Date.now(),
                    error : erro,
                    id : "0"
                }

                let PersonaEstatus = {
                    ...persona,
                    datosEnvio
                }

                return PersonaEstatus 
            })
    }


   EnviarDatos () {
        const RegistrosEnviar = this.props.registros 
        let conta = 1
        let tot = this.state.total
        // console.log(RegistrosEnviar) 
        let RegistrosParaGuardar = []
        let RegistrosParaMostrar = []
        RegistrosEnviar.forEach(async (persona) => {
            // console.log(persona)
            
            let img = persona.imagen!="" ?  persona.imagen.substring(23) :""
            let estructura = {
                userid: persona.userid,
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
                otro:persona.otro
            }

            // console.log(estructura)

            let estructuraCompletar = {
                curp : persona.curp,
                userid: persona.userid,
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
            // console.log(estructura)
            
            let informacionMovimiento = await this.subirRegistro(persona,estructura, estructuraCompletar);
            
            console.log("informacionMovimiento", JSON.stringify(informacionMovimiento))

                RegistrosParaMostrar.push(informacionMovimiento)
    
    
                console.log("informacionMovimiento", informacionMovimiento)
                if (informacionMovimiento.datosEnvio.enviado){
                    RegistrosParaGuardar.push(informacionMovimiento)
                }
    
                // RegistrosParaGuardar.push(informacionMovimiento)
    
                this.setState({
                    cantidad: conta+ "/"+ tot,
                    contador: conta
                })
                
                
                if (conta == RegistrosEnviar.length )
                {
                    console.log(RegistrosParaGuardar)
                    if (RegistrosParaGuardar.length>0){
                        let res = await this.guardarEncuestasEnviada(RegistrosParaGuardar)
                    }
                    // console.log(res)
                    let estatusRegistros= []
                    RegistrosParaMostrar.forEach(reg=>{
                        let registro ={
                            curp :reg.curp,
                            mensaje : reg.datosEnvio.error!="" ? reg.datosEnvio.error: "Enviado"
                        }
    
                        estatusRegistros.push(registro)
                    })
    
                    console.log(estatusRegistros)
                    this.setState({
                        mensaje:"Registros guardados con éxito",
                        todos: true,
                        backColor : COLORS.secondary,
                        cantidad: conta+ "/"+ tot,
                        registrosEstatus : estatusRegistros
                    })
                    // REgresar
                    AsyncStorage.removeItem('encuestas');
                }
            conta ++
        
        })

       

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
                                            

                                            
                                                <ScrollView style={styles.vEstatus}>
                                                        { 
                                                        this.state.registrosEstatus.length>0 ?
                                                            this.state.registrosEstatus.map((item, index) => (
                                                                
                                                                <View style={styles.vEstatusItem}>
                                                                    <Text  style ={styles.txtMensajeEstatus}> {item.curp} </Text>
                                                                    <Text  style ={styles.txtMensajeEstatus}> {item.mensaje} </Text>
                                                                </View>
                                                            ))           
                                                        : null
                                                        }
                                                </ScrollView>
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
            height: '55%',
            alignItems: "center",
            justifyContent:'space-around',
            width: '75%',
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
        },
        txtMensajeEstatus: {
            color: COLORS.white,
            fontSize: 11,
        },
        vEstatus:{
            width:'100%',
            height:50
        },
        vEstatusItem:{
            alignItems:"center",
            justifyContent:"center",
            textAlign:'center', 
            color:COLORS.white, 
            paddingVertical:10, 
            marginVertical:10,
            borderBottomColor: COLORS.white,
            borderBottomWidth:1
        }
});