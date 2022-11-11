import React, { useEffect, useState, useContext, Component, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Switch, Image, Alert,Dimensions, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
// import Animated from 'react-native-reanimated';

import { COLORS, SIZES, images } from '../../constants';
import { AuthContext } from '../../utils/authContext';
import Storage from '../../libs/Storage'
import Input from '../../components/input';
import Button from '../../components/button';
import Header from '../../components/header';
import Title from '../../components/title';
import ItemCurp from '../../components/itemCurp';
import InputIcon from '../../components/inputIcon';
import { Fragment } from 'react/cjs/react.production.min';
import entidades from '../../../assets/json/entidades.json'
import Municipios from '../../libs/Localizacion/municipios'
import Distritos from '../../libs/Localizacion/distritos'
import Secciones from '../../libs/Localizacion/secciones'
import ModalLoading from '../../components/modalLoading';
import Geolocation from '@react-native-community/geolocation';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const DatosScreen = ({ navigation, route }) => {
    const { signOut } = useContext(AuthContext);
    const [celular, setCelular] = useState("");
    const [correo, setCorreo] = React.useState('');
    const [validateEmail, setValidateEmail] = useState("gray")
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
    const [seccion, setSeccionOr] = React.useState("");
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
    const [visibleLoading, setVisibleLoading] = React.useState(false)
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
   
   
    async function getEncuestas(nuevaEncuesta) 
    {
        console.log("nuevaEncuesta", nuevaEncuesta);
        const encuestasGuardadas = await Storage.instance.getJson('encuestas');
        console.log("encuestasGuardadas", encuestasGuardadas);
        if (encuestasGuardadas) {
          encuestasGuardadas.push(nuevaEncuesta)
          console.log("encuestasGuardadasNueva", JSON.stringify(encuestasGuardadas))

          const stored = Storage.instance.store('encuestas', JSON.stringify(encuestasGuardadas))
          console.log("stonred", stored )
          if (stored)
          {
                Alert.alert("Información", "Se ha guardado correctamente");
                navigation.navigate("Root", {});
          }
          else
          {

          }
        }
        else
        {
          let encuestas = []; 
            encuestas.push(nuevaEncuesta)
            const stored = Storage.instance.store('encuestas', JSON.stringify(encuestas))
            console.log("stonred", stored )
            if (stored)
            {
                Alert.alert("Información", "Se ha guardado correctamente");
                navigation.navigate("Root", {});
                console.log("Se guardo")
            }
            else
            {
                // setLoading(false)
                // setMessage("Se presentó un error")
            }
        }        
    }

    async function validarDatos() 
    {
        // let registro = municipiosPicker.find(x => x.municipioid == itemValue);
        //                                         if (registro) {
        //                                             setMunicipioDesc(registro.municipio);
        //                                             cargarDistritos(estadoResidenciaDesc, registro.municipio)
        //                                         }
        // console.log("getEncuestas",)
        // console.log("curpS ", curpS)
        const encuestasGuardadas = await Storage.instance.getJson('encuestas');
        console.log("encuestasGuardadas ", encuestasGuardadas)
        
        if (encuestasGuardadas) {
            console.log(encuestasGuardadas.length)
            
            let existeCURP = false;
            encuestasGuardadas.forEach(reg => {
                console.log(reg.celular)
                console.log(reg.correo)

                if (reg.adicional.celular == celular || reg.adicional.correo == correo){
                    existeCURP = true
                }
            })
            console.log("existe encuestasGuardadas ? ",existeCURP)
            return existeCURP;
        }
        else
        {
            const encuestasEnviadas = await Storage.instance.getJson('encuestasEnviadas');
            console.log("encuestasEnviadas ", encuestasEnviadas)
            if (encuestasEnviadas) {
                console.log(encuestasEnviadas.length)
                let existeCURP = false;
                encuestasEnviadas.forEach(reg => {
                    console.log(reg.adicional.celular)
                    console.log(reg.adicional.correo)

                    if (reg.adicional.celular == celular || reg.adicional.correo == correo){
                        existeCURP = true
                    }
                })
                console.log("existe encuestasEnviadas ? ",existeCURP)
                return existeCURP;
            }
            else
            {
                return false;   
            }     

        }     
       
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

        Geolocation.getCurrentPosition(info => {
            const { latitude, longitude } = info.coords
            setLatitud(latitude)
            setLongitud(longitude)
        });
    }, [])

    const cargarMunicipios = (index) => {
        console.log(index)
        setVisibleLoading(true)
        setMunicipiosPicker([])
        setDistritosPicker([])
        setSeccionPicker([])
         
        let ListaMunicipios = []
        ListaMunicipios = Municipios.instance.getMunicipios(index);
       
        
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
        
        console.log("cargarDistritos",estado)
        console.log("cargarDistritosas",municipio)
        setVisibleLoading(true)
        setDistritosPicker([])
        setSeccionPicker([])
        let ListaDistritos = await Distritos.instance.getDistritosFederal(estado, municipio);
        
        setDistritosPicker(ListaDistritos)
        setVisibleLoading(false)
        if (ListaDistritos.length==1)
        {
            setVisibleLoading(true)
            setDistrito(ListaDistritos[0].distfedid)
            setDistritoDesc(ListaDistritos[0].distrito)
            await cargarSecciones(ListaDistritos[0].entidad, ListaDistritos[0].municipio, ListaDistritos[0].distrito)            
        }
        else if (ListaDistritos.length>1)
        {
            setDistrito(ListaDistritos[0].distfedid)
            setDistritoDesc(ListaDistritos[0].distrito)
            setVisibleLoading(false)
        }
        else{
            setVisibleLoading(false)

        }
    }

    const cargarSecciones = async (estado, municipio , distrito) => {
        setVisibleLoading(true)
        setSeccionPicker([])

        let ListaSecciones = []
        ListaSecciones = await Secciones.instance.getSecciones(estado, municipio, distrito);
        
     
        setSeccionPicker(ListaSecciones)
        
        if (ListaSecciones.length >= 1)
        {
            console.log("sesccionid ", ListaSecciones[0].seccionid)
            console.log("sesccion ", ListaSecciones[0].seccion)
            setSeccionOr(ListaSecciones[0].seccionid)
            setSeccionDesc(ListaSecciones[0].seccion)
        }
        setVisibleLoading(false)
    }

   

    const cargarCatalogos= () => {
        let catalogo_entidades = entidades;
        let detalleEntidad = [{
            key: "",
            entidad: "Selecciona un estado"
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
    }

    const mostrarModal = (mensaje) => {
        Alert.alert("Información", mensaje)
    }

    const handleSignIn = async() => {
        let { Persona } = route.params
        let valido = true;
        
        console.log(facebook.length)
        console.log(twitter.length)
        console.log(instagram.length)
        console.log(linkedin.length)
        // if (categoria =="" || celular.length<10 || correo=="" || estado=="" || municipio=="" || distrito=="" ||seccion=="" || !handleValidEmail(correo))
        // if (categoria =="" || celular=="" || correo=="" || estado=="" || municipio=="" || distrito=="" || seccion=="" || facebook.length<=25 || twitter.length<=25 || instagram.length<=26 || linkedin.length<=24)
        if ( celular.length<10 || correo=="" || estado=="" || municipio=="" || distrito=="" ||seccion=="" || !handleValidEmail(correo))
        {
            valido= false;
        }

        let validarDuplicado = await validarDatos()
        if (validarDuplicado ) 
        {
            valido = false
        }

        console.log(validarDuplicado)

        
        if (valido)
        {
            let adicional = {
                celular,
                correo,
                estado,
                estadoDesc,
                municipio,
                municipioDesc,
                colonia,
                cp,
                distrito,
                distritoDesc,
                seccion,
                seccionDesc,
                calle,
                exterior,
                interior,
                manzana,
                facebook,
                twitter,
                linkedin,
                instagram,
                categoria,
                lat: Latitud,
                lon: Longitud
            }

            let encuesta ={
                ...Persona,
                adicional,
            }

            console.log("encuesta", JSON.stringify(encuesta))
             getEncuestas(encuesta);
        }
        else
        { 
            if (validarDuplicado) {
                Alert.alert("Información", "El celular y/o correo ya se encuentran registrados, intente con otros datos")
            }
            else{

                Alert.alert("Información", "Complete los campos obligatorios marcados")
            }
        }

        console.log(valido)
        
    }

    const redesSociales = (id) => {
        // navigation.navigate("CheckScreen", {});
    }


    const fichar = (seleccion) => {
        // navigation.navigate("CheckScreen", {});
        switch (seleccion)
        {
            case 1 :
                setAfin(true)
                setActor(false)
                setExplorar(false)
                setCategoria(20)
                break;  
            case 2 :
                setAfin(false)
                setActor(false)
                setExplorar(true)
                setCategoria(21)
                break; 
            case 3 :
                setAfin(false)
                setActor(true)
                setExplorar(false)
                setCategoria(22)
                break;  
        }
    }

    const handleValidEmail = (value) =>{ 
        console.log("value", value)
        setCorreo(value);  
      if(value.length> 1){
        var letters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if (value.match(letters)) {
          setValidateEmail("gray");
          return true;
        } 
        else 
        {
          setValidateEmail("red");
        } 
        return false;       
      }
      else{
        setValidateEmail("red");
        return false;  
      }
      
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
                             <Input 
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
                            />

                            <Input 
                                onChangeText={text => handleValidEmail(text)}
                                onSubmitEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                                value={correo}
                                placeholder = "Ingrese el correo electrónico"
                                titulo = "Correo electrónico *"
                                color   = {COLORS.trasparent}
                                colorFont  = {COLORS.gray}
                                placeholderColor = {COLORS.lightgray}
                                keyboardType = 'email-address'
                                autoCapitalize='none'
                                
                                // maxLength={18}
                                // autoCapitalize="characters"
                            />
                            {
                                validateEmail=="red" ?
                                    <Animated.View animation="fadeInLeft" duration={500}>
                                        <Text style={{color:'red', marginLeft:10, marginBottom:40}}>Ingrese un correo válido</Text>
                                    </Animated.View>
                                :null
                            }
                            {/* <View style={styles.vTitulo}>
                                    <Text style={styles.titleInputText}>Redes sociales*</Text>
                            </View> */}

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

                            <View style={styles.vPicker}>
                                <View style={styles.titlePicker}>
                                    <Text style={styles.titleInputText}>Estado registrado en el INE *</Text>
                                </View>
                                <Picker
                                    selectedValue={estado}
                                    style={styles.picker}
                                    onValueChange={(itemValue, itemIndex) =>{

                                        
                                            let registro = entidadesPicker.find(x => x.key == itemValue);
                                            if (registro) {
                                                setEstadoDesc(registro.entidad);
                                            }

                                            setEstado(itemValue)
                                            cargarMunicipios(registro.entidad)
                                            setIndexEstado(itemIndex)
                                            setMunicipio("")
                                            setColonia("")
                                            setCP("")
                                            setColoniasPicker([])
                                            // setSeccion("")
                                            setDistrito("")
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
                                <Fragment>
                                    <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Municipio *</Text>
                                        </View>
                                        <Picker
                                            selectedValue={municipio}
                                            style={styles.picker}
                                            onValueChange={async (itemValue, itemIndex) =>{
                                                    setMunicipio(itemValue)

                                                    let registro = municipiosPicker.find(x => x.key == itemValue);
                                                    if (registro) {
                                                        setMunicipioDesc(registro.municipio);
                                                        setDistrito(registro.distrito)

                                                        // 
                                                        console.log(registro.municipio)
                                                        console.log(estadoDesc)
                                                        await cargarDistritos(estadoDesc, registro.municipio)
                                                    }

                                                    setColoniasPicker([])
                                                    setCP("")
                                                    // setSeccion("")
                                                    // console.log(itemIndex)
                                                    // cargarMunicipios(itemIndex)
                                                    
                                                    // cargarColonias(indexEstado,itemIndex)
                                                }
                                            }>
                                            
                                            {  
                                                municipiosPicker.map((item, index) => (
                                                    <Picker.Item key={item.key} value={item.key} label={item.municipio}/>
                                                ))
                                            }
                                                                            
                                            </Picker>
                                    </View>
                                    {/* <Input 
                                        onChangeText={text => setDistrito(text)}
                                        value={distrito}
                                        placeholder = "Ingrese el distrito"
                                        titulo = "Distrito *"
                                        color   = {COLORS.trasparent}
                                        colorFont  = {COLORS.gray}
                                        placeholderColor = {COLORS.lightgray}
                                        // maxLength={18}
                                        // autoCapitalize="characters"
                                    /> */}
                                </Fragment>
                                :null
                            }
                            {
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
                                                let registro = distritoPicker.find(x => x.distfedid == itemValue);
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
                            }
                            
                            {
                                seccionPicker.length>0 ?
                                <View style={styles.vPicker}>
                                        <View style={styles.titlePicker}>
                                            <Text style={styles.titleInputText}>Sección *</Text>
                                        </View>
                                        <Picker
                                            selectedValue={seccion}
                                            style={styles.picker}
                                            onValueChange={(itemValue, itemIndex) =>{
                                                console.log(itemValue)
                                                    setSeccionOr(itemValue)
                                                    let registro = seccionPicker.find(x => x.seccionid == itemValue);
                                                    if (registro) 
                                                    {
                                                       setSeccionDesc (registro.seccion)
                                                    }
                                                }
                                            }>
                                            {  
                                                seccionPicker.map((item, index) => (
                                                    <Picker.Item key={item.seccionid} value={item.seccionid} label={item.seccion}/>
                                                ))
                                            }                               
                                            </Picker>
                                    </View>:null
                            }
                            
                            
                          

                           
                          {/* <View style={styles.titlePicker}>
                                        <Text style={styles.titleInputText}>Categoría *</Text>
                          </View> */}
                          {/* <View style={styles.vTooltip}>
                                <Text style={styles.titleInputText}>Categoría *</Text>
                                <TouchableOpacity style={styles.btnTooltip} onPress= { () => mostrarModal("Corresponde a la simpatía que tiene la persona con el proyecto")}>
                                        <Icon
                                                name = {"question-circle-o"}
                                                color = {COLORS.secondary}
                                                size= {15}
                                            />
                                </TouchableOpacity>
                            </View> */}
                          {/* <View style={styles.vFicha}>
                                    <TouchableOpacity style={styles.btnRedesSociales} onPress= { () => fichar(1)}>
                                        {
                                            afin ?
                                            <Fragment>
                                                <Icon
                                                    name = {"check-circle"}
                                                    color = {COLORS.white}
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
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnRedesSociales} onPress= { () => fichar(2)}>
                                        {/* <Icon
                                            name = {"search"}
                                            color = {COLORS.white}
                                            size= {30}
                                        />
                                        <Text>Explorar</Text> 
                                        {
                                            explorar ?
                                            <Fragment>
                                                <Icon
                                                    name = {"search"}
                                                    color = {COLORS.white}
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
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnRedesSociales} onPress= { () => fichar(3)}>
                                        {
                                            actor ?
                                            <Fragment>
                                                <Icon
                                                    name = {"star"}
                                                    color = {COLORS.white}
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
                                    </TouchableOpacity>
                          </View> */}
                          
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
        borderRadius:50,
        backgroundColor: COLORS.primary,
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
        color:COLORS.white
    },
    vTooltip:{
        height:50,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'purple'
    },
    btnTooltip:{
        width:30,
        height:30,
        // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    }
     
})

export default DatosScreen;