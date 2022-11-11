import React, { useEffect, useState, useContext, Component, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Switch, Image, Alert,Dimensions, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

import { COLORS, SIZES, images } from '../constants';
import { AuthContext } from '../utils/authContext';
import Storage from '../libs/Storage';
import ButtonMenu from '../components/buttonMenu'
import Header from '../components/header';
import ButtonUpload from '../components/buttonUpload';
import ModalUploadItems from '../components/modalUploadItems';
import Button from '../components/button';
import { getVersion } from '../ws/version';

import { elementsThatOverlapOffsets } from 'react-native/Libraries/Lists/VirtualizeUtils';


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const Home = ({ navigation, route }) => {
    const { signOut } = useContext(AuthContext);
    // const [curp, setCURP] = useState("");
    const [dateNow, setDateNow] = React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [id_usuario, setID] = React.useState('');
    const [registros, setRegistros] = React.useState(0);
    const [personas, setPersonas] = React.useState([])
    const [upload, setUpload] = React.useState(false);
    const [directorioTotal, setDirectorioTotal] = React.useState(0);
    const [directorioAfin, setDirectorioAfin] = React.useState(0);
    const [directorioExplorar, setDirectorioExplorar] = React.useState(0);
    const [directorioPolitico, setDirectorioPolitico] = React.useState(0);
    
    const [espectaculares, setEspectaculares] = React.useState(0);
    const [bardas, setBardas] = React.useState(0);
    const [mantas, setMantas] = React.useState(0);
    const [cartel, setCartel] = React.useState(0);
    const [marcha, setMarcha] = React.useState(0);
    const [afinTestigo, setAfinTestigo] = React.useState(0);
    const [otropartido, setOtroPartido] = React.useState(0);
    const [difamatorio, setDifamatorio] = React.useState(0);
    const [diastrabajo, setDiasTrabajo] = React.useState(0);
    const [versionA, setVersionA] = React.useState("1.0.10")


    const isFocused = useIsFocused();

    async function getEncuestas() 
    {
        const encuestasGuardadas = await Storage.instance.getJson('encuestas');
        if (encuestasGuardadas)
        {
            setRegistros(encuestasGuardadas.length)
            setPersonas(encuestasGuardadas)
        }
        else{
            setRegistros(0)
            setPersonas([])
        }
    }

    async function getDirectorio() 
    {
        const encuestasGuardadas = await Storage.instance.getJson('encuestasEnviadas');
        console.log(encuestasGuardadas)
        if (encuestasGuardadas)
        {
            console.log("encuestasEnviadas", encuestasGuardadas.length)
            
            let afin      = 0
            let explorar  = 0
            let politico  = 0
            encuestasGuardadas.forEach(element => {
                console.log(element.adicional.categoria)
                switch(element.adicional.categoria){
                    case 20:
                        afin++;
                        break;
                    case 21:
                        explorar++;
                        break;
                    case 22:
                        politico++;
                        break;
                    }
                        
                    });
                    setDirectorioTotal(encuestasGuardadas.length)
                    setDirectorioPolitico(politico)
                    setDirectorioExplorar(explorar)
                    setDirectorioAfin(afin)
        }
        else
        {
            setDirectorioTotal(0)
        }
    }
    
    async function getTestigos() 
    {
        const testigosGuardados = await Storage.instance.getJson('testigos');
        if (testigosGuardados)
        {
            // console.log("testigos", JSON.stringify(testigosGuardados))
            
            let espectacularesCons    = 0
            let bardasCons = 0
            let mantasCons = 0
            let cartelCons = 0
            let marchaCons = 0
            
            let afinTestCons =0
            let otroPartidoTestCons =0
            let difamatorioTestCons =0


            testigosGuardados.forEach(element => {

                switch(element.publicidad){
                    case "1":
                        espectacularesCons++;
                        break;
                    case "2":
                        bardasCons++;
                        break;
                    case "3":
                        mantasCons++;
                        break;
                    case "4":
                        cartelCons++;
                        break;
                    case "5":
                        marchaCons++;
                        break;
                }
                    
                switch(element.categoria){
                    case "1":
                        afinTestCons++;
                        break;
                    case "2":
                        otroPartidoTestCons++;
                        break;
                    case "3":
                        difamatorioTestCons++;
                        break;
                }
                   
            });

            
            setEspectaculares(espectacularesCons)
            setBardas(bardasCons)
            setMantas(mantasCons)
            setCartel(cartelCons)
            setMarcha(marchaCons)
            setAfinTestigo(afinTestCons)
            setOtroPartido(otroPartidoTestCons)
            setDifamatorio(difamatorioTestCons)
        }
        else
        {
            
        }
    }
    
    
    async function getInfo() 
    {
        const stored = await Storage.instance.getJson('userInfo');
        if (stored) {

            const { informacion } = stored;
            console.log("informacion", informacion)
            setID("ID "+ informacion.id_usuario)
            setNombre(informacion.nombre)

            
        }   
    }

    useEffect(() => {

        getVersion()
        .then(resp=>{
            const { respuesta } = resp
            console.log("version", respuesta.version)
            if (respuesta.version!=versionA) {
                Alert.alert(
                    "Versión aplicación",
                    "La versión de la aplicación esta desactualizada, favor de actualizar la aplicación para continuar",
                    [
                      { text: "OK", onPress: () =>{
                        let emailAddress="";
                        let password="";
                        signOut({emailAddress, password })
                      } }
                    ]
                  );
            }
        })

        getInfo()
     
        // setDirectorioPolitico(0)
        // setDirectorioExplorar(0)
        // setDirectorioAfin(0)
        getEncuestas()
        
        let today = new Date().toISOString().slice(0, 10)
        setDateNow(today)
        getDirectorio();
        getTestigos()
    }, [])

   
    useEffect(() => {
        //    console.log("isFocused", isFocused)
           if (isFocused)
           {
                getEncuestas()  
                getDirectorio();
                getTestigos()
           }
    }, [isFocused])
    
    const _backHome = async() => 
    {  
        getEncuestas()
        getDirectorio();
        getTestigos()
        setUpload(false)
    }

   

    const uploadPhoto = () => {
        setVisiblePerfil(true)
    }

    const _backHomePerfil = () => {
        setVisiblePerfil(false)
    }

    const _recargarPerfil =async (foto) => {
       
    }

    function llamarSoporte(url){
       
    }

    const agregarContacto = () => {
        navigation.navigate("AgregarContactoScreen", {});
    }

    const directorio = () => {
        navigation.navigate("DirectorioScreen", {});
    }

    const testigo = () => {
        navigation.navigate("MapaScreen", {});
        // navigation.navigate("TestigoScreen", {});
    }

    const closeSession = () => {
      let emailAddress="";
      let password="";
      signOut({emailAddress, password })
    }

    const uploadItems = () => {
        // navigation.navigate("AgregarContactoScreen", {});
        setUpload(true)
    }

    return (
         <View View style = {styles.container} >  
                {   upload ?
                    <ModalUploadItems visible={upload} pressCerraModal={_backHome} registros={personas}  cantidad={registros}/>
                    :null
                }
                <View style={styles.vHeadImages}>
                    <Image source={images.logoApp} style={styles.iHeader}/>
                </View >
                <Header id_usuario={id_usuario} nombre={nombre}/>
                <ScrollView style={styles.vContainer} contentContainerStyle={{ alignItems:'center', justifyContent: 'center' }} >
                    {
                        registros> 0 ?
                            <ButtonUpload name={"Subir registros"} color={COLORS.primary} textColor={COLORS.white} handleTouch={uploadItems} cantidad={registros} />
                        :null
                    }
                    {/* <ButtonMenu  icon={"check-circle"}  name={"Agregar contacto"} color={COLORS.secondary} textColor={COLORS.white} handleTouch={agregarContacto} image={images.trabajo} /> */}
                    <ButtonMenu  icon={"arrow-up"}  name={"Directorio"} color={COLORS.primary} textColor={COLORS.white} handleTouch={directorio}  image={images.directorio}/>
                    <View style={styles.vMetas}>
                        <View style={styles.vHeaderMetas}>
                            <Text style={styles.txtHeaderMetas}>DIRECTORIO</Text>
                        </View>
                        <View style={styles.RegistradasMetas}>
                            <View style={[styles.vDato,{ borderBottomWidth:1, borderBottomColor:COLORS.white}]}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Personas registradas</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{directorioTotal}</Text>
                                </View>
                            </View>
                            <View style={styles.vDato}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Afín</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{directorioAfin}</Text>
                                </View>
                            </View>
                            <View style={styles.vDato}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Explorar</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{directorioExplorar}</Text>
                                </View>
                            </View>
                            <View style={styles.vDato}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Actor Político</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{directorioPolitico}</Text>
                                </View>
                            </View>
                            <View style={[styles.vDato,{ borderTopWidth:1, borderTopColor:COLORS.white}]}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Personas registradas</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{directorioTotal}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <ButtonMenu  icon={"arrow-up"}  name={"Testigo"} color={COLORS.yellow} textColor={COLORS.white} handleTouch={testigo}  image={images.espectucular}/>

                    <View style={[styles.vMetas,{height:450}]}>
                        <View style={styles.vHeaderMetas}>
                            <Text style={styles.txtHeaderMetas}>REGISTROS</Text>
                        </View>
                        <View style={styles.RegistradasMetas}>
                            <View style={styles.vDatoTestigo}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Espectaculares</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{espectaculares}</Text>
                                </View>
                            </View>
                            <View style={styles.vDatoTestigo}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Bardas</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{bardas}</Text>
                                </View>
                            </View>
                            <View style={styles.vDatoTestigo}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Manta/Lona</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{mantas}</Text>
                                </View>
                            </View>
                            <View style={styles.vDatoTestigo}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Cartel o Poster</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{cartel}</Text>
                                </View>
                            </View>
                            <View style={styles.vDatoTestigo}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Marcha o Manifestación</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{marcha}</Text>
                                </View>
                            </View>

                            {/* <View style={[styles.vDatoTestigo, {borderTopWidth:1, borderTopColor:COLORS.white, marginTop:10}]}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Afín</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{afinTestigo}</Text>
                                </View>
                            </View>
                            <View style={styles.vDatoTestigo}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Otro Partido</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{otropartido}</Text>
                                </View>
                            </View>
                            <View style={styles.vDatoTestigo}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Difamatorio</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{difamatorio}</Text>
                                </View>
                            </View> */}

                            <View style={[styles.vDato, {borderTopWidth:1, borderTopColor:COLORS.white, marginTop:10}]}>
                                <View style={styles.vTituloMetas}>
                                    <Text style={styles.txtMetas}>Días de trabajo efectivo</Text>
                                </View>
                                <View style={styles.vDetalleMetas}>
                                    <Text style={styles.txtMetas}>{diastrabajo}</Text>
                                </View>
                            </View>
                            
                        </View>
                    </View>
                    {/* <ButtonMenu  icon={"caret-down"}  name={"Cerrar sesión"} color={COLORS.primary} textColor={COLORS.white} handleTouch={closeSession} /> */}
                   
                    <Button  name={"Cerrar sesión"} color={COLORS.primary} textColor={COLORS.white} handleTouch={closeSession} />

                </ScrollView>
               
         </View>
    );
  
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.backColor,
        // justifyContent:'space-around',
        alignItems:'center'
    },
    vHeadImages: {
        height:100,
        width : '100%',
        marginVertical : 10,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        // paddingLeft:30,
        // backgroundColor:'purple'

    },
    txtAtencion:{
        color:COLORS.primary,
        fontSize: 16
    },
    iHeader:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
    vHeader : {
        height: 100,
        width : '95%',
        paddingHorizontal : 10,
        // backgroundColor: COLORS.gray,
        marginVertical : 10,
        borderRadius: SIZES.radius,
        // alignItems:'center',
        justifyContent: 'center',
        marginHorizontal : 20
    },
    vContainer: {
      flex:1,
      backgroundColor:COLORS.backColor,
      width:'100%'
     },
     vMetas:{
         width:'80%',
         height:250,
         borderRadius:10,
         backgroundColor: COLORS.lightgray,
        marginVertical:20,
        color: COLORS.black
     },
     vHeaderMetas:{
         height:'15%',
         width:'100%',
         flexDirection:'row',
         alignItems:'center',
         justifyContent:'center',
         borderBottomWidth:1,
         borderBottomColor:COLORS.white
     },
     RegistradasMetas:{
        height:'85%',
        width:'100%',
        justifyContent:'center'
     },
     txtHeaderMetas :{
         color: COLORS.black,
         fontWeight:'bold',
         fontSize:18
     },
     vDato :{
         width:'100%',
         height:'15%',
         flexDirection:'row',
         justifyContent:'space-around',
         alignItems:'center'
     },
     vDatoTestigo :{
         width:'100%',
         height:'14%',
         flexDirection:'row',
         justifyContent:'space-around',
         alignItems:'center'
     },
     vTituloMetas:{
        width:'70%',
        height:'100%',
        paddingHorizontal:30,
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'purple'
     },
     vDetalleMetas:{
        width:'30%',
        height:'100%',
        // paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
     },
     txtMetas:{
         color:COLORS.gray,
         fontWeight:'500',
         fontSize:15
     }
})

export default Home;