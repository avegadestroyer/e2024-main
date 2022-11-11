import React, { useEffect, useState, useContext, Component, useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Switch, Image, Alert,Dimensions, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


import { COLORS, SIZES, images } from '../../constants';
import { AuthContext } from '../../utils/authContext';
import Storage from '../../libs/Storage'
import ButtonMenu from '../../components/buttonMenu'
import Header from '../../components/header';
import ListContactos from '../../components/listContactos';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const CheckScreen = ({ navigation, route }) => {
    const { signOut } = useContext(AuthContext);
    const [curp, setCURP] = useState("");
    const [dateNow, setDateNow] = React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [id_usuario, setID] = React.useState('');
    const [token, setToken] = React.useState('');

    useEffect(() => {
        async function getInfo() 
        {
            const stored = await Storage.instance.getJson('userInfo');
            if (stored) 
            {
                const { informacion } = stored;
                setID("ID "+ informacion.id_usuario)
                setNombre(informacion.nombre)
                setToken(informacion.token)
            }            
        }
        getInfo()
        let today = new Date().toISOString().slice(0, 10)
        setDateNow(today)
    }, [])

    
    const _backHome = () => {
        
    }

    const goNotification = () => {
        // navigation.navigate('Mensajes',{recargar:true}); 
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
    const onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
          console.error('An error occured', err)
        );
      };

    const handleSignIn = () => {
        navigation.navigate("CheckScreen", {});
    }

    const sincronizar = () => {
        navigation.navigate("SyncUpScreen", {curp});
    }

    const closeSession = () => {
      let emailAddress="";
      let password="";
      signOut({emailAddress, password })
    }

    return (
         <View View style = {styles.container} >  
                <View style={styles.vContainer} contentContainerStyle={{ alignItems:'center', justifyContent: 'center' }} horizontal>
                    <Header id_usuario={id_usuario} nombre={nombre} />
                    <View style={styles.vListado}>
                        {
                            token!=null && token!="" ?
                            <ListContactos navigation={navigation} token={token} />
                            :null
                        }
                    </View>
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
        height:80,
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
     
     },
     vListado:{
        flex:1,
        width:'100%',
        // height:350,
        backgroundColor:COLORS.backColor,
     
     }
})

export default CheckScreen;