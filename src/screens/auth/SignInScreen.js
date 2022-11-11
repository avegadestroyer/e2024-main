import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ImageBackground, ActivityIndicator, SafeAreaView, ColorPropType, Linking } from 'react-native';
import { icons, images, COLORS, SIZES } from '../../constants'
import { AuthContext } from '../../utils/authContext';
import Storage from '../../libs/Storage'
import Input from '../../components/input'
import Button from '../../components/button'
import InputPassword from '../../components/inputPassword';
import Usuarios from '../../libs/usuarios'
// const RNFS = require('react-native-fs');
import md5 from 'md5';
import { login } from '../../ws/login'
// import { getUsuarios } from '../../ws/usuarios';
import { TouchableOpacity } from 'react-native-gesture-handler';



const SignInScreen = ({ navigation }) => {
    const [emailAddress, setemailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [SignUpErrors, setSignUpErrors] = useState({});
    const { signIn, signUp } = useContext(AuthContext);
    // const [input_User, onChangeinput_User] = React.useState('5539873382');
    // const [input_Password, onChangeinput_Password] = React.useState('1710');
    // const [input_User, onChangeinput_User] = React.useState('prueba@email.com');
    // const [input_Password, onChangeinput_Password] = React.useState('mx01234');
    const [input_User, onChangeinput_User] = React.useState('');
    const [input_Password, onChangeinput_Password] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(true);
    const [listaUsuarios, setListaUsuario] = useState([]);
    
   
    const llamarSoporte = () =>{
        let phoneNumber="3122256089"
        Linking.openURL(`tel:${phoneNumber}`)
    }
    const showPass = () => {
        setShowPassword(!showPassword)
    }

    const syncUsers= () => {
        setLoading(true)
        setMessage("Espere un momento")
        getUsuarios()
        .then(response=> {
            console.log("response", response)
            const { respuesta } = response
            // console.log("respuesta", respuesta )
            // console.log("respuesta", respuesta.length )

            var path = RNFS.DocumentDirectoryPath + '/ed2341231.frt';
            
            RNFS.writeFile(path,JSON.stringify(respuesta) , 'utf8')
            .then(res => {
                setLoading(false)
                setMessage("Se ha actualizado la información correctamente")
            })
            .catch(err=> {
                setLoading(false)
                setMessage("Se ha presentado un error, intente de nuevo")
            })

            // const stored = Storage.instance.store('usuarios_descargados', JSON.stringify(respuesta))
            // if (stored)
            // {

            //     setLoading(false)
            //     setListaUsuario(respuesta)
            //     setMessage("Se ha actualizado la información correctamente")
            // }
            // else
            // {
            //     setLoading(false)
            //     setMessage("Se presentó un error")
            // }
        })
        .catch(er=> {
            console.log("e", er)
        })
    }

    const handleSignInLocalFILE = async  () => {
        setLoading(true)
        setMessage("Espere un momento")
        let user = input_User
        let pass = input_Password
        if (user!= "" && pass!="" )
        {
            try {
                let path = RNFS.DocumentDirectoryPath + '/ed2341231.frt';
                const file = await RNFS.readFile(path);
                // console.log("tipo", typeof(file))
                // console.log("file", file)
                let usuariosSincronizados = JSON.parse(file)
    
                if (usuariosSincronizados.length> 0) {
                    let passwordCifrado = md5(pass)
                    let usuarioLogueado = usuariosSincronizados.find(e=> e.ux==user && e.px==passwordCifrado) 
                    console.log("usuario", usuarioLogueado)
                    if (usuarioLogueado){
                         let informacionUsuarios = {
                                        informacion : {
                                            usuario : usuarioLogueado.ux,
                                            id_usuario : usuarioLogueado.uid,
                                            nombre: usuarioLogueado.ux
                                        }
                                    }
                        const stored = Storage.instance.store('userInfo', JSON.stringify(informacionUsuarios))
                        if (stored)
                        {
                            setPassword(input_Password)
                            setemailAddress(input_User)
                            signIn({
                                emailAddress:input_User,
                                password:input_Password
                            });
                        }
                        else
                        {
                            setLoading(false)
                            setMessage("Se presentó un error, intente de nuevo")
                        }
                    }
                    else
                    {
                        setLoading(false)
                        setMessage("Usuario y/o contraseña no encontrados");
                    }
                }
                else
                {
                    setLoading(false)
                    setMessage("Es necesario que actualice la información, para continuar")
                }
            }
            catch(exr) {
                setLoading(false)
                setMessage("Es necesario que actualice la información, para continuar")
            }
        }
        else
        {
            setLoading(false)
            setMessage("Ingrese información válida")
        }
        
       
    
};
const guardarEncuestasEnviada = async (listaPersonas) =>
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


    const handleSignIn= async  () => {
                setLoading(true)
                setMessage("Espere un momento")
                let user = input_User
                let pass = input_Password
                // if (user!= "" && pass!="" )
                // {
                //     let cargoUsuarios = await getInfo()
                //     console.log("cargoUsuarios", cargoUsuarios)
                //     if (cargoUsuarios) {
                //         console.log("listaUsuarios", cargoUsuarios)
                //             if (cargoUsuarios.length>0 )
                //             {
                //                 let passwordCifrado = md5(pass)
                //                 console.log("passwordCifrado", passwordCifrado)
                //                 let usuarioLogueado = cargoUsuarios.find(e=> e.ux==user && e.px==passwordCifrado)
                //                 if (usuarioLogueado) {
                //                         let informacionUsuarios = {
                //                             informacion : {
                //                                 usuario : usuarioLogueado.ux,
                //                                 id_usuario : usuarioLogueado.uid,
                //                                 nombre: usuarioLogueado.ux
                //                             }
                //                         }
                //                         const stored = Storage.instance.store('userInfo', JSON.stringify(informacionUsuarios))
                //                         if (stored)
                //                         {
                //                             setPassword(input_Password)
                //                             setemailAddress(input_User)
                //                             signIn({
                //                                 emailAddress:input_User,
                //                                 password:input_Password
                //                             });
                //                         }
                //                         else
                //                         {
                //                             setLoading(false)
                //                             setMessage("Se presentó un error")
                //                         }
                //                 }
                //                 else{
                //                     setLoading(false)
                //                     setMessage("No se encontraron coincidencias")
                //                 }
                //             }
                //             else
                //             {
                //                 setLoading(false)
                //                 setMessage("Es necesario que actualice la información, para continuar")
                //             }
                //     }
                //     else
                //     {
                //         setLoading(false)
                //         setMessage("Es necesario que actualice la información, para continuar")
                //     }
                // }
                // else
                // {
                //     setLoading(false)
                //     setMessage("Ingrese información válida")
                // }
                
               
                // if (user!= "" && pass!="" )
                // {
                        
                //     // let informacionUsuarios = {
                //     //     informacion :{
                //     //         usuario : user,
                //     //         id_usuario : 3253,
                //     //         curp :user,
                //     //         nombre:"Juan Fernando",
                //     //         primerap:"Pérez",
                //     //         segundoap:"del Corral"
                //     //     }
                //     // }
                //     // const stored = Storage.instance.store('userInfo', JSON.stringify(informacionUsuarios))
                //     // console.log("stonred", stored )
                //     // if (stored)
                //     // {
                //     //     setPassword(input_Password)
                //     //     setemailAddress(input_User)
                //     //     signIn({ emailAddress, password });
                //     // }
                //     // else.
                //     // {
                //     //     setLoading(false)
                //     //     setMessage("Se presentó un error")
                //     // }

                    login(user, pass)
                        .then(response=>{
                            // console.log("resda ", response)
                            setLoading(false)
                            setMessage("")
                            const { respuesta } = response
                            console.log("respuesta", respuesta)
                           

                                if (respuesta.error == 0){
                                    if (respuesta.version=="1.0.9") 
                                    {
                                        let data = respuesta.message.split("|")
                                        if (data.length>2){
                                            let informacionUsuarios = {
                                                informacion : {
                                                    usuario :data[2],
                                                    id_usuario : data[4],
                                                    nombre: data[2],
                                                    token : data[1]
                                                }
                                            }
                
                                            console.log("informacionUsuarios", informacionUsuarios)
        
                                            //zk5NgBtm2kjkZXKVTNa1Qal0R4Prpjxl
                                            
                
                                            const stored = Storage.instance.store('userInfo', JSON.stringify(informacionUsuarios))
                                            if (stored)
                                            {
        
                                                setPassword(input_Password)
                                                setemailAddress(input_User)
                                                signIn({
                                                    emailAddress:input_User,
                                                    password:input_Password
                                                });
                                            }
                                            else
                                            {
                                                setLoading(false)
                                                setMessage("Se presentó un error")
                                            }
                                        }
                                    }
                                    else
                                    {
                                        setLoading(false)
                                        setMessage("La versión instalada esta desactualizada, descargue la actualización para continuar")
                                    }
                                    
                                }
                                else
                                {
                                    setLoading(false)
                                    setMessage(respuesta.errorDesc)
                                }
                            
                            
                        })
                        .catch(error => {
                            setLoading(false)
                            setMessage("Se presentó un error "+ error)
                        })


                    
                //     // let Usuario = Usuarios.instance.getUsuarios(user, pass);
                //     // // console.log()
                //     // if (Usuario != undefined) {
                //     //         let informacionUsuarios = {
                //     //             informacion : {
                //     //                 usuario : Usuario.usuario,
                //     //                 id_usuario : Usuario.id_usuario,
                //     //                 nombre: Usuario.usuario
                //     //             }
                //     //         }
                //     //         const stored = Storage.instance.store('userInfo', JSON.stringify(informacionUsuarios))
                //     //         if (stored)
                //     //         {
                //     //             setPassword(input_Password)
                //     //             setemailAddress(input_User)
                //     //             signIn({
                //     //                 emailAddress:input_User,
                //     //                 password:input_Password
                //     //             });
                //     //         }
                //     //         else
                //     //         {
                //     //             setLoading(false)
                //     //             setMessage("Se presentó un error")
                //     //         }
                //     // }
                //     // else
                //     // {
                //     //     setLoading(false)
                //     //     setMessage("Usuario no encontrado")
                //     // }


                
                // }
                // else
                // {
               
                // }
    };


    async function getInfo() 
    {
        const stored = await Storage.instance.getJson('usuarios_descargados');
        console.log(stored)
        if (stored) 
        {
            if (stored.length>0)
            {

                setListaUsuario(stored)
                return stored;
            }
        }  
        return false; 
    }

    useEffect(() => {
        
    })


    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={images.login} style = {styles.container} >
                        <View style={styles.vContent}>   
                        <View style={styles.containerInputs}>

                                <KeyboardAvoidingView
                                    behavior='padding'
                                    enabled
                                    style={styles.containerKeyboard}>   

                                    <Input 
                                        onChangeText={text => onChangeinput_User(text)}
                                        value={input_User}
                                        placeholder = "Ingrese su usuario"
                                        titulo = "Usuario"
                                        color   = {COLORS.trasparent}
                                        colorFont  = {COLORS.gray}
                                        placeholderColor = {COLORS.lightgray}
                                        // maxLength={18}
                                         autoCapitalize="none"
                                    /> 

                                    {/* <Input
                                        onChangeText={text => onChangeinput_Password(text)}
                                        value={input_Password}
                                        placeholder ={"Ingrese su contraseña"}
                                        titulo = "Contraseña"
                                        autofocus={true}
                                        secureTextEntry
                                        color   = {COLORS.trasparent}
                                        colorFont  = {COLORS.gray}
                                        placeholderColor = {COLORS.lightgray}
                                    />                        */}
                                    <InputPassword
                                        onChangeText={text => onChangeinput_Password(text)}
                                        value={input_Password}
                                        placeholder ={"Ingrese su contraseña"}
                                        titulo = "Contraseña"
                                        autofocus={true}
                                        secureTextEntry={showPassword}
                                        color   = {COLORS.trasparent}
                                        colorFont  = {COLORS.gray}
                                        placeholderColor = {COLORS.lightgray}
                                        handleTouch={showPass}
                                    />
                                </KeyboardAvoidingView>
                                <Button  name={"Ingresar"} color={COLORS.primary} textColor={COLORS.white} handleTouch={handleSignIn} />
                                {/* <Button  name={"Actualizar información"} color={COLORS.primary} textColor={COLORS.white} handleTouch={syncUsers} /> */}

                                <ActivityIndicator size="large" color={COLORS.primary} animating={loading} />
                                <Text style={styles.txtInstrucciones}>
                                    {message}
                                </Text>

                                {/* <TouchableOpacity style={styles.tRecordarContrasena}> */}
                                    {/* <Text style={styles.tInstrucciones}>
                                        Estamos a : {dateNow}
                                    </Text> */}
                                {/* </TouchableOpacity> */}
                                {/* <View style={styles.vTelefonoAtencion}>
                                    <Text style={styles.txtAtencion}>
                                        {"Atención a clientes"}
                                    </Text>
                                    <TouchableOpacity onPress={llamarSoporte}>
                                        <Text style={styles.txtAtencion}>
                                            {"(312) 2256089"}
                                        </Text>
                                    </TouchableOpacity>
                                </View> */}
                                <Text style={styles.txtAtencion}>
                                                {"pr.1.0.10"}
                                </Text>
                         </View>   
                        </View>                    
            </ImageBackground>
        </SafeAreaView>
    );
};


