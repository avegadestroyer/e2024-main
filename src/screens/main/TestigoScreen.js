import React, { useEffect, useState, useContext, Component, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Switch, Image, Alert,Dimensions, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import moment, { unix } from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { COLORS, SIZES, images } from '../../constants';
import { AuthContext } from '../../utils/authContext';
import Storage from '../../libs/Storage'
import Input from '../../components/input';
import Button from '../../components/button';
import ButtonFloat from '../../components/buttonFloat';
import Header from '../../components/header';
import Title from '../../components/title';
import entidades from '../../../assets/json/entidades.json'
import Municipios from '../../libs/Localizacion/municipios'
import Distritos from '../../libs/Localizacion/distritos'
import Secciones from '../../libs/Localizacion/secciones'
import  curp  from '../../libs/curp'
import ModalLoading from '../../components/modalLoading';
import ItemPublicidad from '../../components/itemPublicidad';
import Separator from '../../components/separator'
import Empty from '../../components/empty'
import { setTestigos } from '../../ws/setTestigos';
import { getReferente } from '../../ws/getRerefente';


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const TestigoScreen = ({ navigation, route }) => {
    const { signOut } = useContext(AuthContext);
    const [nombre, setNombre] = React.useState('');
    const [id_usuario, setID] = React.useState('');
    const [userId, setUserID] = React.useState('');
    const [dateNow, setDateNow] = React.useState('');
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState("");
    const [dateStringDMY, setDateStringDMY] = useState("");
    const [show, setShow] = useState(false);
    
    const [time, setTime] = useState(new Date());
    const [timeString, setHoraString] = useState("");
    const [showTime, setShowTime] = useState(false);
    
    const [estado, setEstado] = React.useState("");
    const [estadoDesc, setEstadoDesc] = React.useState("")
    const [entidadesPicker, setEntidadesPicker] = useState([])

    const [municipio, setMunicipio] = React.useState("");
    const [municipioDesc, setMunicipioDesc] = React.useState("")
    const [municipiosPicker, setMunicipiosPicker] = useState([])
    const [cargoEntidades, setCargoEntidades] = useState(false)
    const [cargoMunicipios, setCargoMunicipios] = useState(false)
    
    
    const [publicidadPicker, setPublicidadPicker] = useState([])
    const [publicidad, setPublicidad] = React.useState("");
    const [publicidadDesc, setPublicidadDesc] = React.useState("")
    
    const [categoriaPicker, setCategoriaPicker] = useState([])
    const [categoria, setCategoria] = React.useState("");
    const [categoriaDesc, setCategoriaDesc] = React.useState("")
    
    const [imagen, setImagen] = useState("")
    const [listaImagenes, setListaImagenes] = useState([])
    const [persona, setPersona] = useState("")
    const [actividad, setActividad] = useState("")
    const [visibleLoading, setVisibleLoading] = React.useState(false)

    const [partidosPicker, setPartidosPicker] = useState([])
    const [partido, setPartido] = useState(0)
    const [partidoDesc, setPartidoDesc] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [isNewImage, setIsNewImage] = useState(false)

    const [imagenNueva, setImagenNueva] = useState("")
    const [imagen1, setImagen1] = useState("")
    const [imagen2, setImagen2] = useState("")
    const [imagen3, setImagen3] = useState("")
    const [imagen4, setImagen4] = useState("")
    const [imagen5, setImagen5] = useState("")
    const [imagen6, setImagen6] = useState("")
    const [imagen7, setImagen7] = useState("")
    const [imagen8, setImagen8] = useState("")
    const [imagen9, setImagen9] = useState("")
    const [imagen10, setImagen10] = useState("")
    const [indexImagen, setIndexImagen] = useState(0)
    const [idRereferente, setIdReferente] = useState(0)
    const [referente, setreferente] = useState("referente")
    const [token, setToken] = React.useState('');

    

  
    async function getTestigos(testigo) 
    {
        console.log("testigos", testigo);
        const testigosGuardadas = await Storage.instance.getJson('testigos');
        console.log("testigosGuardadas", testigosGuardadas);
        
        if (testigosGuardadas) {

          testigosGuardadas.push(testigo)
          
          const stored = Storage.instance.store('testigos', JSON.stringify(testigosGuardadas))
          console.log("stonred", stored )
          if (stored)
          {
            setIsLoading(false)
                Alert.alert("Información", "Se ha guardado correctamente");
                navigation.navigate("Root", {});
          }
          else
          {
            setIsLoading(false)
          }
        }
        else
        {
            let encuestas = []; 
            encuestas.push(testigo)
            const stored = Storage.instance.store('testigos', JSON.stringify(encuestas))
            console.log("stonred", stored )
            if (stored)
            {
                Alert.alert("Información", "Se ha guardado correctamente");
                navigation.navigate("Root", {});
                console.log("Se guardo")
            }
            else
            {
                setIsLoading(false)
            }
        }        
    }


    useEffect(() => {
        cargarMunicipios(route.params.estado)
    }, [cargoEntidades])
    
    useEffect(() => {
        async function getInfo() 
        {
            const stored = await Storage.instance.getJson('userInfo');
            if (stored) {

                const { informacion } = stored;
                console.log("informacion", informacion)
                setID("ID "+ informacion.id_usuario)
                setUserID(informacion.id_usuario)
                setNombre(informacion.nombre)
                setToken(informacion.token)
            }
        }
        getInfo()
        let today = new Date().toISOString().slice(0, 10)
        setDateNow(today)


        console.log(JSON.stringify(route.params))

        cargarEstados(route.params.estado)
    }, [])
    
    const guardarImagen= (imagen) => {
        console.log(indexImagen)
       
            if (imagen!="" && imagen!=undefined){

                // let lista = listaImagenes
        
                // let registro = {
                //     key: lista.length+1,
                //     imagen
                // }
                
                // console.log(registro.key)
        
                // lista.push(registro)
                // setListaImagenes(lista)

                switch(indexImagen){
                    case 0: 
                        setImagen1(imagen)
                        break;
                    case 1: 
                        setImagen2(imagen)
                        break;
                    case 2: 
                        setImagen3(imagen)
                        break;
                    case 3: 
                        setImagen4(imagen)
                        break;
                    case 4: 
                        setImagen5(imagen)
                        break;
                    case 5: 
                        setImagen6(imagen)
                        break;
                    case 6: 
                        setImagen7(imagen)
                        break;
                    case 7: 
                        setImagen8(imagen)
                        break;
                    case 8: 
                        setImagen7(imagen)
                        break;
                    case 9: 
                        setImagen8(imagen)
                        break;
                }
                let index = indexImagen
                index++;
                console.log(index)
                setIndexImagen(index)
            }
    }


    const pickImage = () => {
        console.log("pickImage")

        Alert.alert(
            "Imagen",
            "Seleccione una opción",
            [{
                    text: "Camara",
                    onPress: () => {
                        const options = {
                            includeBase64: true,
                            quality: 0.1,
                            storageOptions: {
                                skipBackup: true,
                                path: 'images',
                            },
                            maxWidth:320,
                            maxLength:320
                        };
                        try
                        {
                            launchCamera(options, (response) => {
                                console.log(response)
                                if (response.didCancel) {
                                    console.log('User cancelled image picker');
                                   } else if (response.error) {
                                    console.log('ImagePicker Error: ', response.error);
                                   } else if (response.customButton) {
                                    console.log('User tapped custom button: ', response.customButton);
                                   } else {
                                        const source = {
                                            uri: 'data:image/jpeg;base64,' + response.assets[0].base64
                                        };
                                        // setINE(source.uri)
        
                                        
                                    guardarImagen(source.uri)
                                   }
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
                            quality: 0.1,
                            storageOptions: {
                                skipBackup: true,
                                path: 'images',
                            },
                            maxWidth:320,
                            maxLength:320
                        };

                        try 
                        {
                            
                            launchImageLibrary(options, (response) => {

                                    if (response.didCancel) {
                                    console.log('User cancelled image picker');
                                   } else if (response.error) {
                                    console.log('ImagePicker Error: ', response.error);
                                   } else if (response.customButton) {
                                    console.log('User tapped custom button: ', response.customButton);
                                   } else {
                                            const source = {
                                                uri: 'data:image/jpeg;base64,' + response.assets[0].base64
                                            };
            
                                            // let registro = {
                                            //     key: listaImagenes.length+1,
                                            //     imagen : 'data:image/jpeg;base64,' + response.assets[0].base64
                                            // }
            
                                            // listaImagenespick.push(registro)
                                            // console.log(listaImagenes.length)
                                            guardarImagen(source.uri)
                                   }
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
                cancelable: true
            })

            
    }

    const showDatepicker = () => {
        setShow(true);
    };

    const showTimepicker = () => {
        setShowTime(true);
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
            
      
            setDateString (datetext)
            setDateStringDMY(datetextDDMMYY)
        }
    };

    const onChangeTime = (event, selectedDate) => {
        setShowTime(Platform.OS === 'ios');
        console.log("onChangeTime",selectedDate)     
        const currentDate = selectedDate || state.date;
        setTime(currentDate);
        let datetext = currentDate.toTimeString();
        datetext = datetext.split(' ')[0];
        console.log("setHora", datetext)
        setHoraString (datetext)        
      };

    const cargarEstados = (estado) => {

        var day = moment().format("DD/MM/yyyy")
        
        var time = moment().format("HH:mm")
        setDateString (day)
        setDateStringDMY(day)
        setHoraString (time)  
       
        let catalogo_entidades = entidades;
        let detalleEntidad = [{
            key: "",
            entidad: "Selecciona una entidad"
        }]

        let estadoIdActual = 0;
        catalogo_entidades.forEach(element => {
            if (element.catdetname == estado) {
                estadoIdActual= element.catdetid
            }
            
            let registro = {
                key: element.catdetid,
                entidad: element.catdetname,
                clave : element.catdetkey
            }
            detalleEntidad.push(registro)
        });


        setEstado(estadoIdActual)
        setEstadoDesc(estado)

        setEntidadesPicker(detalleEntidad)

        let detallePublicidad = [
            {
                key: "",
                publicidad: "Selecciona una publicidad"
            },
            {
                key: "1",
                publicidad: "Espectaculares"
            },
            {
                key: "2",
                publicidad: "Bardas"
            },
            {
                key: "82",
                publicidad: "Manta/Lona"
            },
            {
                key: "4",
                publicidad: "Poster o Cartel"
            },
            {
                key: "5",
                publicidad: "Marcha o Manifestación"
            }
        ]

        setPublicidadPicker(detallePublicidad)

        let detalleCategoria = [
            {
                key: "",
                categoria: "Selecciona una categoría"
            },
            {
                key: "1",
                categoria: "Afín"
            },
            {
                key: "2",
                categoria: "Otro partido"
            },
            {
                key: "3",
                categoria: "Difamatorio"
            }
        ]

        setCategoriaPicker(detalleCategoria)

        let partidos = [
            {
                key:"1",
                partido:"MORENA - Movimiento Regeneración Nacional",
                activo: false
            },
            {
                key:"2",
                partido:"PAN - Partido Acción Nacional",
                activo: false
            },
            {
                key:"3",
                partido:"PRI - Partido Revolucionario Institucional",
                activo: false
            },
            {
                key:"4",
                partido:"PRD - Partido de la Evolución Democrática ",
                activo: false
            },
            {
                key:"5",
                partido:"PT - Partido del Trabajo",
                activo: false
            },
            {
                key:"6",
                partido:"PVEM - Partido Verde Ecologista de Mexico",
                activo: false
            },
            {
                key:"7",
                partido:"MC - Movimiento Ciudadano",
                activo: false
            },
            {
                key:"8",
                partido:"Sin Partido",
                activo: false
            },
            {
                key:"9",
                partido:"Otro (Local)",
                activo: false
            }
        ]

        setPartidosPicker(partidos)
    }

    const slugify = text => text
    .replace(/\s|_|\(|\)/g, " ")
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .toUpperCase()

    const cargarMunicipios = (estado) => {    

        setMunicipiosPicker([])
        let ListaMunicipios = []
        ListaMunicipios = Municipios.instance.getMunicipios(estado);
        ListaMunicipios=  [
            {
                "estado": "",
                "municipio": "Seleccione un municipio",
                "municipioid":""
            },
        ...ListaMunicipios]
        console.log("ListaMunicipios", ListaMunicipios)

        let municipioIdActual ="";
        
        ListaMunicipios.forEach(element => {
            if (element.municipio == slugify(route.params.municipio)) {
                municipioIdActual= element.municipioid
            }
        });
        console.log("municipioIdActual", municipioIdActual)
        console.log("municipio",route.params.municipio)

        setMunicipio(municipioIdActual)
        setMunicipioDesc(route.params.municipio)

        setMunicipiosPicker(ListaMunicipios)
        
    }

    const renderEmpty = () => {
        
            return(<Empty text = "Espere un momento" > </Empty>)
    }

    const itemSeparator=() =><Separator/>

    const press = (seleccion) => {
       
        let detallePartido = []
        setPartido(seleccion)
        partidosPicker.forEach(element => {
            let activo = false;

            let registro = {
                key: element.key,
                partido: element.partido,
                activo : element.activo
            }

            if (element.key  == seleccion)
            {
                registro = {
                    key: element.key,
                    partido: element.partido,
                    activo : !element.activo
                }
                setPartidoDesc(element.partido)
            }
            
            detallePartido.push(registro)
        });
        setPartidosPicker(detallePartido);        
    }

    const DeleteImage = (seleccion) => {
       console.log(seleccion)
        let index = indexImagen

        setIndexImagen(index-1)
       switch(seleccion) {
                case 1:
                    setImagen1("")
                break;
                case 2:
                    setImagen2("")
                break;
                case 3:
                    setImagen3("")
                break;
                case 4:
                    setImagen4("")
                break;
                case 5:
                    setImagen5("")
                break;
                case 6:
                    setImagen6("")
                break;
                case 7:
                    setImagen7("")
                break;
                case 8:
                    setImagen8("")
                break;
                case 9:
                    setImagen9("")
                break;
                case 10:
                    setImagen10("")
                break;
       }

    }

    const handleSignIn = async() => {
       try{
        setIsLoading(true)
        let {  markerInicial, markerDestino, direccion, seEncuentraDireccion, latRegistro, longRegistro } = route.params
        let valido = true;

        let PartidoSeleccionados =[]
        let ListaPartidos =""
        let contador =1;

        partidosPicker.forEach(element => {
           
            if (element.activo)
            {
                let registro = {
                    key: element.key,
                    partido: element.partido,
                    activo : element.activo
                }

                ListaPartidos += `${element.partido},`
                
                PartidoSeleccionados.push(registro)
                contador ++;
            }
        });


        // if (categoria =="" || publicidad=="" || PartidoSeleccionados.length<=0 || estado=="" || municipio=="" || persona=="" || indexImagen<=0 || referente=="" )
        // if (categoria =="" || publicidad==""  || estado=="" || municipio=="" || persona=="" || indexImagen<=0  )
        if ( publicidad==""  || estado=="" || municipio==""  || indexImagen<=0  )
        {
            valido= false;
        }

        const {}=  route.params
        
        if (valido)
        {
            let testigo = {
                estado,
                estadoDesc,
                municipio,
                municipioDesc,
                categoria,
                categoriaDesc,
                publicidad,
                publicidadDesc,
                PartidoSeleccionados,
                persona,
                actividad,
                markerInicial,
                markerDestino,
                direccion
            }

            let params = {
                "userid"        : userId,
                "direccion"     : direccion,
                "lat"           : markerInicial.coordinate.latitude,
                "lon"           : markerInicial.coordinate.longitude,
                "lat2"          : markerDestino.coordinate.latitude,
                "lon2"          : markerDestino.coordinate.longitude,
                "endireccion"   : seEncuentraDireccion,
                "estado"        : estado,
                "municipio"     : municipio,
                "tipopublicidad": publicidad,
                "img1"          : imagen1!="" ?  imagen1.substring(23) :"" ,
                "img2"          : imagen2!="" ?  imagen2.substring(23) :"",
                "img3"          : imagen3!="" ?  imagen3.substring(23) :"",
                "img4"          : imagen4!="" ?  imagen4.substring(23) :"",
                "img5"          : imagen5!="" ?  imagen5.substring(23) :"",
                "img6"          : imagen6!="" ?  imagen6.substring(23) :"",
                "img7"          : imagen7!="" ?  imagen7.substring(23) :"",
                "img8"          : imagen8!="" ?  imagen8.substring(23) :"",
                "img9"          : imagen9!="" ?  imagen9.substring(23) :"",
                "img10"         : imagen10!="" ?  imagen10.substring(23) :"",
                "personaje"     : persona,
                "categoria"     : categoria,
                "partidos"      : ListaPartidos,
                "latRegistro"   : markerInicial.coordinate.latitude,
                "longRegistro"  : markerInicial.coordinate.longitude,
                "idreferencia"  : idRereferente
            };

            // console.log(params)

            await setTestigos (params,token)
            .then(res => {
              
                const { respuesta }= res
                console.log("res.respuesta",res)
                if (respuesta.error==0 ){
                    getTestigos(testigo)
                    //  Alert.alert("Información", "Se ha guardado correctamente");
                    // navigation.navigate("Root", {});
                }
                else
                {
                    setIsLoading(false)
                    Alert.alert("Información", "Se presentó un error, intente de nuevo");
                }
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false)
            })

            // ;
        }
        else
        { 
            setIsLoading(false)
            Alert.alert("Información", "Complete los campos obligatorios marcados")
        }


       }
       catch(err) {
        console.log("err")
       }
      
    }

    const handlePress= (item)=> {
        // console.log("Modalfirma")
        // if (!item.estatus ){
        // // console.log("item.estatus", item.estatus)

        //     this.setState({
        //         rendimiento:item, 
        //         visibleFirma: true
        //     })
        // }
    }

    const renderFlatListItem = (item)=> {
        let evento={}

        return (
            evento = {
                key:item.id,
                imagen : item.imagen
            }
        )
    }

    const search = () => {
       
       if (idRereferente!="")
       {
           getReferente(idRereferente)
           .then(res=> {
            // console.log(res)
                const {respuesta }= res
                setreferente(respuesta.personaNombreCompleto)
           })
           .catch(err=> {
                console.log(err)
           })
       }
       else
       {
        Alert.alert("Información", "Ingrese una referencia, para continuar");
       }
      };
   

    return (
         <View View style = {styles.container} > 
                {
                    isLoading ?
                    <ModalLoading visible={isLoading}/>
                    :null
                } 
                <Header id_usuario={id_usuario} nombre={nombre} />
                  
                <ScrollView style={styles.vContainer}  contentContainerStyle={{ alignItems:'center', justifyContent: 'center' }}>

                        <View style={{width:'80%'}}>
                                        <View style={styles.vSearchButton}>

                                            <Input 
                                                onChangeText={text => { setIdReferente(text); }}
                                                value={idRereferente}
                                                placeholder = "Ingrese ID del Refernte"
                                                titulo = "ID del Referente"
                                                color   = {COLORS.trasparent}
                                                colorFont  = {COLORS.gray}
                                                placeholderColor = {COLORS.lightgray}
                                                keyboardType ="numeric"
                                                // maxLength={18}
                                                // autoCapitalize="characters"
                                            />
                                             <TouchableOpacity
                                                    style={styles.tBtnSearch}
                                                    onPress={() => search()}>
                                                    <View style={styles.vIconCallout}>
                                                        {/* <Image source={icons.calendar} style={styles.icon}/> */}
                                                        <Icon
                                                            name = {"search"}
                                                            color = {COLORS.white}
                                                            size= {15}
                                                        />
                                                    </View>
                                            </TouchableOpacity>
                                        </View>
                                <View style={[styles.titlePicker, {marginVertical:10}]}>
                                    <Text style={styles.titleInputText}>{referente}</Text>
                                </View>
                                        
                                
                                {/* <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Estado</Text>
                                        </View>
                                        <Picker
                                            selectedValue={estado}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                // setVisibleLoading(true)
                                                let registro = entidadesPicker.find(x => x.key == itemValue);
                                                if (registro) {
                                                    setEstadoDesc(registro.entidad);
                                                    cargarMunicipios(registro.entidad)
                                                }
                                                setEstado(itemValue)
                                            }
                                            }>
                                            
                                            {  
                                                entidadesPicker.map((item, index) => (
                                                    <Picker.Item key={item.key} value={item.key} label={item.entidad}/>
                                                ))
                                            }                            
                                            </Picker>
                                </View> 
                                {
                                    municipiosPicker.length>0 ?
                                    <View style={styles.vPicker}>
                                            <View style={styles.titlePicker}>
                                                <Text style={styles.titleInputText}>Municipio</Text>
                                            </View>
                                            <Picker
                                                selectedValue={municipio}
                                                style={styles.picker}
                                                onValueChange={(itemValue, itemIndex) =>{
                                                    
                                                    let registro = municipiosPicker.find(x => x.municipioid == itemValue);
                                                    if (registro) {
                                                        setMunicipioDesc(registro.municipio);
                                                    }
                                                    setMunicipio(itemValue)
                                                }
                                                }>
                                                
                                                {  
                                                    municipiosPicker.map((item, index) => (
                                                        <Picker.Item key={item.municipioid} value={item.municipioid} label={item.municipio}/>
                                                    ))
                                                }                            
                                                </Picker>
                                    </View> 
                                    :null
                                }  */}
                                 
                                <View style={styles.vPickerDate}>
                                            <View
                                                    style={styles.tBtnDate}
                                                    onPress={() => showDatepicker()}>
                                                    <View style={styles.vIconCallout}>
                                                        {/* <Image source={icons.calendar} style={styles.icon}/> */}
                                                        <Icon
                                                            name = {"calendar"}
                                                            color = {COLORS.white}
                                                            size= {15}
                                                        />
                                                    </View>
                                            </View>
                                    <View style={styles.vDetalle}>
                                        <Text style={styles.txtDetalle}>{dateStringDMY}</Text>
                                    </View>
                                </View>


                                {show ?
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
                                        //maximumDate={moment().subtract(18, "years")._d}
                                        minimumDate={moment()._d}
                                    />
                                    :null
                                }

                                <View style={styles.vPickerDate}>
                                            <View
                                                    style={styles.tBtnDate}
                                                    onPress={() => showTimepicker()}>
                                                    <View style={styles.vIconCallout}>
                                                        {/* <Image source={icons.calendar} style={styles.icon}/> */}
                                                        <Icon
                                                            name = {"clock-o"}
                                                            color = {COLORS.white}
                                                            size= {15}
                                                        />
                                                    </View>
                                            </View>
                                    <View style={styles.vDetalle}>
                                        <Text style={styles.txtDetalle}>{timeString}</Text>
                                    </View>
                                </View>


                                {showTime ?
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={time}
                                        mode={"time"}
                                        is24Hour={true}
                                        locale="es-MX"
                                        display="default"
                                        onChange={onChangeTime}
                                    />:null
                                }

                            {/* <View style={[styles.titlePicker, {marginVertical:20}]}>
                                <Text style={styles.titleInputText}>Partidos</Text>
                            </View> */}
                            {/* {
                                partidosPicker.length>0 ?
                                    <View style={styles.vRadios}>
                                    {                       
                                            partidosPicker.map((item, index) => (
                                                <TouchableOpacity style={styles.radioButton} onPress= { () => press(item.key)}>
                                                    {
                                                        !item.activo?
                                                        <Icon
                                                            name = {"square-o"}
                                                            color = {COLORS.secondary}
                                                            size= {20}
                                                        />:
                                                        <Icon
                                                            name = {"check-square-o"}
                                                            color = {COLORS.secondary}
                                                            size= {20}
                                                        />
                                                    }
                                                <Text style={styles.txtRadio}>{item.partido} </Text>
                                            </TouchableOpacity>
                                            ))
                                    }
                                    </View>  
                                :null
                            } */}
                            {/* <Input 
                                    onChangeText={text => { setPersona(text); }}
                                    value={persona}
                                    placeholder = "Ingrese personaje político"
                                    titulo = "Personaje Político"
                                    color   = {COLORS.trasparent}
                                    colorFont  = {COLORS.gray}
                                    placeholderColor = {COLORS.lightgray}
                                    autoCapitalize="characters"
                                    // maxLength={18}
                                    // autoCapitalize="characters"
                                /> */}
                            {
                                publicidadDesc=="Marcha o Manifestación" ?
                                <Input 
                                    onChangeText={text => { setActividad(text); }}
                                    value={actividad}
                                    placeholder = "Ingrese actividad"
                                    titulo = "Actividad"
                                    color   = {COLORS.trasparent}
                                    colorFont  = {COLORS.gray}
                                    placeholderColor = {COLORS.lightgray}
                                    autoCapitalize="characters"
                                    // maxLength={18}
                                    // autoCapitalize="characters"
                                />  :null
                            }

                             <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Tipo de publicidad o Evento</Text>
                                        </View>
                                        <Picker
                                            selectedValue={publicidad}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                // setVisibleLoading(true)
                                                let registro = publicidadPicker.find(x => x.key == itemValue);
                                                if (registro) {
                                                    setPublicidadDesc(registro.publicidad);
                                                }
                                                setPublicidad(itemValue)
                                            }
                                            }>
                                            {  
                                                publicidadPicker.map((item, index) => (
                                                    <Picker.Item key={item.key} value={item.key} label={item.publicidad}/>
                                                ))
                                            }                            
                                            </Picker>
                                </View>          
                            

                            {/* <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Categoría</Text>
                                        </View>
                                        <Picker
                                            selectedValue={categoria}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                // setVisibleLoading(true)
                                                let registro = categoriaPicker.find(x => x.key == itemValue);
                                                if (registro) {
                                                    setCategoriaDesc(registro.categoria);
                                                }
                                                setCategoria(itemValue)
                                            }
                                            }>
                                            {  
                                                categoriaPicker.map((item, index) => (
                                                    <Picker.Item key={item.key} value={item.key} label={item.categoria}/>
                                                ))
                                            }                            
                                            </Picker>
                                </View>  */}
                                {
                                    indexImagen<10 ?
                                        <View style={styles.vFotografia}>
                                            <Button  name={"Tomar fotografía"} color={COLORS.primary} textColor={COLORS.white} handleTouch={pickImage} />
                                        </View>
                                        :null
                                    }
                                    <View style={styles.vFotoINE}>
                                        <View style={[styles.titlePicker, {marginVertical:20}]}>
                                            <Text style={[styles.titleInputText, {textAlign:'center'}]}>Imágenes</Text>
                                            <Text style={[styles.titleInputText, {textAlign:'center'}]}>No. {indexImagen}</Text>
                                        </View>
                                        {/* {
                                            listaImagenes.map((item, index) => (
                                                <Image source={{uri:item.imagen}} style={styles.imageProfile} />
                                            ))
                                             
                                        } */}
                                            {imagen1!="" && imagen1!= undefined ? <View><Image source={{uri:imagen1}} style={styles.imageProfile} /><ButtonFloat id={1} iconName={"trash-o"} color={COLORS.primary} textColor={"red"} handleTouch={DeleteImage} bottom={10}/></View> :null}
                                            {imagen2!="" && imagen2!= undefined ? <View><Image source={{uri:imagen2}} style={styles.imageProfile} /><ButtonFloat id={2} iconName={"trash-o"} color={COLORS.primary} textColor={"red"} handleTouch={DeleteImage} bottom={10}/></View>:null}
                                            {imagen3!="" && imagen3!= undefined ? <View><Image source={{uri:imagen3}} style={styles.imageProfile} /><ButtonFloat id={3} iconName={"trash-o"} color={COLORS.primary} textColor={"red"} handleTouch={DeleteImage} bottom={10}/></View>:null}
                                            {imagen4!="" && imagen4!= undefined ? <View><Image source={{uri:imagen4}} style={styles.imageProfile} /><ButtonFloat id={4} iconName={"trash-o"} color={COLORS.primary} textColor={"red"} handleTouch={DeleteImage} bottom={10}/></View>:null}
                                            {imagen5!="" && imagen5!= undefined ? <View><Image source={{uri:imagen5}} style={styles.imageProfile} /><ButtonFloat id={5} iconName={"trash-o"} color={COLORS.primary} textColor={"red"} handleTouch={DeleteImage} bottom={10}/></View>:null}
                                            {imagen6!="" && imagen6!= undefined ? <View><Image source={{uri:imagen6}} style={styles.imageProfile} /><ButtonFloat id={6} iconName={"trash-o"} color={COLORS.primary} textColor={"red"} handleTouch={DeleteImage} bottom={10}/></View>:null}
                                            {imagen7!="" && imagen7!= undefined ? <View><Image source={{uri:imagen7}} style={styles.imageProfile} /><ButtonFloat id={7} iconName={"trash-o"} color={COLORS.primary} textColor={"red"} handleTouch={DeleteImage} bottom={10}/></View>:null}
                                            {imagen8!="" && imagen8!= undefined ? <View><Image source={{uri:imagen8}} style={styles.imageProfile} /><ButtonFloat id={8} iconName={"trash-o"} color={COLORS.primary} textColor={"red"} handleTouch={DeleteImage} bottom={10}/></View>:null}
                                            {imagen9!="" && imagen9!= undefined ? <View><Image source={{uri:imagen9}} style={styles.imageProfile} /><ButtonFloat id={9} iconName={"trash-o"} color={COLORS.primary} textColor={"red"} handleTouch={DeleteImage} bottom={10}/></View>:null}
                                            {imagen10!="" && imagen10!= undefined ? <View><Image source={{uri:imagen10}} style={styles.imageProfile} /><ButtonFloat id={10} iconName={"trash-o"} color={COLORS.primary} textColor={"red"} handleTouch={DeleteImage} bottom={10}/></View>:null}
                                </View>
                        </View>
                              
                </ScrollView>
                            
               <View style={styles.footer}>
                    <Button  name={"Guardar"} color={COLORS.primary} textColor={COLORS.white} handleTouch={handleSignIn} />
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
         width:'100%',
        //  height:160,
         backgroundColor: COLORS.backColor,
         borderRadius:20
     },
     radioButton :{
        height:50,
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
         fontSize:12
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
         height:100,
         width: 100,
         resizeMode: 'contain',
         marginVertical:10
     },
     vFotografia :{
        width:'100%',
        height:50,
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginVertical:10
     },
     vFotoINE:{
         backgroundColor:COLORS.lightgray,
         width:'100%', 
        //  height:150, 
         alignItems:'center', 
         justifyContent:'center',
        //  flexDirection:'row', 
         marginTop:10,
         borderRadius:10
    },
    vSearchButton:{
        width:'80%',
        height:70,
        flexDirection:'row',
        alignItems:'center',
        marginTop:5
    },
    tBtnSearch: {
        height:40,
        width:40,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor: COLORS.secondary,
        borderRadius:50
    }
})

export default TestigoScreen
;