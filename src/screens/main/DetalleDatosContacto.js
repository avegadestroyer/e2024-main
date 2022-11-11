import React, { useEffect, useState, useContext, Component, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Switch, Image, Alert,Dimensions, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';

import { COLORS, SIZES, images } from '../../constants';
import { AuthContext } from '../../utils/authContext';
import Storage from '../../libs/Storage'
import Input from '../../components/input';
import Button from '../../components/button';
import Header from '../../components/header';
import Title from '../../components/title';
import ItemCurp from '../../components/itemCurp';
import InputIcon from '../../components/inputIcon';
import { catalogo } from '../../ws/catalogos';
import { catalogoCP } from '../../ws/catalogosCP';
import { Fragment } from 'react/cjs/react.production.min';

import entidades from '../../../assets/json/entidades.json'
import Municipios from '../../libs/Localizacion/municipios'
import Distritos from '../../libs/Localizacion/distritos'
import Secciones from '../../libs/Localizacion/secciones'
import { NetInfoStateType } from '@react-native-community/netinfo';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const DetalleDatosContacto = ({ navigation, route }) => {
    const { signOut } = useContext(AuthContext);
    const [celular, setCelular] = useState("");
    const [correo, setCorreo] = React.useState('');
    const [folio, setFolio] = React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [id_usuario, setID] = React.useState('');
    const [estado, setEstado] = React.useState("");
    const [estadoDesc, setEstadoDesc] = React.useState("");
    const [municipio, setMunicipio] = React.useState("");
    const [municipioDesc, setMunicipioDesc] = React.useState("");
    const [colonia, setColonia] = React.useState("");
    const [distrito, setDistrito] = React.useState("");
    const [distritoDesc, setDistritoDesc] = React.useState("");
    const [seccion, setSeccion] = React.useState("");
    const [seccionDesc, setSeccionDesc] = React.useState("");
    const [calle, setCalle] = React.useState("");
    const [exterior, setNoExterior] = React.useState("");
    const [interior, setInterior] = React.useState("");
    const [manzana, setManzana] = React.useState("");
    const [indexEstado, setIndexEstado] = React.useState(0);
    const [facebook, setFacebook] = React.useState("https://www.facebook.com/");
    const [twitter, setTwitter] = React.useState("https://twitter.com/");
    const [instagram, setInstagram] = React.useState("https://www.instagram.com/");
    const [linkedin, setLinkedin] = React.useState("https://mx.linkedin.com/");
    const [categoria, setCategoria] = React.useState("");
    const [Latitud, setLatitud] = React.useState(0)
    const [Longitud, setLongitud] = React.useState(0)

    const [cp, setCP] = React.useState("");   
    const [afin, setAfin] = React.useState(false);
    const [explorar, setExplorar] = React.useState(false);
    const [actor, setActor] = React.useState(false);
    
    const [entidadesPicker, setEntidadesPicker] = useState([])
    const [municipiosPicker, setMunicipiosPicker] = useState([])
    const [coloniasPicker, setColoniasPicker] = useState([])
    const [cpPicker, setCPPicker] = useState([])
    const [seccionPicker, setSeccionPicker] = useState([])
    const [distritoPicker, setDistritosPicker] = useState([])
    const [cargoEntidades, setCargoEntidades] = useState(false)
    const [cargoMunicipios, setCargoMunicipios] = useState(false)
    const [visibleLoading, setVisibleLoading] = React.useState(true)
   
    async function getEncuestas(nuevaEncuesta, persona) 
    {
        console.log("nuevaEncuesta", nuevaEncuesta);
        console.log("nuevaEncuesta", nuevaEncuesta.key);
        let id = persona.curp
        const encuestasGuardadas = await Storage.instance.getJson('encuestasEnviadas');
        console.log("encuestasGuardadas", encuestasGuardadas);
        if (encuestasGuardadas) {
            const index = encuestasGuardadas.findIndex(x => x.curp === id);
            if (index !== undefined) encuestasGuardadas.splice(index, 1);
            
             encuestasGuardadas.push(nuevaEncuesta)
        //   console.log("encuestasGuardadasNueva", JSON.stringify(encuestasGuardadas))

         const stored = Storage.instance.store('encuestasEnviadas', JSON.stringify(encuestasGuardadas))
        //   console.log("stonred", stored )
          if (stored)
          {
                Alert.alert("Información", "Se ha actualizado correctamente");
                navigation.navigate("Root", {});
          }
          else
          {
          }
        }
    }


    const uniqueByKey = (array, key)  => {
        console.table(array)
        return [...new Map(array.map((x) => [x[key], x])).values()];
    }

    useEffect(() => {
        const { persona , PersonaNuevosDatos}  = route.params
        console.log("persona.municipioDesc", persona)
        setEstado(persona.estado)
        let ListaMunicipios = []
        ListaMunicipios = Municipios.instance.getMunicipios(persona.estadoDesc);
       
        
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
        setMunicipio(persona.municipio)
       
        
        fichar(persona.categoria)
        setCelular(persona.celular)
        setCorreo(persona.correo)
        setFacebook(persona.facebook)
        setTwitter(persona.twitter)
        setInstagram(persona.instagram)
        setLinkedin(persona.linkedin)
        setMunicipioDesc(persona.municipioDesc)
        setEstadoDesc(persona.estadoDesc)
        setSeccionDesc(persona.seccionDesc)
        setDistritoDesc(persona.distritoDesc)
        setLatitud(persona.lat)
        setLongitud(persona.lon)
        cargarMunicpiosPrimera(persona)
    }, [cargoEntidades])

   
   const cargarMunicpiosPrimera = async (persona) => {
       let status = await cargarDistritos(persona.estadoDesc, persona.municipioDesc)
       setSeccion(persona.seccion)
   }

    useEffect(() => {
        async function getInfo() 
        {
            const stored = await Storage.instance.getJson('userInfo');
            if (stored) {

                const { informacion } = stored;
                console.log("informacion", informacion)
                setID("Usuario "+ informacion.id_usuario)
                setNombre(informacion.nombre)
            }   
        }
        getInfo()
        cargarCatalogos()
    }, [])

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
        return true;
    }


    const cargarDistritos = async (estado, municipio) => {
        
        console.log("cargarDistritos")
        console.log("estado", estado)
        console.log("municipio", municipio)
        setVisibleLoading(true)
        setDistritosPicker([])
        setSeccionPicker([])
        let ListaDistritos = await Distritos.instance.getDistritosFederal(estado, municipio);
        console.log("municipio", municipio)
        console.log("ListaDistritos", ListaDistritos)
        setDistritosPicker(ListaDistritos)
        setVisibleLoading(false)
        if (ListaDistritos.length==1)
        {
            setVisibleLoading(true)
            setDistrito(ListaDistritos[0].distfedid)
            setDistritoDesc(ListaDistritos[0].distrito)
            let status = await cargarSecciones(ListaDistritos[0].entidad, ListaDistritos[0].municipio, ListaDistritos[0].distrito)  
            return status;          
        }
        else
        {
            setVisibleLoading(false)
        }
    }


    const cargarCatalogos= () => {
        // catalogo("entidades")
        // .then(resultado=> {
        //     // console.log(resultado)
        //     let detalleEntidad = [{
        //         key: "",
        //         entidad: "Selecciona una entidad"
        //     }]

        //     resultado.respuesta.forEach(element => {
        //         let registro = {
        //             key: element.catdetid,
        //             entidad: element.catdetname
        //         }

        //         detalleEntidad.push(registro)
        //     });


        //     console.log(detalleEntidad)
        //     setEntidadesPicker(detalleEntidad)
        //     setCargoEntidades(true)
        //     const { persona , PersonaNuevosDatos}  = route.params
        //     precargaInformacion(persona)
        // })
        // .catch(erro=>{

        // }) 

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
        setCargoEntidades(true)
    }


    const precargaInformacion = (persona) => {
        
       setCelular(persona.celular)
       setCorreo(persona.correo)
       setFacebook(persona.facebook)
       setTwitter(persona.twitter)
       setInstagram(persona.instagram)
       setLinkedin(persona.linkedin)
       fichar(persona.categoria)
    }

    const handleSignIn = () => {

        // let valido = true;

        // if (categoria =="" || celular.length<10 || correo=="" || estado=="" || municipio=="" || distrito=="" )
        // // if (categoria =="" || celular=="" || correo=="" || estado=="" || municipio=="" || distrito=="" || seccion=="" || facebook.length<=25 || twitter.length<=25 || instagram.length<=26 || linkedin.length<=24)
        // {
        //     valido= false;
        // }
        // if (valido){

        //     let { PersonaNuevosDatos, persona } = route.params
        //     console.log(PersonaNuevosDatos)
        //     let adicional = {
        //         celular,
        //         correo,
        //         estado,
        //         estadoDesc,
        //         municipio,
        //         municipioDesc,
        //         colonia,
        //         cp,
        //         distrito,
        //         distritoDesc,
        //         seccion,
        //         seccionDesc,
        //         calle,
        //         exterior,
        //         interior,
        //         manzana,
        //         facebook,
        //         twitter,
        //         linkedin,
        //         instagram,
        //         categoria,
        //         lat: Latitud,
        //         lon: Longitud,
        //     }
            
        //     let encuesta ={
        //         ...PersonaNuevosDatos,
        //         adicional
        //     }
            
        //     // console.log(encuesta)
        //     getEncuestas(encuesta, persona);
        // }
        // else 
        // {
        //     Alert.alert("Información", "Complete los campos obligatorios marcados")
        // }
        navigation.navigate("Root", {});
    }

    const redesSociales = (id) => {
        // navigation.navigate("CheckScreen", {});
    }


    const fichar = (seleccion) => {
        // navigation.navigate("CheckScreen", {});
        switch (seleccion)
        {
            case 20 :
                setAfin(true)
                setActor(false)
                setExplorar(false)
                setCategoria(20)
                break;  
            case 21 :
                setAfin(false)
                setActor(false)
                setExplorar(true)
                setCategoria(21)
                break; 
            case 22 :
                setAfin(false)
                setActor(true)
                setExplorar(false)
                setCategoria(22)
                break;  
        }
    }

    return (
         <View View style = {styles.container} >  
                <Header id_usuario={id_usuario} nombre={nombre} />
                  
                <ScrollView style={styles.vContainer}  contentContainerStyle={{ alignItems:'center', justifyContent: 'center' }}>
                        <Title titulo={"DATOS"} />  
                        <View style={styles.vResponsabilidad}>
                            {/* <Text style={styles.txtResponsabilidad}>Responsabilidad *</Text> */}
                            <Text style={styles.txtResponsabilidad}>ID:  000457</Text>
                        </View>
                        
                        <View style={{width:'80%'}}>

                            {/* <Input 
                                onChangeText={text => setCargo(text)}
                                value={cargo}
                                placeholder = "Ingrese el cargo"
                                titulo = "Cargo *"
                                color   = {COLORS.trasparent}
                                colorFont  = {COLORS.primary}
                                placeholderColor = {COLORS.secondary}
                                // maxLength={18}
                                // autoCapitalize="characters"
                            /> */}
                             {/* <Input 
                                onChangeText={text => setCelular(text)}
                                value={celular}
                                placeholder = "Ingrese el celular"
                                titulo = "Celular *"
                                color   = {COLORS.trasparent}
                                colorFont  = {COLORS.gray}
                                placeholderColor = {COLORS.lightgray}
                                keyboardType = 'phone-pad'
                                maxLength={10}
                                // autoCapitalize="characters"
                            /> */}
                            <View style={styles.vInformacion}>
                                        <Text style={styles.txtTitulo}>
                                            {"Celular"}
                                        </Text >
                                        <Text style={styles.txtInformacion}> 
                                            {celular}
                                        </Text>
                            </View>

                            {/* <Input 
                                onChangeText={text => setCorreo(text)}
                                value={correo}
                                placeholder = "Ingrese el correo electrónico"
                                titulo = "Correo electrónico *"
                                color   = {COLORS.trasparent}
                                colorFont  = {COLORS.gray}
                                placeholderColor = {COLORS.lightgray}
                                keyboardType = 'email-address'
                                // maxLength={18}
                                // autoCapitalize="characters"
                            /> */}
                            <View style={styles.vInformacion}>
                                        <Text style={styles.txtTitulo}>
                                            {"Correo electrónico"}
                                        </Text >
                                        <Text style={styles.txtInformacion}> 
                                            {correo}
                                        </Text>
                            </View>
                            <View style={styles.vTitulo}>
                                    <Text style={styles.titleInputText}>Redes sociales*</Text>
                            </View>

                            {/* <InputIcon 
                                onChangeText={text => setFacebook(text)}
                                placeholder = ""
                                value={facebook}
                                color   = {COLORS.trasparent}
                                colorFont  = {COLORS.gray}
                                placeholderColor = {COLORS.lightgray}
                                icon ={ "facebook"}
                                // maxLength={18}
                                // autoCapitalize="characters"
                            />
                            <InputIcon 
                                onChangeText={text => setTwitter(text)}
                                placeholder = ""
                                value={twitter}
                                color   = {COLORS.trasparent}
                                colorFont  = {COLORS.gray}
                                placeholderColor = {COLORS.lightgray}
                                icon ={ "twitter"}
                                // maxLength={18}
                                // autoCapitalize="characters"
                            />
                             <InputIcon 
                                onChangeText={text => setInstagram(text)}
                                placeholder = ""
                                value={instagram}
                                color   = {COLORS.trasparent}
                                colorFont  = {COLORS.gray}
                                placeholderColor = {COLORS.lightgray}
                                icon ={ "instagram"}
                                // maxLength={18}
                                // autoCapitalize="characters"
                            />
                            <InputIcon 
                                onChangeText={text => setLinkedin(text)}
                                placeholder = ""
                                value={linkedin}
                                color   = {COLORS.trasparent}
                                colorFont  = {COLORS.gray}
                                placeholderColor = {COLORS.lightgray}
                                icon ={ "linkedin"}
                                // maxLength={18}
                                // autoCapitalize="characters"
                            /> */}

                            <View style={[styles.vInformacion, {flexDirection:'row', justifyContent:'space-between', alignItems:'center' }]}>
                                <View style={styles.containerDetalle}>
                                    <Icon
                                        name = {"facebook"}
                                        color = {COLORS.gray}
                                        size= {20}
                                    />
                                </View>
                                <Text style={styles.txtInformacion}> 
                                    {facebook}
                                </Text>
                            </View>
                            <View style={[styles.vInformacion, {flexDirection:'row', justifyContent:'space-between', alignItems:'center' }]}>
                                <View style={styles.containerDetalle}>
                                    <Icon
                                        name = {"twitter"}
                                        color = {COLORS.gray}
                                        size= {20}
                                    />
                                </View>
                                <Text style={styles.txtInformacion}> 
                                    {twitter}
                                </Text>
                            </View>
                            <View style={[styles.vInformacion, {flexDirection:'row', justifyContent:'space-between', alignItems:'center' }]}>
                                <View style={styles.containerDetalle}>
                                    <Icon
                                        name = {"instagram"}
                                        color = {COLORS.gray}
                                        size= {20}
                                    />
                                </View>
                                <Text style={styles.txtInformacion}> 
                                    {instagram}
                                </Text>
                            </View>
                            <View style={[styles.vInformacion, {flexDirection:'row', justifyContent:'space-between', alignItems:'center' }]}>
                                <View style={styles.containerDetalle}>
                                    <Icon
                                        name = {"linkedin"}
                                        color = {COLORS.gray}
                                        size= {20}
                                    />
                                </View>
                                <Text style={styles.txtInformacion}> 
                                    {linkedin}
                                </Text>
                            </View>

                            {/* <View style={styles.vRedesSociales}>
                                    <TouchableOpacity style={styles.btnRedesSociales} onPress= { () => redesSociales(1)}>
                                        <Icon
                                            name = {"facebook-f"}
                                            color = {COLORS.white}
                                            size= {20}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnRedesSociales} onPress= { () => redesSociales(1)}>
                                        <Icon
                                            name = {"twitter"}
                                            color = {COLORS.white}
                                            size= {20}
                                        />
                                    </TouchableOpacity>
                            </View> */}
                            {
                                // entidadesPicker.length>0 && cargoEntidades?
                                //         <View style={styles.vPicker}>
                                //             <View style={styles.titlePicker}>
                                //                 <Text style={styles.titleInputText}>Entidad *</Text>
                                //             </View>
                                //             <Picker
                                //                 selectedValue={estado}
                                //                 style={styles.picker}
                                //                 onValueChange={(itemValue, itemIndex) =>{

                                //                         // console.log(item)
                                //                         let registro = entidadesPicker.find(x => x.key == itemValue);
                                //                         if (registro) {
                                //                             setEstadoDesc(registro.entidad);
                                //                             cargarMunicipios(registro.entidad)
                                //                         }

                                //                         setEstado(itemValue)
                                //                         setIndexEstado(itemIndex)
                                //                         setMunicipio("")
                                //                         setColonia("")
                                //                         setCP("")
                                //                         setColoniasPicker([])
                                //                         setSeccion("")
                                //                         setDistrito("")
                                //                     }
                                //                 }>
                                                
                                //                 {  
                                //                     entidadesPicker.map((item, index) => (
                                //                         <Picker.Item key={item.key} value={item.key} label={item.entidad}/>
                                //                     ))
                                //                 }
                                                                                
                                //                 </Picker>
                                //         </View>
                                //         :null
                            }
                             <View style={styles.vInformacion}>
                                        <Text style={styles.txtTitulo}>
                                            {"Entidad"}
                                        </Text >
                                        <Text style={styles.txtInformacion}> 
                                            {estadoDesc}
                                        </Text>
                            </View>
                            {
                                // municipiosPicker.length>0 ?
                                // <Fragment>
                                //     <View style={styles.vPicker}>
                                //         <View style={styles.titlePicker}>
                                //             <Text style={styles.titleInputText}>Municipio *</Text>
                                //         </View>
                                //         <Picker
                                //             selectedValue={municipio}
                                //             style={styles.picker}
                                //             onValueChange={(itemValue, itemIndex) =>{
                                //                     setMunicipio(itemValue)

                                //                     let registro = municipiosPicker.find(x => x.key == itemValue);
                                //                     if (registro) {
                                //                         setMunicipioDesc(registro.municipio);
                                //                         setDistrito(registro.distrito)
                                //                         cargarDistritos(estadoDesc, registro.municipio)
                                //                         // cargarSecciones(estadoDesc, registro.municipio, registro.distrito)
                                //                     }

                                //                     setColoniasPicker([])
                                //                     setCP("")
                                //                     setSeccion("")
                                //                     // console.log(itemIndex)
                                //                     // cargarMunicipios(itemIndex)
                                                    
                                //                     // cargarColonias(indexEstado,itemIndex)
                                //                 }
                                //             }>
                                            
                                //             {  
                                //                 municipiosPicker.map((item, index) => (
                                //                     <Picker.Item key={item.key} value={item.key} label={item.municipio}/>
                                //                 ))
                                //             }
                                                                            
                                //             </Picker>
                                //     </View>
                                //     {/* <Input 
                                //         onChangeText={text => setDistrito(text)}
                                //         value={distrito}
                                //         placeholder = "Ingrese el distrito"
                                //         titulo = "Distrito *"
                                //         color   = {COLORS.trasparent}
                                //         colorFont  = {COLORS.gray}
                                //         placeholderColor = {COLORS.lightgray}
                                //         // maxLength={18}
                                //         // autoCapitalize="characters"
                                //     /> */}
                                // </Fragment>
                                // :null
                            }
                            <View style={styles.vInformacion}>
                                        <Text style={styles.txtTitulo}>
                                            {"Municipio"}
                                        </Text >
                                        <Text style={styles.txtInformacion}> 
                                            {municipioDesc}
                                        </Text>
                            </View>
                            {/* {
                                distritoPicker.length>0 ?
                                <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Distrito *</Text>
                                        </View>
                                        <Picker
                                            selectedValue={distrito}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                setDistrito(itemValue)
                                                let registro = distritoPicker.find(x => x.key == itemValue);
                                                if (registro) 
                                                {
                                                    setDistritoDesc(registro.distrito)
                                                    cargarSecciones(estadoDesc, registro.municipio, registro.distrito)
                                                }
                                            }
                                            }>
                                            {  
                                                distritoPicker.map((item, index) => (
                                                    <Picker.Item key={item.distfedid} value={item.distfedid} label={item.distrito}/>
                                                ))
                                            }                               
                                            </Picker>
                                </View>:null
                            }  */}
                            <View style={styles.vInformacion}>
                                        <Text style={styles.txtTitulo}>
                                            {"Distrito"}
                                        </Text >
                                        <Text style={styles.txtInformacion}> 
                                            {distritoDesc}
                                        </Text>
                            </View>
                            {/* {
                                coloniasPicker.length>0 ?
                                <>
                                    <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Colonia *</Text>
                                        </View>
                                        <Picker
                                            selectedValue={colonia}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                console.log(coloniasPicker[itemIndex].seccion)
                                                    setColonia(itemValue)
                                                    setCP(coloniasPicker[itemIndex].cp)
                                                    setSeccion(String(coloniasPicker[itemIndex].seccion))
                                                }
                                            }>
                                            
                                            {  
                                                coloniasPicker.map((item, index) => (
                                                    <Picker.Item key={item.key} value={item.key} label={item.colonia}/>
                                                ))
                                            }                               
                                            </Picker>
                                    </View>
                                    <Input 
                                        onChangeText={text => setCP(text)}
                                        value={cp}
                                        placeholder = "Ingrese codigo postal"
                                        titulo = "Código postal"
                                        color   = {COLORS.trasparent}
                                        colorFont  = {COLORS.primary}
                                        placeholderColor = {COLORS.secondary}
                                        keyboardType = 'numeric'
                                        // maxLength={18}
                                        // autoCapitalize="characters"
                                    />
                                </>
                                :null
                            } */}
                            {/* <Input 
                                onChangeText={text => setCargo(text)}
                                value={estado}
                                placeholder = "Ingrese el municipio"
                                titulo = "Municipio *"
                                color   = {COLORS.trasparent}
                                colorFont  = {COLORS.primary}
                                placeholderColor = {COLORS.secondary}
                                // maxLength={18}
                                // autoCapitalize="characters"
                            /> */}
                            
                            {/* {
                                seccionPicker.length>0 ?
                                <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Sección *</Text>
                                        </View>
                                        <Picker
                                            selectedValue={seccion}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                    setSeccion(itemValue)
                                                }
                                            }>
                                            {  
                                                seccionPicker.map((item, index) => (
                                                    <Picker.Item key={item.seccionid} value={item.seccionid} label={item.seccion}/>
                                                ))
                                            }                               
                                            </Picker>
                                    </View>:null
                            } */}
                             <View style={styles.vInformacion}>
                                        <Text style={styles.txtTitulo}>
                                            {"Sección"}
                                        </Text >
                                        <Text style={styles.txtInformacion}> 
                                            {seccionDesc}
                                        </Text>
                            </View>
                            
                          <View style={styles.titlePicker}>
                                        <Text style={styles.titleInputText}>Categoría *</Text>
                          </View>
                          <View style={styles.vFicha}>
                                    {
                                        afin ?
                                        <View style={styles.btnRedesSociales} >
                                            {
                                                afin ?
                                                <Fragment>
                                                    <Icon
                                                        name = {"check-circle"}
                                                        color = {COLORS.secondary}
                                                        size= {30}
                                                    />
                                                    <Text style={styles.txtCategoria}>Afín</Text>
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    <Icon
                                                        name = {"check"}
                                                        color = {"#450d1b"}
                                                        size= {30}
                                                    />
                                                    <Text style={styles.txtCategoria}>Afín</Text>
                                                </Fragment>
                                            }
                                        </View>
                                        :null
                                    }
                                    {
                                        explorar ?
                                        <View style={styles.btnRedesSociales}>
                                            {/* <Icon
                                                name = {"search"}
                                                color = {COLORS.white}
                                                size= {30}
                                            />
                                            <Text>Explorar</Text> */}
                                            {
                                                explorar ?
                                                <Fragment>
                                                    <Icon
                                                        name = {"search"}
                                                        color = {COLORS.secondary}
                                                        size= {30}
                                                    />
                                                    <Text style={styles.txtCategoria}>Explorar</Text>
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    <Icon
                                                        name = {"search"}
                                                        color = {"#450d1b"}
                                                        size= {30}
                                                    />
                                                    <Text style={styles.txtCategoria}>Explorar</Text>
                                                </Fragment>
                                            }
                                        </View>
                                        :null
                                    }
                                    {
                                        actor ?
                                        <View style={styles.btnRedesSociales} >
                                            {
                                                actor ?
                                                <Fragment>
                                                    <Icon
                                                        name = {"star"}
                                                        color = {COLORS.secondary}
                                                        size= {30}
                                                    />
                                                    <Text style={styles.txtCategoria}>Actor Político</Text>
                                                </Fragment>
                                                :
                                                <Fragment>
                                                    <Icon
                                                        name = {"star-o"}
                                                        color = {"#450d1b"}
                                                        size= {30}
                                                    />
                                                    <Text style={styles.txtCategoria}>Actor Político</Text>
                                                </Fragment>
                                            }
                                        </View>
                                        :null
                                    }
                          </View>
                          
                        </View>
                              
                </ScrollView>
               <View style={styles.footer}>
                    <Button  name={"Cerrar"} color={COLORS.primary} textColor={COLORS.white} handleTouch={handleSignIn} />
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
         justifyContent:'flex-end',
         paddingHorizontal:40,
         alignItems:'center',
        //  backgroundColor:'purple'
     },
     txtResponsabilidad:{
         color:COLORS.black,
         fontSize:12
     },
     vRadios :{
         width:'80%',
         height:160,
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
         color:COLORS.black,
         fontSize:15
     },
     vPicker :{
         height:60,
         width:'96%',
         borderBottomColor:'gray',
         borderBottomWidth:0.5,
         marginVertical:20
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
     vRedesSociales :{
        width:'100%',
        height:80,
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginVertical:10
     },
     btnRedesSociales :{
        height:50,
        width:'100%',
        borderRadius:20,
        borderColor: COLORS.secondary,
        borderWidth: 2,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:50,
        alignItems:'center',
        marginVertical:10
     },
     vFicha :{
        width:'100%',
        height:200,
        // flexDirection:'row',
        // justifyContent:'space-evenly',
        marginVertical:20,
        // backgroundColor:'purple',
        alignItems:'stretch',

     },
    txtCategoria:{
        fontSize: 18,
        color:COLORS.secondary
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
    },
    containerDetalle: {
        width:'10%',
        paddingRight:10
    }
     
})

export default DetalleDatosContacto;