const styles = new StyleSheet.create({
    container: {
        flex:1,
        // justifyContent:'center',
        alignItems:'center',
        // justifyContent:'space-around',
        resizeMode: 'cover',
        backgroundColor:COLORS.primary,
    },
    containerLogin:{
        width:'100%',
        height:'80%',
        backgroundColor:COLORS.primary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems:'center'
    },
    containerInputs:{
        height:'30%',
        width:'100%',
        alignItems:'center',
        justifyContent: 'center',
    },
    containerKeyboard:{
        // flex:1,
        marginVertical:20
    },
    textTitle:{
        color: COLORS.primary,
        fontSize:SIZES.h1,
        fontWeight:'bold',
        marginVertical:10,
        textTransform:'capitalize',
        letterSpacing:3
    },
    vContent:{
        width:'90%',
        height:'100%',
        alignItems:'center', 
        justifyContent:'space-between',
        flexDirection:'row',
        // backgroundColor:'purple',
        paddingTop: 40
    },
    txtInstrucciones: {
        fontSize: 12,
        marginVertical : 10, 
        color: COLORS.secondary,
        textAlign: 'center',
        fontFamily: 'Montserrat'
    },
    subTitle:{
        color: COLORS.darkGray,
        fontSize : SIZES.subtitle,
        paddingLeft:10,
        fontFamily: 'Montserrat'
    },
    tRecordarContrasena:{
        height:30,
        // backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
    tInstrucciones:{
        fontSize: 13,
        marginBottom: 10,
        color: COLORS.secondary,
        textAlign: 'center',
        fontFamily: 'Montserrat'
    },
    vTelefonoAtencion :{
        height:'40%',
        width:'100%',
        // backgroundColor:'white',
        alignItems:'center',
        justifyContent:'flex-end',
        // flexDirection:'row',

    },
    txtAtencion: {
        fontSize: 12,
        marginBottom: 5,
        color: COLORS.darkGray,
        textAlign: 'center',
        fontFamily: 'Montserrat'
    }
})

export default SignInScreen;