import React, { useEffect, useState, useContext, Component, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Switch, Image, Alert,Dimensions, PermissionsAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import entidades from '../../../assets/json/entidades.json'
import Municipios from '../../libs/Localizacion/municipios'
import moment, { unix } from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MapView,  { Marker , PROVIDER_GOOGLE, enableLatestRenderer }  from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
 


import { COLORS, SIZES, images, icons } from '../../constants';
import { AuthContext } from '../../utils/authContext';
import Storage from '../../libs/Storage'
import Input from '../../components/input';
import Button from '../../components/button';
import ButtonFloat from '../../components/buttonFloat';
import Header from '../../components/header';
import ModalLoading from '../../components/modalLoading';

Geocoder.init("AIzaSyBNt_EHoKHvWyH4s-QgtQjPLRhl4Ud0QZY");

const SLIDER_WIDTH = Dimensions.get('window').width;

const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const { widthD, heightD } = Dimensions.get('window');

const MapaScreen = ({ navigation, route }) => {
    const ASPECT_RATIO = widthD / heightD;
    const LATITUDE_DELTA = 0.0922;
    const { signOut } = useContext(AuthContext);
    const [nombre, setNombre] = React.useState('');
    const [id_usuario, setID] = React.useState('')
    const [region, setRegion] = useState({
        latitude : 19.40251952943144, 
        longitude : -99.13208146791396,
        latitudeDelta :  0.00515,
        longitudeDelta : 0.000121
    })
    
    const [direccion, setDireccion] = useState("")
    const [estado, setEstado] = useState("")
    const [municipio, setMunicipio] = useState("")
    const [visibleLoading, setVisibleLoading] = React.useState(false)

    const [estadoID, setEstadoID] = React.useState("");
    const [estadoDesc, setEstadoDesc] = React.useState("")
    const [entidadesPicker, setEntidadesPicker] = useState([])

    const [municipioID, setMunicipioID] = React.useState("");
    const [municipioDesc, setMunicipioDesc] = React.useState("")
    const [municipiosPicker, setMunicipiosPicker] = useState([])
    const [cargoEntidades, setCargoEntidades] = useState(false)
    const [cargoMunicipios, setCargoMunicipios] = useState(false)
    
    const [markerInicial, setInicial] = useState({ key : "1",
                                                coordinate:{
                                                    latitude: Number("19.38631372090967"),
                                                    longitude: Number("-99.1751939177055")
                                                },
                                                title: "Inicial",
                                                description:"Punto de inicio"})
    const [markerDestino, setDestino] = useState( { key : "2",
                                                    coordinate:{
                                                        latitude: Number("0"),
                                                        longitude: Number("0")
                                                    },
                                                    title: "Destino",
                                                    description:"Punto de destino"})
    const [isDestino, setIsDestino]  = useState(false)
    const [isSetInicial, setIsSetInicial]  = useState(false)
    const [coincideDireccion, setCoincideDireccion] = useState(true)
    const mapViewRef = useRef();
    const mapViewRefDestino = useRef();
    const [latRegistro, setLatRegistro] = useState("")
    const [longRegistro, setLongRegistro] = useState("")
    // const {latOrigen, lngOrigen} = route.params
    
    useEffect(() => {
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
        getInfo()
        

        let permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
        AskPermission(permission)
       
    }, [])





    // useEffect(() => {
    //     cargarMunicipios(estado)
    // }, [cargoEntidades])

    const slugify = text => text
    .replace(/\s|_|\(|\)/g, " ")
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .toUpperCase()


    const cargarEstados = (estado) => {
        console.log("cargarEstados")
        console.log(estado)
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

        console.log(estadoIdActual)
        setEntidadesPicker(detalleEntidad)
        setEstadoID(estadoIdActual)
        setEstadoDesc(estado)
    }

    const cargarMunicipios = (estado, mun, lug) => {    
        console.log("Mini", mun)
        if (estado) {
            console.log(", lug", lug)
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
    
            let municipioIdActual = "";
            let municipioActual = municipio!="" ? municipio : mun

            console.log("cargarMunicipios",slugify( municipioActual.trim()))
            ListaMunicipios.forEach(element => {
               
                if (element.municipio.trim() == slugify(municipioActual.trim())) {
                    municipioIdActual= element.municipioid
                }
                else{
                   
                }
            });
            console.log("municipioIdActual", municipioIdActual)
            console.log("municipio",slugify(municipioActual))
    
            setMunicipioID(municipioIdActual)
            setMunicipioDesc(municipioActual)
            setMunicipiosPicker(ListaMunicipios)
            
        }
    }
 
    const AskPermission = async (permission) => {
        try {
          const granted = await PermissionsAndroid.request(permission, {
            title: 'Location Permission',
            message: 'Allow Location Permission.',
            //   buttonNeutral: "Ask Me Later",
            //   buttonNegative: "Cancel",
            buttonPositive: 'OK',
          });
          if (granted === true || granted === PermissionsAndroid.RESULTS.GRANTED) {
            Localizacioninicial()
          } else {
            Alert.alert("Información", "Vefique que tenga habilitado la opción de GPS")
          }
        } catch (err) {
          console.warn(err);
        }
      };

    const Localizacioninicial = () => {
        
        Geolocation.getCurrentPosition(
            (info) => {
                const { latitude, longitude } = info.coords
                // const latitude = 19.41838599873075;
                // const longitude = -99.14953847677255;

                setLatRegistro(latitude)
                setLongRegistro(longitude)

                let location = {
                    key : "1",
                    coordinate:{
                        latitude: Number(latitude),
                        longitude: Number(longitude)
                    },
                    title: "Inicio",
                    description:"Usted está aquí"
                }
                
                let mapRegion = {
                    latitude : Number(latitude),
                    longitude : Number(longitude),
                    latitudeDelta :  0.002515,
                    longitudeDelta : 0.000121
                }
                
                let calle ="";
                let numero="";
                let estado = "";
                let municipio ="";
    
                Geocoder.from({
                    latitude : Number(latitude),
                    longitude :  Number(longitude)
                })
                .then(json => 
                {
                    console.log("json", JSON.stringify(json))
                    json.results[0].address_components.forEach((reg =>{
                        
                        switch(reg.types[0])
                                {
                                    case "street_number" :
                                        // numero = reg.long_name
                                        break;
                                    case "route" :
                                        // calle = reg.long_name
                                        break;
                                    case "locality" :
                                        // municipio = reg.long_name
                                        break; 
                                    case "administrative_area_level_1" :
                                        if (reg.long_name =="Ciudad de México" )
                                        {
                                            json.results[0].address_components.forEach((reg =>{
                                                console.log(json.results[0].formatted_address)
                                                let municipioCDMX = json.results[0].formatted_address.split(",");
                                                
                                                switch(reg.types[0])
                                                {
                                                    case "street_number" :
                                                        numero = reg.long_name
                                                        break;
                                                    case "route" :
                                                        calle = reg.long_name
                                                        break;
                                                    case "political" :
                                                        municipio = municipioCDMX[2]
                                                        break; 
                                                    case "administrative_area_level_1" :
                                                        estado = reg.long_name
                                                        break; 
                                                }
                                                
                                            }))
                                        }
                                        else
                                        {
                                            json.results[0].address_components.forEach((reg =>{
                                                console.log(reg.types[0])
                                            
                                                switch(reg.types[0])
                                                {
                                                    case "street_number" :
                                                        numero = reg.long_name
                                                        break;
                                                    case "route" :
                                                        calle = reg.long_name
                                                        break;
                                                    case "locality" :
                                                        municipio = reg.long_name
                                                        break; 
                                                    case "administrative_area_level_1" :
                                                        estado = reg.long_name
                                                        break; 
                                                }
                                                
                                            }))
                                        }
                                        break; 
                        }
                    }))

                    setEstado(estado.toUpperCase())
                    setMunicipio(municipio.toUpperCase())
                    console.log("estado.toUpperCase()", estado.toUpperCase())
                    console.log("municipio.toUpperCase()", municipio.toUpperCase(),"Localizacioninicial")


                    cargarEstados(estado.toUpperCase())
                    cargarMunicipios(estado.toUpperCase(), municipio.toUpperCase(),"Localizacioninicial" )
                    setDireccion(`${calle} ${numero}`)
                    setIsSetInicial(true)
                    setIsDestino(false)
                })
                .catch(error => console.log(error));

                setRegion(mapRegion)
                setInicial(location)
            },
            (err) => reject({ err }), 
            { enableHighAccuracy: false }
        );
    }



    const showDatepicker = () => {
        setShow(true);
    };

    const showTimepicker = () => {
        setShowTime(true);
    };

  

    const handleSignIn = () => {
       if (direccion!="" ){

           console.log({
               longRegistro,
               latRegistro
           })
        if (latRegistro!="" && longRegistro!="" && markerInicial!="") {
            
                let seEncuentraDireccion = coincideDireccion ? 1 :0 
               navigation.navigate("TestigoScreen", {direccion,markerInicial, markerDestino, estado, municipio, seEncuentraDireccion, latRegistro, longRegistro });
        }
        else {
        Alert.alert("Información", "Verifique que los permisos de ubicación, para continuar")

        }
       }
       else{
        Alert.alert("Información", "Complete los campos obligatorios")
       }
    }

  
    const setDestination = (t) => {
        setIsDestino(true)
        
        let mark = markerInicial
        console.log(mark)

        let location = {
            key : "2",
            coordinate:{
                latitude: Number(t.latitude),
                longitude: Number(t.longitude)
            },
            title: "Testigo",
            description:"Testigo"
        }
        // setRegion(mapRegion)

        setDestino(location)
        Geocoder.from({
            latitude : Number(t.latitude),
            longitude :  Number(t.longitude)
        })
        .then(json => 
        {
            console.log(JSON.stringify(json))
            let calle ="";
            let numero="";
            let estado = "";
            let municipio ="";

            json.results[0].address_components.forEach((reg =>{
                console.log(reg.types[0])
              
                switch(reg.types[0])
                                {
                                    case "street_number" :
                                        // numero = reg.long_name
                                        break;
                                    case "route" :
                                        // calle = reg.long_name
                                        break;
                                    case "locality" :
                                        // municipio = reg.long_name
                                        break; 
                                    case "administrative_area_level_1" :
                                        if (reg.long_name =="Ciudad de México" )
                                        {
                                            json.results[0].address_components.forEach((reg =>{
                                                console.log(json.results[0].formatted_address)
                                                let municipioCDMX = json.results[0].formatted_address.split(",");
                                                
                                                switch(reg.types[0])
                                                {
                                                    case "street_number" :
                                                        numero = reg.long_name
                                                        break;
                                                    case "route" :
                                                        calle = reg.long_name
                                                        break;
                                                    case "political" :
                                                        municipio = municipioCDMX[2]
                                                        break; 
                                                    case "administrative_area_level_1" :
                                                        estado = reg.long_name
                                                        break; 
                                                }
                                                
                                            }))
                                        }
                                        else
                                        {
                                            json.results[0].address_components.forEach((reg =>{
                                                console.log(reg.types[0])
                                            
                                                switch(reg.types[0])
                                                {
                                                    case "street_number" :
                                                        numero = reg.long_name
                                                        break;
                                                    case "route" :
                                                        calle = reg.long_name
                                                        break;
                                                    case "locality" :
                                                        municipio = reg.long_name
                                                        break; 
                                                    case "administrative_area_level_1" :
                                                        estado = reg.long_name
                                                        break; 
                                                }
                                                
                                            }))
                                        }
                                        break; 
                        }

                
            }))

            console.log("Municipio 126", municipio)
            setEstado(estado.toUpperCase())
            setMunicipio(municipio.toUpperCase())
            
            cargarEstados(estado.toUpperCase())
            cargarMunicipios(estado.toUpperCase(), municipio.toUpperCase(),"setDestination")
            
            setDireccion(`${calle} ${numero}`)
            setIsSetInicial(false)
            setIsDestino(true)
        })
        .catch(error => console.log(error));
    }

    const centerPosition = async() => {
        
        Geolocation.getCurrentPosition(
            (info) => {
                const { latitude, longitude } = info.coords
                
                let location = {
                    key : "1",
                    coordinate:{
                        latitude: Number(latitude),
                        longitude: Number(longitude)
                    },
                    title: "Inicial",
                    description:"Punto de inicio"
                }
                
                
                let calle ="";
                let numero="";
                let estado = "";
                let municipio ="";

    
                Geocoder.from({
                    latitude : Number(latitude),
                    longitude :  Number(longitude)
                })
                .then(json => 
                {
                        
                    json.results[0].address_components.forEach((reg =>{
                        console.log(reg)
                        switch(reg.types[0])
                                {
                                    case "street_number" :
                                        // numero = reg.long_name
                                        break;
                                    case "route" :
                                        // calle = reg.long_name
                                        break;
                                    case "locality" :
                                        // municipio = reg.long_name
                                        break; 
                                    case "administrative_area_level_1" :
                                        if (reg.long_name =="Ciudad de México" )
                                        {
                                            json.results[0].address_components.forEach((reg =>{
                                                console.log(json.results[0].formatted_address)
                                                let municipioCDMX = json.results[0].formatted_address.split(",");
                                                
                                                switch(reg.types[0])
                                                {
                                                    case "street_number" :
                                                        numero = reg.long_name
                                                        break;
                                                    case "route" :
                                                        calle = reg.long_name
                                                        break;
                                                    case "political" :
                                                        municipio = municipioCDMX[2]
                                                        break; 
                                                    case "administrative_area_level_1" :
                                                        estado = reg.long_name
                                                        break; 
                                                }
                                                
                                            }))
                                        }
                                        else
                                        {
                                            json.results[0].address_components.forEach((reg =>{
                                                console.log(reg.types[0])
                                            
                                                switch(reg.types[0])
                                                {
                                                    case "street_number" :
                                                        numero = reg.long_name
                                                        break;
                                                    case "route" :
                                                        calle = reg.long_name
                                                        break;
                                                    case "locality" :
                                                        municipio = reg.long_name
                                                        break; 
                                                    case "administrative_area_level_1" :
                                                        estado = reg.long_name
                                                        break; 
                                                }
                                                
                                            }))
                                        }
                                        break; 
                        }

                    }))

                    
                    setEstado(estado.toUpperCase())
                    setMunicipio(municipio.toUpperCase())
                    
                    cargarEstados(estado.toUpperCase())
                    cargarMunicipios(estado.toUpperCase(), municipio.toUpperCase(),"centerPosition")

                    setDireccion(`${calle} ${numero}`)
                    setIsSetInicial(true)
                    setIsDestino(false)
                })
                .catch(error => console.log(error));

               
                setInicial(location)
                mapViewRef.current?.animateToRegion(
                    {
                        latitude : Number(latitude),
                        longitude : Number(longitude),
                        latitudeDelta :  0.002515,
                        longitudeDelta : 0.000121
                    },
                    1000
                ), 
                error =>{
                    console.log(error)
                }
            },
            (err) => reject({ err }), 
            { enableHighAccuracy: false }
        );

    }

    const reject = (err)=> {
        console.log("err", err)
        Alert.alert("Localización", err.err.message)
    }

    return (
         <View View style = {styles.container} > 
                {
                    visibleLoading ?
                    <ModalLoading visible={visibleLoading}/>
                    :null
                } 
                <Header id_usuario={id_usuario} nombre={nombre} />
                  
                <ScrollView style={styles.vContainer}  contentContainerStyle={{ alignItems:'center', justifyContent: 'center' }}>
                    <View style={{ width:'80%'}}>
                        {/* <Text style={{color:COLORS.black, textAlign:'center'}}>lat: {region.longitude}</Text>
                        <Text style={{color:COLORS.black, textAlign:'center'}}>long:{region.latitude}</Text> */}
                        {
                            isSetInicial  && !isDestino?
                            <View style={styles.vMapa}>
                                {/* <Text style={{color:COLORS.black, textAlign:'center'}}>INICIAL lat: {markerInicial.coordinate.latitude },{ markerInicial.coordinate.longitude}</Text> */}
                                <MapView
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={region}
                                    style={styles.map}
                                    // ref={mapRef}
                                    ref={ (el) => mapViewRef.current = el }
                                >
                                    <Marker
                                        key={markerInicial.index}
                                        coordinate={markerInicial.coordinate}
                                        // title={markerInicial.title}
                                        // description={markerInicial.description}
                                        onDragEnd={(e) => setDestination(e.nativeEvent.coordinate)}
                                        draggable
                                    >
                                            <View style={styles.markerIcon}>
                                                <View style={styles.vTitleMarker}>
                                                    <Text style={styles.titleMarker}>{markerInicial.description}</Text>
                                                </View>
                                                <Image 
                                                    source={icons.pinHere}
                                                    style= {styles.vIcon}
                                                />
                                            </View>
                                    </Marker>
                                   
                                </MapView>
                                <ButtonFloat 
                                    iconName={"compass"} 
                                    color={COLORS.primary} 
                                    textColor={"red"} 
                                    handleTouch={centerPosition}
                                    bottom={1}
                                />
                            </View>
                            : isDestino && !isSetInicial?
                            <View style={styles.vMapa}>
                                {/* <Text style={{color:COLORS.darkGray, textAlign:'center'}}>YA HAY Destino lat: {markerInicial.coordinate.latitude },{ markerInicial.coordinate.longitude}</Text>
                                <Text style={{color:COLORS.darkGray, textAlign:'center'}}>YA HAY Destino lat: {markerDestino.coordinate.latitude },{ markerDestino.coordinate.longitude}</Text> */}
                                <MapView
                                    provider={PROVIDER_GOOGLE}
                                    initialRegion={region}
                                    style={styles.map}
                                    // ref={mapRef}
                                    ref={ (el) => mapViewRef.current = el }
                                >
                                        <Marker
                                            key={markerInicial.index}
                                            coordinate={markerInicial.coordinate}
                                            // title={markerInicial.title}
                                            // description={markerInicial.description}
                                        >
                                            <View style={styles.marker}>
                                                <View style={styles.markerIcon}>
                                                        <View style={styles.vTitleMarker}>
                                                            <Text style={styles.titleMarker}>{markerInicial.description}</Text>
                                                        </View>
                                                        <Image 
                                                            source={icons.pinHere}
                                                            style= {styles.vIcon}
                                                        />
                                                </View>
                                            </View>
                                        </Marker>
                                        <Marker
                                            key={markerDestino.index}
                                            coordinate={markerDestino.coordinate}
                                            // title={markerDestino.title}
                                            // description={markerDestino.description}
                                            onDragEnd={(e) => setDestination(e.nativeEvent.coordinate)}
                                            draggable
                                        >
                                            <View style={styles.marker}>
                                                <View style={styles.markerIcon}>
                                                        <View style={styles.vTitleMarker}>
                                                            <Text style={styles.titleMarker}>{markerDestino.description}</Text>
                                                        </View>
                                                        <Image 
                                                            source={icons.pinMove}
                                                            style= {styles.vIcon}
                                                        />
                                                </View>
                                            </View>
                                        </Marker>    
                                </MapView>
                                <ButtonFloat 
                                    iconName={"compass"} 
                                    color={COLORS.primary} 
                                    textColor={"red"} 
                                    handleTouch={centerPosition}
                                    bottom={1}
                                />
                            </View>
                           :null
                        }
                        <View style={{height:100 }}>
                            {
                                coincideDireccion ?
                                <View style={styles.vDireccion}>
                                    <View style={styles.containerInput}>
                                        <View style={styles.containerDetalle}>
                                            <Text style={styles.txtDetalle}>
                                                {"Dirección"}
                                            </Text>
                                        </View>
                                        <Text style={styles.input}>{direccion} </Text>
                                    </View>
                                </View>
                                :
                                <Input 
                                    onChangeText={text => setDireccion(text)}
                                    value={direccion}
                                    placeholder = "Ingrese la dirección"
                                    titulo = "Dirección"
                                    color   = {COLORS.trasparent}
                                    colorFont  = {COLORS.gray}
                                    placeholderColor = {COLORS.lightgray}
                                />
                            }
                            
                        </View>
                        <View style={styles.containerDetalle}>
                                            <Text style={styles.txtDetalle}>
                                                {"¿Te encuentras en esta dirección?"}
                                            </Text>
                                            <View style={styles.vCoincideDireccion}>
                                                <TouchableOpacity style={styles.radioButton} onPress= { () => setCoincideDireccion(!coincideDireccion)}>
                                                        {
                                                            !coincideDireccion?
                                                            <Icon
                                                                name = {"circle-o"}
                                                                color = {COLORS.secondary}
                                                                size= {20}
                                                            />:
                                                            <Icon
                                                                name = {"circle"}
                                                                color = {COLORS.secondary}
                                                                size= {20}
                                                            />
                                                        }
                                                    <Text style={styles.txtRadio}>{"SI"} </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.radioButton} onPress= { () => setCoincideDireccion(!coincideDireccion)}>
                                                        {
                                                            !coincideDireccion?
                                                            <Icon
                                                                name = {"circle"}
                                                                color = {COLORS.secondary}
                                                                size= {20}
                                                            />:
                                                            <Icon
                                                            name = {"circle-o"}
                                                            color = {COLORS.secondary}
                                                            size= {20}
                                                        />
                                                        }
                                                    <Text style={styles.txtRadio}>{"NO"} </Text>
                                                </TouchableOpacity>
                                            </View>
                                            
                                            <View style={styles.vPicker}>
                                                    <View style={styles.titlePicker}>
                                                        <Text style={styles.titleInputText}>Estado</Text>
                                                    </View>
                                                    <Picker
                                                        selectedValue={estadoID}
                                                        style={styles.picker}
                                                        onValueChange={(itemValue, itemIndex) =>{
                                                            // setVisibleLoading(true)
                                                            let registro = entidadesPicker.find(x => x.key == itemValue);
                                                            if (registro) {
                                                                setEstadoDesc(registro.entidad);
                                                                setEstado(registro.entidad)
                                                                cargarMunicipios(registro.entidad)
                                                            }
                                                            setEstadoID(itemValue)
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
                                                            selectedValue={municipioID}
                                                            style={styles.picker}
                                                            onValueChange={(itemValue, itemIndex) =>{
                                                                
                                                                let registro = municipiosPicker.find(x => x.municipioid == itemValue);
                                                                if (registro) {
                                                                    setMunicipioDesc(registro.municipio);
                                                                    setMunicipio(registro.municipio)
                                                                }
                                                                setMunicipioID(itemValue)
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
                                            } 
                        </View>
                        
                    </View>
                </ScrollView>
                            
               <View style={styles.footer}>
                    <Button  name={"Empezar registro"} color={COLORS.primary} textColor={COLORS.white} handleTouch={handleSignIn} />
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
        
      width:'100%',
      backgroundColor:COLORS.white,
      borderTopEndRadius:50,
      borderTopLeftRadius:50
     },
    map: {
        height: 270,
        width: 270
    },
    vMapa:{
        height:300,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.white,
        borderRadius:10,
        paddingHorizontal:20,
        paddingVertical:20,
        marginVertical:10
    },
    vCoincideDireccion: {
        flexDirection:'row',
        justifyContent:'space-around'
    },
     radioButton :{
        height:40,
        width : '50%',
        // marginVertical : 10,
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row',
        marginHorizontal:20
     },
     txtRadio :{
         marginLeft:10,
         color:COLORS.darkGray,
         fontSize:18
     },
     vDireccion: {
        // width:250,
        height:70,       
        // borderRadius:10,
        marginVertical:20, 
        flexDirection:'row',
        alignItems: 'center',
        borderBottomWidth:0.5,
        borderBottomColor: COLORS.gray,

     },
     containerInput:{
         height: '100%',
         width: '100%',
         alignItems:'flex-start',
         justifyContent:'center',
         marginLeft:5,
         
     },
     input: {
         fontSize:13,
         width: '100%',
         color: COLORS.gray,
         marginVertical:10,
         marginLeft:5,
     },
     txtDetalle:{
         color:COLORS.secondary,
         textAlign:'justify',
         fontWeight:'bold'
     },
     markerIcon:{
         height:70,
         width:50,
         borderRadius:15,
         alignItems:'center',
         justifyContent:'space-around',
        //  backgroundColor:'#2C41BF'
     } , 
     marker :{
        //  height:60,
        //  width:60,
        //  borderRadius: 20,
        //  alignItems:'center',
        //  justifyContent:'center',
        // //  backgroundColor:'purple'
     },
     vIcon:{ 
         height:40,
         width:40,
     },
     vTitleMarker: {
        height:25,
        width:'100%',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:COLORS.secondary,
        borderRadius:5
     },
     titleMarker: {
        fontSize:9,
        textAlign:'center',
        color: COLORS.white
     },
     vPicker :{
         height:60,
         width:'96%',
         marginTop: 20,
         borderBottomColor:'gray',
         borderBottomWidth:0.5,
        //  backgroundColor:'purple'
     },
     picker :{
         color:COLORS.secondary
     }
})

export default MapaScreen
;