import React, { useEffect, useState, useContext, Component, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Switch, Image, Alert,Dimensions, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { COLORS, SIZES, images } from '../../constants';
import { AuthContext } from '../../utils/authContext';
import Storage from '../../libs/Storage'
import Input from '../../components/input';
import Button from '../../components/button';
import Header from '../../components/header';
import Title from '../../components/title';
import entidades from '../../../assets/json/entidades.json'
import Municipios from '../../libs/Localizacion/municipios'
import Distritos from '../../libs/Localizacion/distritos'
import Secciones from '../../libs/Localizacion/secciones'
import  curp  from '../../libs/curp'
import moment from 'moment';
import ModalLoading from '../../components/modalLoading';



const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const DetalleContactoScreen = ({ navigation, route }) => {
    const { signOut } = useContext(AuthContext);
    const [curpS, setCURP] = useState("");
    const [dateNow, setDateNow] = React.useState('');
    const [folio, setFolio] = React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [id_usuario, setID] = React.useState('');
    
    const [nombreRegistro, setNombreRegistro] = React.useState("");
    const [primerAp, setPrimerAp] = React.useState("");
    const [segundoAp, setSegundoAp] = React.useState("");
    const [seccion, setSeccion] = React.useState("");
    const [genero, setGenero] = React.useState("");
    const [generoDesc, setGeneroDesc] = React.useState("");
    const [lugarNacimiento, setLugarNacimiento] = React.useState("")
    const [lugarNacimientoDesc, setLugarNacimientoDesc] = React.useState("")
    const [lugarNacimientoClave, setLugarNacimientoClave] = React.useState("")
    const [estadoNacimiento, setEstadoNacimiento] = React.useState("")
    const [estadoNacimientoDesc, setEstadoNacimientoDesc] = React.useState("")
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState("");
    const [dateStringDMY, setDateStringDMY] = useState("");
    const [dateStringCURP, setDateStringCURP] = useState("");
    const [show, setShow] = useState(false);
    const [generosPicker, setGenerosPicker] = useState([])
    const [entidadesPicker, setEntidadesPicker] = useState([])
    const [responsabilidadesPicker, setResponsabilidades] = useState([])
    const [responsabilidad, setResponsabilidad] = useState(0)
    const [responsabilidadSelecionada, setResponsabilidadSelecionada] = useState(0)
    const [mensajeCURP, setMensajeCURP] = useState("")
    const [curpValidaState, setcurpValida] = useState(false)
    const [cargo, setCargo] = React.useState("");
    const [cargoDesc, setCargoDesc] = React.useState("");
    const [cargosPicker, setCargosPicker] = useState([])
    const [ine, setINE] = React.useState(false);
    const [key, setKey] = React.useState(0);
    const [visibleLoading, setVisibleLoading] = React.useState(true)
    const [otro, setOtro] = React.useState("")


    const [estadoResidencia, setEstadoResidencia] = React.useState("");
    const [estadoResidenciaDesc, setEstadoResidenciaDesc] = React.useState("")
    const [municipio, setMunicipio] = React.useState("");
    const [municipioDesc, setMunicipioDesc] = React.useState("")
    const [distrito, setDistrito] = React.useState("");
    const [distritoDesc, setDistritoDesc] = React.useState("")
    const [seccionDesc,setSeccionDesc] = React.useState("")

    const [municipiosPicker, setMunicipiosPicker] = useState([])
    const [distritosPicker, setDistritosPicker] = useState([])
    const [seccionPicker, setSeccionPicker] = useState([])
    
    const [visibleDistrito, setVisibleDistrito] = useState(false)
    const [visibleMunicipio, setVisibleMunicipio] = useState(false)
    const [visibleSeccion, setVisibleSeccion] = useState(false)

    const [cargoResponsabilidad,setCargoResponsabilidad] = useState(false)
    const [cargoEntidades,setCargoEntidades] = useState(false)
    const [cargoMunicipios, setCargoMunicipios] = useState(false)


    useEffect(() => {
        async function getInfo() 
        {
            const stored = await Storage.instance.getJson('userInfo');
            if (stored) {

                const { informacion } = stored;
                setID("Usuario "+ informacion.id_usuario)
                setNombre(informacion.nombre)
            }
        }
        getInfo()
        let today = new Date().toISOString().slice(0, 10)
        setDateNow(today)
        cargarGenero()
    }, [])

    const pickImage = () => {
        Alert.alert(
            "Imagen",
            "Seleccione una opción",
            [{
                    text: "Camara",
                    onPress: () => {
                        const options = {
                            includeBase64: true,
                            quality: 0.2,
                            storageOptions: {
                                skipBackup: true,
                                path: 'images',
                            },
                            maxWidth:320
                        };
                        try
                        {
                            launchCamera(options, (response) => {
                                // console.log(response)
                                const source = {
                                    uri: 'data:image/jpeg;base64,' + response.assets[0].base64
                                };
                                setINE(source.uri)
                            })
                        }
                        catch(ex)
                        {
                            console.log(ex)
                        }

                    },
                    style: "cancel"
                },
                {
                    text: "Desde la librería",
                    onPress: () => {
                        const options = {
                            includeBase64: true,
                            quality: 0.2,
                            storageOptions: {
                                skipBackup: true,
                                path: 'images',
                            },
                            maxWidth:320
                        };

                        try 
                        {
                            launchImageLibrary(options, (response) => {
                                const source = {
                                    uri: 'data:image/jpeg;base64,' + response.assets[0].base64
                                };
                                setINE(source.uri)
                            })
                        }
                        catch(ex)
                        {
                            console.log(ex)
                        }

                    },
                    style: "cancel"
                }
            ], {
                cancelable: false
            })
    }

    const showDatepicker = () => {
        setShow(true);
    };

    const onChange = (event, selectedDate) => {
        if (selectedDate) 
        {
            setShow(Platform.OS === 'ios');
            const currentDate = selectedDate || state.date;
            let undiaMenos = currentDate;
            let fechaDiaMenos = new Date (undiaMenos);
            setDate(fechaDiaMenos);
            const options = {  year: 'numeric', month: '2-digits', day: 'numeric' };
            options.timeZone = 'UTC';
            options.timeZoneName = 'short';
            // let datetext = fechaDiaMenos.toDateString('es-MX', options); jala
            let anio = fechaDiaMenos.getFullYear();
            let mes = fechaDiaMenos.getMonth()+ 1>9 ? fechaDiaMenos.getMonth()+ 1: "0"+(fechaDiaMenos.getMonth()+ 1);
            let dia =  fechaDiaMenos.getDate() > 9 ? fechaDiaMenos.getDate() : "0"+ fechaDiaMenos.getDate();
            let datetextDDMMYY = dia +"/" +(mes)+"/"+ anio
            let datetextG = dia +"-" +(mes)+"-"+ anio
            let datetext = anio +"/" +(mes)+"/"+ dia
            
          //   setDateStringCURP(moment(currentDate).format('YYMMDD'))
            setDateStringCURP(datetextG)
            setDateString (datetext)
            setDateStringDMY(datetextDDMMYY)
            preCURP(nombreRegistro, primerAp, segundoAp,datetextG, generoDesc, lugarNacimientoClave);
        }
      
    };

    useEffect(() => {
        const { persona } = route.params       
        setEstadoResidencia(persona.estadoResidencia)
        setEstadoResidenciaDesc(persona.estadoResidenciaDesc)
    }, [cargoEntidades])

   

    const cargarGenero = () => {
    
        let detalleGenero = [
            {
                key: "",
                genero: "Selecciona un genero"
            },{
                key: "23",
                genero: "HOMBRE"
            },{
                key: "24",
                genero: "MUJER"
            },
        ]
        setGenerosPicker(detalleGenero)
        
        let catalogo_entidades = entidades;
        let detalleEntidad = [{
            key: "",
            entidad: "Selecciona una entidad"
        }]

        catalogo_entidades.forEach(element => {
            let registro = {
                key: element.catdetid,
                entidad: element.catdetname,
                clave : element.catdetkey
            }
            detalleEntidad.push(registro)
        });

        setEntidadesPicker(detalleEntidad)


        let detalleInicial= [
            {
                key:"1",
                responsabilidad: "ESTADO",
                activo: false
            },{
                key:"2",
                responsabilidad: "MUNICIPIO",
                activo: false
            },{
                key:"3",
                responsabilidad: "DISTRITO LOCAL",
                activo: false
            },{
                key:"4",
                responsabilidad: "DISTRITO FEDERAL",
                activo: false
            },{
                key:"60",
                responsabilidad: "SECCIÓN",
                activo: false
            },
        ] ;
        
        
        

        const { persona } = route.params
        
        setEstadoResidencia(persona.estadoResidencia)
        setEstadoNacimientoDesc(persona.estadoResidenciaDesc)

        let detalleResponsabilidad = []
        console.log(persona)
        detalleInicial.forEach(element => {
            let activo = false;

            if (element.key  == persona.responsabilidad)
            {
                activo = true;
                setResponsabilidadSelecionada(element.responsabilidadDesc)
                setResponsabilidad(element.responsabilidad)
                cargarPuestos(element.responsabilidad)
            }

            let registro = {
                key: element.key,
                responsabilidad: element.responsabilidad,
                activo
            }
            detalleResponsabilidad.push(registro)
        });


        setResponsabilidades(detalleResponsabilidad)
        setCargoResponsabilidad(true)       
        setVisibleLoading(false)
        press(persona.responsabilidad)

        setVisibleLoading(true)
        setMunicipiosPicker([])
        setDistritosPicker([])
        setSeccionPicker([])
         
        let ListaMunicipios = []
        ListaMunicipios = Municipios.instance.getMunicipios(persona.estadoResidenciaDesc);
       
        
        let detalleMunicipio = [{
            key: "",
            municipio: "Selecciona un municipio"
        }]

        ListaMunicipios.forEach(element => {
                let registro = {
                    key: element.municipioid,
                    municipio: element.municipio
                }
                detalleMunicipio.push(registro)
        });

        setMunicipiosPicker(detalleMunicipio)
        precargaInformacion(persona);
        setMunicipio(persona.municipioResidencia)
        setMunicipioDesc(persona.municipioResidenciaDesc)
    }


    const precargaInformacion = async (persona) => {
        setKey(persona.key)
        setCURP (persona.curp)
        setNombreRegistro(persona.nombre)
        setPrimerAp(persona.primerap)
        setSegundoAp(persona.segundoap)
        setGenero(persona.genero)
        setLugarNacimiento(persona.lugarNacimiento)
        
        setCargoDesc(persona.cargoDesc)
        setGeneroDesc(persona.generoDesc)
        setLugarNacimientoDesc(persona.lugarNacimientoDesc)
        setResponsabilidadSelecionada(persona.responsabilidadDesc)
        // setResponsabilidad(persona.responsabilidad)
        setCargo(persona.cargo)
        setINE(persona.perfil)
        setDateStringDMY(persona.fechaNacimiento)
        // setDate(persona.dateString)
        setcurpValida(true)
        setDateString(persona.dateString)
        cargarPuestos(persona.responsabilidadDesc)
        cargarMunicipios(persona.estadoResidenciaDesc) 

        let estatus = await cargarDistritos(persona.estadoResidenciaDesc, persona.municipioResidenciaDesc)
        console.log("persona.seccionResidencia", persona.seccionResidencia)
        console.log("distritos ?? ", estatus)
        setSeccion(persona.seccionResidencia)
    }

    
    

    const cargarMunicipios = (estado) => {       
        // setMunicipiosPicker([])
        console.log("estado", estado)
        setVisibleLoading(true)
        setMunicipiosPicker([])
        setDistritosPicker([])
        setSeccionPicker([])
         
        let ListaMunicipios = []
        ListaMunicipios = Municipios.instance.getMunicipios(estado);
       
        console.log("ListaMunicipios", ListaMunicipios)
        let detalleMunicipio = [{
            key: "",
            municipio: "Selecciona un municipio"
        }]

        ListaMunicipios.forEach(element => {
                let registro = {
                    key: element.municipioid,
                    municipio: element.municipio
                }
                detalleMunicipio.push(registro)
        });

        setMunicipiosPicker(detalleMunicipio)
        setVisibleLoading(false)
        
    }

   

    const cargarDistritos = async (estado, municipio) => {
        
        console.log("cargarDistritos")
        setVisibleLoading(true)
        setDistritosPicker([])
        setSeccionPicker([])
        let ListaDistritos = []
        console.log("responsabilida", responsabilidad)
        console.log("estado", estado)
        console.log("municipio", municipio)
        if (responsabilidad=="3")
        {
            ListaDistritos= await Distritos.instance.getDistritosLocal(estado, municipio);
        }
        else
        {
            ListaDistritos= await Distritos.instance.getDistritosFederal(estado, municipio);
        }
        console.log(ListaDistritos)

        setDistritosPicker(ListaDistritos)
        setVisibleLoading(false)
        if (ListaDistritos.length==1)
        {
            setVisibleLoading(true)
            setDistrito(ListaDistritos[0].distfedid)
            setDistritoDesc(ListaDistritos[0].distrito)
            console.log("Cargo distritos- cargando secciones")
            let status = await cargarSecciones(ListaDistritos[0].entidad, ListaDistritos[0].municipio, ListaDistritos[0].distrito)  
            return status;     
        }
        else
        {
            setVisibleLoading(false)
        }

        return true;
    }

    const cargarSecciones = async (estado, municipio , distrito) => {
        setVisibleLoading(true)
        setSeccionPicker([])

        

        let ListaSecciones = []
        ListaSecciones = await Secciones.instance.getSecciones(estado, municipio, distrito);
        
     
        setSeccionPicker(ListaSecciones)
        setVisibleLoading(false)

        if (ListaSecciones.length> 1)
        {
            setSeccion(ListaSecciones[0].seccionid)
            setSeccionDesc(ListaSecciones[0].seccion)
        }
        console.log("Cargo secciones")
        return true;
        
    }

    const press = (seleccion) => {
        console.log("seleccion",seleccion)
        setResponsabilidad(seleccion)
        switch(seleccion)
        {
            case "1": 
                setVisibleMunicipio(false)    
                setVisibleDistrito(false)
                setVisibleSeccion(false)
                setMunicipiosPicker([])
                setSeccionPicker([])
                setDistritosPicker([])
                console.log("estado")
                break;
            case "2": 
                setVisibleMunicipio(true)    
                setVisibleDistrito(false)
                setVisibleSeccion(false)
                setSeccionPicker([])
                setDistritosPicker([])
                console.log("municiopi")
                if (estadoResidenciaDesc!="")
                    cargarMunicipios(estadoResidenciaDesc)
                break;
            case "3": 
                setVisibleMunicipio(true)    
                setVisibleDistrito(true)
                setVisibleSeccion(true)
                setSeccionPicker([])
                setDistritosPicker([])
                console.log("local")
                console.log("estadoResidenciaDesc", estadoResidenciaDesc)
                console.log("municipioDesc", municipioDesc)
                if (estadoResidenciaDesc!="" && municipioDesc!="")
                {
                    cargarDistritos(estadoResidenciaDesc,municipioDesc )
                }
                    break;
            case "4": 
                setVisibleMunicipio(true)    
                setVisibleDistrito(true)
                setVisibleSeccion(true)
                setSeccionPicker([])
                setDistritosPicker([])
                console.log("federak")
                console.log("estadoResidenciaDesc", estadoResidenciaDesc)
                console.log("municipioDesc", municipioDesc)
                if (estadoResidenciaDesc!="" && municipioDesc!=""){
                    cargarDistritos(estadoResidenciaDesc,municipioDesc )
                    }
                    break;
            case "60": 
                {   
                    console.log("estadoResidenciaDesc", estadoResidenciaDesc)
                    console.log("municipioDesc", municipioDesc)
                    setVisibleMunicipio(true)    
                    setVisibleDistrito(true)
                    setVisibleSeccion(true)
                    setSeccionPicker([])
                    setDistritosPicker([])
                    console.log("seccion")
                    if (estadoResidenciaDesc!="" && municipioDesc!="")
                    {
                        console.log("estadoResidenciaDesc", estadoResidenciaDesc)
                        console.log("municipioDesc", municipioDesc)
                        cargarDistritos(estadoResidenciaDesc,municipioDesc)
                    }
                    break;
                }
        }  

       
    }


    const marcarResponsabilidad = (seleccion) => {
         let detalleResponsabilidad = []
        setResponsabilidad(seleccion)
        responsabilidadesPicker.forEach(element => {
            let activo = false;

            if (element.key  == seleccion)
            {
                activo = true;
                setResponsabilidadSelecionada(element.responsabilidad)
                cargarPuestos(element.responsabilidad)
            }

            let registro = {
                key: element.key,
                responsabilidad: element.responsabilidad,
                activo
            }
            detalleResponsabilidad.push(registro)
        });
        setResponsabilidades(detalleResponsabilidad); 
    }
    

    const cargarPuestos = (filtro) => {

        let detalleCargo = []
        switch(filtro)
        {
            case "ESTADO":
                detalleCargo= 
                [
                    {
                        key: "",
                        cargo: "Selecciona un cargo"
                    },{
                        key: "5",
                        cargo: "GOBERNADOR"
                    },{
                        key: "6",
                        cargo: "SENADOR"
                    },{
                        key: "8",
                        cargo: "DIPUTADO FEDERAL"
                    },{
                        key: "57",
                        cargo: "OTRO"
                    },
                ]
                break;
            case "MUNICIPIO":
                    detalleCargo= 
                    [
                        {
                            key: "",
                            cargo: "Selecciona un cargo"
                        },{
                            key: "7",
                            cargo: "PRESIDENTE MUNICIPAL"
                        },{
                            key: "9",
                            cargo: "SÍNDICO"
                        },{
                            key: "10",
                            cargo: "REGIDOR"
                        },{
                            key: "11",
                            cargo: "DIPUTADO LOCAL"
                        },{
                            key: "58",
                            cargo: "OTRO"
                        },
                    ]
                    break;
            case "DISTRITO LOCAL":
                    detalleCargo= 
                    [
                        {
                            key: "",
                            cargo: "Selecciona un cargo"
                        },{
                            key: "11",
                            cargo: "DIPUTADO LOCAL"
                        },{
                            key: "12",
                            cargo: "LÍDER"
                        },{
                            key: "13",
                            cargo: "REPRESENTANTE DE PARTIDO"
                        },{
                            key: "14",
                            cargo: "OTRO"
                        },
                    ]
                    break;
            case "DISTRITO FEDERAL":
                        detalleCargo= 
                        [
                            {
                                key: "",
                                cargo: "Selecciona un cargo"
                            },{
                                key: "8",
                                cargo: "DIPUTADO FEDERAL"
                            },{
                                key: "12",
                                cargo: "LÍDER"
                            },{
                                key: "13",
                                cargo: "REPRESENTANTE DE PARTIDO"
                            },{
                                key: "14",
                                cargo: "OTRO"
                            },
                        ]
                        break;
            case "SECCIÓN":
                            detalleCargo= 
                            [
                                {
                                    key: "",
                                    cargo: "Selecciona un cargo"
                                },{
                                    key: "12",
                                    cargo: "LÍDER"
                                },{
                                    key: "13",
                                    cargo: "REPRESENTANTE DE PARTIDO"
                                },{
                                    key: "59",
                                    cargo: "OTRO"
                                },
                            ]
                            break;
        }
        setCargosPicker(detalleCargo)
    }

    const handleSignIn = () => {
        
        const { persona } = route.params
        let valido = true;
        
        console.log(responsabilidad)
        // if ( responsabilidad > 0 && nombreRegistro!="" && primerAp !="" && genero!="" && lugarNacimiento!="" && dateString!="" && cargo!="" )
        if (  nombreRegistro!="" && primerAp !="" && genero!="" && lugarNacimiento!="" && dateString!="" )
        {  
            // switch(responsabilidad) {
            //     case "1" :
            //         {
            //             if (estadoResidencia== "")
            //                 valido= false
            //             break;
            //         }
            //     case "2" :
            //         {
            //             if (estadoResidencia== "" || municipio=="")
            //                 valido= false
            //             break;
            //         }
            //         case "3" :
            //         {
            //             if (estadoResidencia== "" || municipio=="" || distrito=="")
            //                 valido= false
            //             break;
            //         }
            //         case "4" :
            //         {
            //             if (estadoResidencia== "" || municipio=="" || distrito=="")
            //                 valido= false
            //             break;
            //         }
            //         case "60" :
            //         {
            //             if (estadoResidencia== "" || municipio=="" || distrito=="" || seccion=="")
            //                 valido= false
            //             break;
            //         }
            // }
        } 
        else
        {
            valido= false;
        }
        if ( valido )
        {
            const PersonaNuevosDatos = {
                key : key,
                curp: curpS,
                nombre: nombreRegistro,
                primerap: primerAp,
                segundoap: segundoAp,
                genero: genero,
                generoDesc: generoDesc,
                lugarnacimiento: lugarNacimiento,
                lugarNacimientoDesc, 
                claveelector: "",
                responsabilidad : responsabilidad,
                responsabilidadDesc: responsabilidadSelecionada,
                fechaNacimiento : dateString,  
                cargo,
                cargoDesc,
                imagen:ine,
                estadoResidencia,
                estadoResidenciaDesc,
                municipio,
                municipioDesc,
                distrito,
                distritoDesc,
                seccionDesc,
                seccion,
                dateString,
                distritolocal : distrito,
                distritodeferal : distrito,
                otro
            }
    
            console.log(PersonaNuevosDatos)
            const { persona } = route.params
            navigation.navigate("DetalleDatosContacto", {PersonaNuevosDatos, persona});
        }
        else{
            Alert.alert("Información", "Complete los campos obligatorios marcados")
        }
    }

    const preCURP = (nomb, pAp, sAp, fec, gen,lug) => {
        
        if (nomb.length>3 && pAp.length>3  && sAp.length>3 && fec!="" &&  gen!="" && lug!="" ){


            let generoDef = gen == "HOMBRE" ? "H" : "M"
            
            
            let persona =  curp.getPersona();
            persona.apellidoMaterno = sAp;
            persona.apellidoPaterno = pAp;
            persona.estado          = lug.replace(/\s/g, '_');
            persona.fechaNacimiento = fec;
            persona.genero          = generoDef;
            persona.nombre          = nomb;
    
            let curpGenerada =  curp.generar(persona);
            // console.log("curpGenerada",curpGenerada)
            setCURP (curpGenerada)
            if (curpGenerada.length==18)
                setcurpValida(true)
        }
    }

    return (
         <View View style = {styles.container} >  
                <Header id_usuario={id_usuario} nombre={nombre} />
                  
                <ScrollView style={styles.vContainer}  contentContainerStyle={{ alignItems:'center', justifyContent: 'center' }}>
                        <Title titulo={"IDENTIFICACIÓN"} />  
                        <View style={styles.vResponsabilidad}>
                            <Text style={styles.txtResponsabilidad}>Responsabilidad *</Text>
                            <Text style={styles.txtResponsabilidad}>ID:  {municipiosPicker.length}</Text>
                        </View>
                        {/* {
                            responsabilidadesPicker.length>0 ?
                                <View style={styles.vRadios}>
                                {                       
                                        responsabilidadesPicker.map((item, index) => (
                                            // <TouchableOpacity style={styles.radioButton} onPress= { () => {press(item.key); marcarResponsabilidad(item.key);}}>
                                                <View style={styles.radioButton} >

                                                    {!item.activo?
                                                    <Icon
                                                        name = {"circle-o"}
                                                        color = {COLORS.secondary}
                                                        size= {20}
                                                    />:
                                                    <Icon
                                                        name = {"circle"}
                                                        color = {COLORS.secondary}
                                                        size= {20}
                                                    />}
                                                    <Text style={styles.txtRadio}>{item.responsabilidad} </Text>
                                                </View>
                                                
                                            // </TouchableOpacity>
                                            // console.log("item",item)
                                        ))
                                }
                                
                                </View>  
                            :null
                        } */}

                        <View style={{width:'80%'}}>

                            {/* <Input 
                                onChangeText={text => { setNombreRegistro(text);  preCURP(text, primerAp, segundoAp, dateStringCURP, generoDesc, lugarNacimientoClave)  }}
                                value={nombreRegistro}
                                placeholder = "Ingrese el nombre"
                                titulo = "Nombre *"
                                color   = {COLORS.trasparent}
                                colorFont  = {COLORS.gray}
                                placeholderColor = {COLORS.lightgray}
                                autoCapitalize="characters"
                                // maxLength={18}
                                // autoCapitalize="characters"
                            /> */}
                            <View style={styles.vInformacion}>
                                <Text style={styles.txtTitulo}>
                                    {"Nombre"}
                                </Text >
                                <Text style={styles.txtInformacion}> 
                                    {nombreRegistro}
                                </Text>
                            </View>

                            {/* <Input 
                                onChangeText={text => {setPrimerAp(text);  preCURP(nombreRegistro, text, segundoAp, dateStringCURP, generoDesc, lugarNacimientoClave) }}
                                value={primerAp}
                                placeholder = "Ingrese el primer"
                                titulo = "Primer apellido *"
                                color   = {COLORS.trasparent}
                                colorFont  = {COLORS.gray}
                                placeholderColor = {COLORS.lightgray}
                                autoCapitalize="characters"
                                // maxLength={18}
                                // autoCapitalize="characters"
                            /> */}
                            <View style={styles.vInformacion}>
                                <Text style={styles.txtTitulo}>
                                    {"Primer apellido"}
                                </Text >
                                <Text style={styles.txtInformacion}> 
                                    {primerAp}
                                </Text>
                            </View>

                            {/* <Input 
                                onChangeText={text => {setSegundoAp(text);  preCURP(nombreRegistro, primerAp, text, dateStringCURP, generoDesc, lugarNacimientoClave);}}
                                value={segundoAp}
                                placeholder = "Ingrese el segundo apellido"
                                titulo = "Segundo apellido *"
                                color   = {COLORS.trasparent}
                                colorFont  = {COLORS.gray}
                                placeholderColor = {COLORS.lightgray}
                                autoCapitalize="characters"
                                // maxLength={18}
                                // autoCapitalize="characters"
                            /> */}
                            <View style={styles.vInformacion}>
                                <Text style={styles.txtTitulo}>
                                    {"Segundo apellido"}
                                </Text >
                                <Text style={styles.txtInformacion}> 
                                    {segundoAp}
                                </Text>
                            </View>

                            {/* <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Género *</Text>
                                        </View>
                                        <Picker
                                            selectedValue={genero}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>
                                                {

                                                    setGenero(itemValue)
                                                    let registro = generosPicker.find(x => x.key == itemValue);
                                                    if (registro) {
                                                        setGeneroDesc(registro.genero);
                                                        preCURP(nombreRegistro, primerAp, segundoAp, dateStringCURP, registro.genero, lugarNacimientoClave);
                                                    }

                                                }
                                            }>
                                            
                                            {  
                                                generosPicker.map((item, index) => (
                                                    <Picker.Item key={item.key} value={item.key} label={item.genero}/>
                                                ))
                                            }
                                        </Picker>
                                </View> */}
                                {/* <View style={styles.vInformacion}>
                                    <Text style={styles.txtTitulo}>
                                        {"Género"}
                                    </Text >
                                    <Text style={styles.txtInformacion}> 
                                        {generoDesc}
                                    </Text>
                                </View> */}

                                {/* <View style={styles.vTitulo}>
                                    <Text style={styles.titleInputText}>Fecha de nacimiento*</Text>
                                </View>
                                <View style={styles.vPickerDate}>
                                            <TouchableOpacity
                                                    style={styles.tBtnDate}
                                                    onPress={() => showDatepicker()}>
                                                    <View style={styles.vIconCallout}>
                                                        
                                                        <Icon
                                                            name = {"calendar"}
                                                            color = {COLORS.white}
                                                            size= {15}
                                                        />
                                                    </View>
                                            </TouchableOpacity>
                                    <View style={styles.vDetalle}>
                                        <Text style={styles.txtDetalle}>{dateStringDMY}</Text>
                                    </View>
                                </View> */}
                                <View style={styles.vInformacion}>
                                    <Text style={styles.txtTitulo}>
                                        {"Fecha de nacimiento"}
                                    </Text >
                                    <Text style={styles.txtInformacion}> 
                                        {dateStringDMY}
                                    </Text>
                                </View>

                                {/* {show ?
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode={"date"}
                                            is24Hour={true}
                                            // locale="es-MX"
                                            display="spinner"
                                            onChange={onChange}
                                            // maximumDate={nw Date(dateNow.getUTCFullYear(), dateNow.getUTCMonth() , dateNow.getUTCDate())}
                                            // maximumDate={moment.add(-18, 'years')}
                                            maximumDate={moment().subtract(18, "years")._d}
                                        />
                                        :null
                                    } */}

                                {/* <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Lugar de nacimiento *</Text>
                                        </View>
                                        <Picker
                                            selectedValue={lugarNacimiento}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                let registro = entidadesPicker.find(x => x.key == itemValue);
                                                if (registro) {
                                                    setLugarNacimientoDesc(registro.entidad);
                                                    preCURP(nombreRegistro, primerAp, segundoAp, dateStringCURP, generoDesc,registro.clave);
                                                    setLugarNacimientoClave(registro.clave)
                                                }
                                                setLugarNacimiento(itemValue)
                                            }
                                            }>
                                            
                                            {  
                                                entidadesPicker.map((item, index) => (
                                                    <Picker.Item key={item.key} value={item.key} label={item.entidad}/>
                                                ))
                                            }
                                                                         
                                            </Picker>
                                </View> */}

                                <View style={styles.vInformacion}>
                                    <Text style={styles.txtTitulo}>
                                        {"Lugar de nacimiento"}
                                    </Text >
                                    <Text style={styles.txtInformacion}> 
                                        {lugarNacimientoDesc}
                                    </Text>
                                </View>
                                {/* {
                                    cargosPicker.length>0 ?
                                    <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Puesto/Actividad *</Text>
                                        </View>
                                        <Picker
                                            selectedValue={cargo}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                    setCargo(itemValue)
                                                    let registro = cargosPicker.find(x => x.key == itemValue);
                                                            
                                                    if (registro) {
                                                        setCargoDesc(registro.cargo);
                                                    }
                                                }
                                            }>
                                            
                                            {  
                                                cargosPicker.map((item, index) => (
                                                    <Picker.Item key={item.key} value={item.key} label={item.cargo}/>
                                                ))
                                            }
                                                                            
                                            </Picker>
                                    </View>
                                    :null
                                } */}

                                <View style={styles.vInformacion}>
                                    <Text style={styles.txtTitulo}>
                                        {"Puesto/Actividad"}
                                    </Text >
                                    <Text style={styles.txtInformacion}> 
                                        {cargoDesc}
                                    </Text>
                                </View>
                            
                            {/* <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Estado de residencia *</Text>
                                        </View>
                                        <Picker
                                            selectedValue={estadoResidencia}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                let registro = entidadesPicker.find(x => x.key == itemValue);
                                                if (registro) {
                                                    setEstadoResidenciaDesc(registro.entidad);
                                                    cargarMunicipios(registro.entidad)
                                                }
                                                setEstadoResidencia(itemValue)
                                            }
                                            }>
                                            {  
                                                entidadesPicker.map((item, index) => (
                                                    <Picker.Item key={item.key} value={item.key} label={item.entidad}/>
                                                ))
                                            }                            
                                            </Picker>
                            </View>  */}
                            <View style={styles.vInformacion}>
                                    <Text style={styles.txtTitulo}>
                                        {"Estado de responsabilidad"}
                                    </Text >
                                    <Text style={styles.txtInformacion}> 
                                        {estadoResidenciaDesc}
                                    </Text>
                                </View>
                            {/* {
                                visibleMunicipio && municipiosPicker.length>0 ?
                                <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Municipio *</Text>
                                        </View>
                                        <Picker
                                            selectedValue={municipio}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                let registro = municipiosPicker.find(x => x.key == itemValue);
                                                if (registro) {
                                                    setMunicipioDesc(registro.municipio);
                                                    cargarDistritos(estadoResidenciaDesc, registro.municipio)
                                                }
                                                setMunicipio(itemValue)
                                            }
                                            }>
                                            
                                            {  
                                                municipiosPicker.map((item, index) => (
                                                    <Picker.Item key={item.key} value={item.key} label={item.municipio}/>
                                                ))
                                            }                            
                                            </Picker>
                                </View> 
                                :null
                            }   */}
                            {
                                    municipioDesc!="" ?
                                <View style={styles.vInformacion}>
                                        <Text style={styles.txtTitulo}>
                                            {"Municipio de responsabilidad"}
                                        </Text >
                                        <Text style={styles.txtInformacion}> 
                                            {municipioDesc}
                                        </Text>
                                </View>
                                :null
                            }
                            
                            {/* {
                                visibleDistrito && distritosPicker.length>0  ?
                                <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Distrito *</Text>
                                        </View>
                                        <Picker
                                            selectedValue={distrito}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                let registro = distritosPicker.find(x => x.key == itemValue);
                                                if (registro) {
                                                    setDistritoDesc(registro.distrito);
                                                    cargarSecciones(estadoResidenciaDesc, municipioDesc, registro.distrito)
                                                }
                                                setDistrito(itemValue)
                                            }
                                            }>
                                            
                                            {  
                                                distritosPicker.map((item, index) => (
                                                    <Picker.Item key={item.key} value={item.key} label={item.distrito}/>
                                                ))
                                            }                            
                                            </Picker>
                                </View> 
                                :null
                            }  */}
                            {
                                distritoDesc!= "" ?
                                    <View style={styles.vInformacion}>
                                            <Text style={styles.txtTitulo}>
                                                {"Distrito de responsabilidad"}
                                            </Text >
                                            <Text style={styles.txtInformacion}> 
                                                {distritoDesc}
                                            </Text>
                                    </View>
                                    :null
                            }
                            
                             {/* {
                                visibleSeccion && seccionPicker.length>0 ?
                                <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Seccion *</Text>
                                        </View>
                                        <Picker
                                            selectedValue={seccion}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                let registro = seccionPicker.find(x => x.seccionid == itemValue);
                                                if (registro) {
                                                    setSeccionDesc(registro.seccion);
                                                }
                                                setSeccion(itemValue)
                                            }
                                            }>
                                            
                                            {  
                                                seccionPicker.map((item, index) => (
                                                    <Picker.Item key={item.seccionid} value={item.seccionid} label={item.seccion}/>
                                                ))
                                            }                            
                                            </Picker>
                                </View> 
                                :null
                            }
                             */}
                             {
                                seccionDesc!="" ?
                                <View style={styles.vInformacion}>
                                        <Text style={styles.txtTitulo}>
                                            {"Sección de responsabilidad"}
                                        </Text >
                                        <Text style={styles.txtInformacion}> 
                                            {seccionDesc}
                                        </Text>
                                </View>
                                :null
                             }
                                                        
                            {/* <Input 
                                onChangeText={text => {
                                    // console.log("Longit" , text.length)
                                    if (text.length==18)
                                    {
                                    //    let valida = curpValida (text)
                                    let valida = curp.validar(text)
                                       console.log("valida", valida)
                                    //    if (valida) 
                                    //    {
                                    //         setcurpValida(true)
                                    //         setMensajeCURP("")
                                    //    }
                                    //    else
                                    //    {
                                    //         setcurpValida(false)
                                    //         setMensajeCURP("CURP inválida")
                                    //    }
                                    }
                                    else
                                    {
                                        setcurpValida(false)
                                        setMensajeCURP("")
                                    }


                                    setCURP(text)
                                }}
                                value={curpS}
                                placeholder = "Ingrese el CURP"
                                titulo = "CURP *"
                                color   = {COLORS.trasparent}
                                colorFont  = {COLORS.gray}
                                placeholderColor = {COLORS.lightgray}
                                maxLength={18}
                                autoCapitalize="characters"
                            /> */}
                            {/* <View style={styles.vError}>
                                <Text style ={styles.txtError}>{mensajeCURP}</Text>
                            </View> */}

                            <View style={styles.vInformacion}>
                                        <Text style={styles.txtTitulo}>
                                            {"CURP"}
                                        </Text >
                                        <Text style={styles.txtInformacion}> 
                                            {curpS}
                                        </Text>
                            </View>
                            {/* <View style={styles.vFotografia}>
                                <Button  name={"Tomar fotografía"} color={COLORS.primary} textColor={COLORS.white} handleTouch={pickImage} />
                            </View> */}
                            <View style={styles.vFotoINE}>
                                        {
                                        ine=="" && ine!= undefined && ine!=null?
                                        <Icon
                                            name="id-card"
                                            size={80}
                                            color={COLORS.lightgray}
                                        />
                                        :
                                        <Image source={{uri:ine}} style={styles.imageProfile} />
                                        }
                            </View>
                        </View>
                              
                </ScrollView>
               <View style={styles.footer}>
                    <Button  name={"Continuar"} color={COLORS.primary} textColor={COLORS.white} handleTouch={handleSignIn} />
               </View>
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
    footer:{
        height:40,
        width : '100%',
        marginVertical : 10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:COLORS.white,
        // paddingLeft:30,
        // backgroundColor:'purple'

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
      width:'100%',
      backgroundColor:COLORS.white,
      borderTopEndRadius:50,
      borderTopLeftRadius:50
     },
     vResponsabilidad:{
         height:40,
         width:'100%',
         flexDirection:'row',
         justifyContent:'space-around',
         alignItems:'center',
        //  backgroundColor:'purple'
     },
     txtResponsabilidad:{
         color:COLORS.secondary,
         fontSize:13,
         fontWeight:'bold'
     },
     vRadios :{
         width:'80%',
        //  height:160,
         backgroundColor: COLORS.backColor,
         borderRadius:20
     },
     radioButton :{
        height:40,
        width : '100%',
        // marginVertical : 10,
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row',
        marginHorizontal:20
     },
     txtRadio :{
         marginLeft:10,
         color:COLORS.darkGray,
         fontSize:15
     },
     vPicker :{
         height:60,
         width:'96%',
         marginTop: 20,
         borderBottomColor:'gray',
         borderBottomWidth:0.5
     },
     picker :{
         color:COLORS.secondary
     },
     titleInputText:{
        color:COLORS.secondary,
        textAlign:'justify',
        fontWeight:'bold',
         marginRight:10
     },
     vPickerDate: {
         marginTop:20,
         width: '100%',
         flexDirection:'row',
         alignItems:'center',
         // backgroundColor:'purple'
         // marginVertical:20
     },
     tBtnDate: {
         height:40,
         width:40,
         flexDirection:'row',
         justifyContent:'space-around',
         alignItems:'center',
         backgroundColor: COLORS.secondary,
         borderRadius:50
     },
     vDetalle :{
         marginLeft:10,
        //  backgroundColor:'purple',
         width:'70%',
         height:40,
         justifyContent:'center'
     },
     txtDetalle :{
         fontSize:SIZES.h4,
         color: COLORS.secondary        
     },
     vTitulo:{
         marginTop:20
     },
     vCURP :{
         width:'100%',
         height:80,
        //  flexDirection:'row',
        //  alignItems:'center',
        //  justifyContent:'space-between',
        //  backgroundColor: 'purple',
         marginVertical:5
     },
     vEspaciado :{
        width:'100%',
        height:30,
       //  flexDirection:'row',
       //  alignItems:'center',
       //  justifyContent:'space-between',
       //  backgroundColor: 'purple',
        marginVertical:5
     },
     txtError:{
         fontSize: 13,
         color:'red'
     },
     vError :{
         height:40,
         width:'100%',
     },
     imageProfile: {
         height: '100%',
         width: '100%',
         resizeMode: 'contain'
     },
     vFotografia :{
        width:'100%',
        height:50,
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginVertical:10
     },
     vFotoINE:{
         backgroundColor:COLORS.gray,
         width:'100%', 
         height:150, 
         alignItems:'center', 
         justifyContent:'center',
         flexDirection:'row', 
         marginTop:10,
         borderRadius:10
    },
    vInformacion: {
        height:50,
        width:'100%',
        borderBottomColor: COLORS.lightgray,
        borderBottomWidth:1,
        marginVertical:10,
        justifyContent:'flex-end'
    },
    txtTitulo : {
        fontSize:SIZES.h3,
        color : COLORS.secondary,
        fontWeight:'bold',
        marginVertical:5
    },
    txtInformacion : {
        fontSize:SIZES.h4,
        color : COLORS.gray
    }
})

export default DetalleContactoScreen;