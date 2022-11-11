import React, { Component } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { COLORS, SIZES } from '../constants/'
import Separator from './separator'
import Storage from '../libs/Storage';
import ItemContacto from '../components/ItemContacto'
import Empty from '../components/empty'
import Icon from 'react-native-vector-icons/FontAwesome';
import InputBusqueda from './inputBusqueda';
import { getContactos } from '../ws/getContactos';
import moment from 'moment';
import { Fragment } from 'react/cjs/react.production.min';

export default class ListContactos extends Component {
   state={
        registros: [],
        registro:[],
        visible: false,
        visibleActivo: false,
        visibleValoracion: false,
        isLoading: false,
        visibleCotizacion:false,
        busqueda:""
    }

    renderEmpty() 
    {
        return(<Empty text = "Espere un momento" > </Empty>)
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }



    obtenerServicios = async() => {
        let aRegistros = [];

        this.setState({
            isLoading: true
        })
        // let aRegistros = [
        //     {
        //         id : "1",
        //         nombre : "Carlos Teodoro Cruz", 
        //         nivel : "2",
        //         partido : "Morena",
        //         fichado : "Afín",
        //         perfil : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRij6dtiHizH96qpCOe8WeXXP3yLyQJkPdGVg&usqp=CAU",
        //         pageNext: "DetalleContactoScreen"
        //     },
        //     {
        //         id : "2",
        //         nombre : "Juan Teodoro Cruz", 
        //         nivel : "2",
        //         partido : "Morena",
        //         fichado : "Afín",
        //         perfil : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU",
        //         pageNext: "DetalleContactoScreen"
        //     },
        //     {
        //         id : "2",
        //         nombre : "Alberto Teodoro Cruz", 
        //         nivel : "2",
        //         partido : "Morena",
        //         fichado : "Afín",
        //         perfil : "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
        //         pageNext: "DetalleContactoScreen"
        //     },
        //     {
        //         id : "2",
        //         nombre : "Emilio Teodoro Cruz", 
        //         nivel : "2",
        //         partido : "Morena",
        //         fichado : "Afín",
        //         perfil : "https://image.shutterstock.com/image-photo/profile-picture-young-handsome-man-260nw-1795243888.jpg",
        //         pageNext: "DetalleContactoScreen"
        //     },
        //     {
        //         id : "2",
        //         nombre : "Rafael Teodoro Cruz", 
        //         nivel : "2",
        //         partido : "Morena",
        //         fichado : "Afín",
        //         perfil : "https://image.shutterstock.com/image-photo/headshot-portrait-smiling-millennial-male-260nw-1667439913.jpg",
        //         pageNext: "DetalleContactoScreen"
        //     },
        //     {
        //         id : "2",
        //         nombre : "Pedro Teodoro Cruz", 
        //         nivel : "2",
        //         partido : "Morena",
        //         fichado : "Afín",
        //         perfil : "https://images.squarespace-cdn.com/content/v1/5dfb51321047cf33eb90b6df/1581602814946-NLSD2Y3725ASHPBDEFQ2/Nick-MyHeartSkipped-1948.jpg",
        //         pageNext: "DetalleContactoScreen"
        //     },
        //     {
        //         id : "2",
        //         nombre : "Oscar Teodoro Cruz", 
        //         nivel : "2",
        //         partido : "Morena",
        //         fichado : "Afín",
        //         perfil : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUlzwBwYy94lHU8Gbq0-JzT9pbJlVzeNAJuA&usqp=CAU",
        //         pageNext: "DetalleContactoScreen"
        //     },
        //     {
        //         id : "2",
        //         nombre : "Rodrigo Teodoro Cruz", 
        //         nivel : "2",
        //         partido : "Morena",
        //         fichado : "Afín",
        //         perfil : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN6cH31gHGHiYbOvskxGPI2zYc8dYt2DWAyA&usqp=CAU",
        //         pageNext: "DetalleContactoScreen"
        //     },
        //     {
        //         id : "2",
        //         nombre : "Javier Teodoro Cruz", 
        //         nivel : "2",
        //         partido : "Morena",
        //         fichado : "Afín",
        //         perfil : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYzAqKERFeE4h-K3vnOWQSWJmxRTKTApVjEg&usqp=CAU",
        //         pageNext: "DetalleContactoScreen"
        //     }            
        // ]

        // const encuestasEnviadas = await Storage.instance.getJson('encuestasEnviadas');
        
        // if (encuestasEnviadas) 
        // {

        //     let contador = 1;
        //     encuestasEnviadas.forEach(persona => {
                
        //         console.log("persona", persona)
                
        //         let personaRegistro = {
        //             cargo                   : persona.cargo,
        //             cargoDesc               : persona.cargoDesc,
        //             categoria               : persona.adicional.categoria,
        //             celular                 : persona.adicional.celular,
        //             correo                  : persona.adicional.correo,
        //             curp                    : persona.curp,
        //             dateString              : persona.dateString,
        //             distrito                : persona.adicional.distrito,
        //             distritoDesc            : persona.adicional.distritoDesc,
        //             distritoResidencia      : persona.distrito,
        //             distritoResidenciaDesc  : persona.distritoDesc,
        //             estado                  : persona.adicional.estado,
        //             estadoDesc              : persona.adicional.estadoDesc,
        //             estadoResidencia        : persona.estadoResidencia,
        //             estadoResidenciaDesc    : persona.estadoResidenciaDesc,
        //             facebook                : persona.adicional.facebook,
        //             fechaNacimiento         : persona.fechaNacimiento,
        //             genero                  : persona.genero,
        //             generoDesc              : persona.generoDesc,
        //             key                     : contador,
        //             instagram               : persona.adicional.instagram,
        //             linkedin                : persona.adicional.linkedin,
        //             lugarNacimiento         : persona.lugarnacimiento,
        //             lugarNacimientoDesc     : persona.lugarNacimientoDesc,
        //             municipio               : persona.adicional.municipio,
        //             municipioDesc           : persona.adicional.municipioDesc,
        //             municipioResidencia     : persona.municipio,
        //             municipioResidenciaDesc : persona.municipioDesc,
        //             nombre                  : persona.nombre,
        //             nombreCompleto          : `${persona.nombre} ${persona.primerap} ${persona.segundoap}`,
        //             pageNext                : "DetalleContactoScreen",
        //             perfil                  : persona.imagen,
        //             primerap                : persona.primerap,
        //             responsabilidad         : persona.responsabilidad,
        //             responsabilidadDesc     : persona.responsabilidadDesc,
        //             segundoap               : persona.segundoap,
        //             seccion                 : persona.adicional.seccion,
        //             seccionDesc             : persona.adicional.seccionDesc,
        //             seccionResidencia       : persona.seccion,
        //             seccionResidenciaDesc   : persona.seccionDesc, 
        //             twitter                 : persona.adicional.twitter,
        //             lat                     : persona.adicional.lat,
        //             lon                     : persona.adicional.lon
        //         }
        //         // console.log("encuestasenviadas-->", personaRegistro)
        //         aRegistros.push(personaRegistro);
        //     })

        //     this.setState({
        //         isLoading: false,
        //         registros: aRegistros
        //     })
        // }
        // else
        // {
        //     this.setState({
        //         isLoading: false,
        //         registros: []
        //     })
        // }
            console.log("toekn", this.props.token)
            // let token= "zk5NgBtm2kjkZXKVTNa1Qal0R4Prpjxl";
            let token=this.props.token;
            // getContactos(this.props.token)
            getContactos(token)
            .then(async (res)=> {
                const { respuesta } = res
                console.log("res", respuesta.length)
                let listaPersonas= []
                respuesta.forEach(persona=> {
                    let personaRegistro = {
                        cargo                   : persona.cargo,
                        cargoDesc               : persona.personaCargo,
                        categoria               : persona.categoria,
                        celular                 : persona.celular,
                        correo                  : persona.correo,
                        curp                    : persona.curp,
                        dateString              : persona.fechanacimiento,
                        distrito                : persona.distritofederal!=null ? persona.distritofederal : "",
                        distritoDesc            : persona.distritofederalD!=null ? persona.distritofederalD : "",
                        distritoResidencia      : persona.datosDistritoFederal!=null ? persona.datosDistritoFederal : "",
                        distritoResidenciaDesc  : persona.personaDistritoFederal!=null ? persona.personaDistritoFederal : "",
                        estado                  : persona.estado!=null ? persona.estado : "",
                        estadoDesc              : persona.personaEstado!=null ? persona.personaEstado : "",
                        estadoResidencia        : persona.estadoD!=null ? persona.estadoD : "",
                        estadoResidenciaDesc    : persona.datosEstado!=null ? persona.datosEstado : "",
                        facebook                : persona.redes,
                        fechaNacimiento         : persona.fechanacimiento,
                        genero                  : persona.genero,
                        generoDesc              : persona.personaGenero,
                        key                     : persona.personaid,
                        instagram               : persona.instagram,
                        linkedin                : persona.linkedin,
                        lugarNacimiento         : persona.lugarnacimiento,
                        lugarNacimientoDesc     : persona.lugarNacimientoDesc!=null ? persona.lugarNacimientoDesc : "",
                        municipio               : persona.municipioD!=null ? persona.municipioD : "",
                        municipioDesc           : persona.personaMunicipio!=null ? persona.personaMunicipio : "",
                        municipioResidencia     : persona.municipio!=null ? persona.municipio : "",
                        municipioResidenciaDesc : persona.datosMunicipio!=null ? persona.datosMunicipio : "",
                        nombre                  : persona.nombre,
                        nombreCompleto          : persona.personaNombreCompleto,
                        pageNext                : "DetalleContactoScreen",
                        perfil                  : persona.imagen,
                        primerap                : persona.primerap,
                        responsabilidad         : persona.responsabilidad,
                        responsabilidadDesc     : persona.personaResponsabilidad,
                        segundoap               : persona.segundoap,
                        seccion                 : persona.seccion!=null ? persona.seccion : "",
                        seccionDesc             : persona.personaSeccion!=null ? persona.personaSeccion : "",
                        seccionResidencia       : persona.seccionD!=null ? persona.seccionD : "",
                        seccionResidenciaDesc   : persona.datosSeccion!=null ? persona.datosSeccion : "", 
                        twitter                 : persona.twitter,
                        lat                     : persona.lat,
                        lon                     : persona.lon
                    }
                    // console.log("encuestasenviadas-->", personaRegistro)
                    aRegistros.push(personaRegistro);
                })

                this.setState({
                    isLoading: false,
                    registros: aRegistros
                })
                
                
                console.log("listaPersonas", listaPersonas.length)
                

            })
            .catch(err=>{
                console.log("err", err)
                this.setState({
                    isLoading: false,
                    registros: aRegistros
                })
            })
    }

    itemSeparator=() =><Separator color={COLORS.primary}/>

    componentDidMount() {
        this.obtenerServicios()
    }

    handlePress(item) 
    {
        this.props.navigation.navigate(item.pageNext ,
                    { persona:item }
        )
    }

    renderFlatListItem(item) {
        let evento={}


        return (
            evento = {
                key                     : item.key,
                id                      : item.key,
                cargo                   : item.cargo,
                cargoDesc               : item.cargoDesc,
                categoria               : item.categoria,
                celular                 : item.celular,
                correo                  : item.correo,
                curp                    : item.curp,
                dateString              : item.dateString,
                distrito                : item.distrito,
                distritoDesc            : item.distritoDesc,
                distritoResidencia      : item.distrito,
                distritoResidenciaDesc  : item.distritoDesc,
                estado                  : item.estado,
                estadoDesc              : item.estadoDesc,
                estadoResidencia        : item.estadoResidencia,
                estadoResidenciaDesc    : item.estadoResidenciaDesc,
                facebook                : item.facebook,
                fechaNacimiento         : item.fechaNacimiento,
                genero                  : item.genero,
                generoDesc              : item.generoDesc,
                instagram               : item.instagram,
                linkedin                : item.linkedin,
                lugarNacimiento         : item.lugarNacimiento,
                lugarNacimientoDesc     : item.lugarNacimientoDesc,
                municipio               : item.municipio,
                municipioDesc           : item.municipioDesc,
                municipioResidencia     : item.municipio,
                municipioResidenciaDesc : item.municipioDesc,
                nombre                  : item.nombre,
                nombreCompleto          : item.nombreCompleto,
                pageNext                : item.pageNext,
                perfil                  : item.perfil,
                primerap                : item.primerap,
                responsabilidad         : item.responsabilidad,
                responsabilidadDesc     : item.responsabilidadDesc,
                seccion                 : item.seccion,
                segundoap               : item.segundoap,
                seccion                 : item.seccion,
                seccionDesc             : item.seccionDesc,
                seccionResidencia       : item.seccionResidencia,
                seccionResidenciaDesc   : item.seccionDesc, 
                twitter                 : item.twitter
            }
        )
    }

    onChangeText(text){

        const array = this.state.registros
        
        if (array){

            this.setState({
                isLoading: true,
                busqueda: text
            })
    
            if (text=="")
            {
                this.obtenerServicios()
            }
            else
            {
                let listaContactos = []
                let result = array.filter( registro => registro.nombre.toLowerCase().includes(text.toLowerCase()) );
                
                console.log("resultado", result)
                if (result)
                {
                    this.setState({
                        isLoading: false,
                        registros: result
                    })
                }
                else{
                    this.setState({
                        isLoading: false,
                        registros: []
                    })
                }
            }
        }
    }

    render() {
        return (
        <View style={styles.container}>
                
                           
                                
                                    <InputBusqueda 
                                            onChangeText={text => this.onChangeText(text)}
                                            value={this.state.busqueda}
                                            placeholder = "Ingrese el nombre"
                                            titulo = "Búsqueda"
                                            color   = {COLORS.trasparent}
                                            colorFont  = {COLORS.primary}
                                            placeholderColor = {COLORS.gray}
                                            // maxLength={18}
                                            // autoCapitalize="characters"
                                        />
                                        <FlatList 
                                            data={this.state.registros}
                                            ListEmptyComponent ={this.renderEmpty}
                                            keyExtractor={(i,k)=>k.toString()}
                                            refreshing={this.state.isLoading}
                                            ItemSeparatorComponent = {this.itemSeparator}
                                            onRefresh={this.obtenerServicios}
                                            // horizontal
                                            // numColumns={2}
                                            renderItem={({ item }) => {
                                                // if (item.estatus=="Activo" )
                                                // {
                                                //     return (
                                                //         <TouchableOpacity
                                                //             onPress={() => this.handlePress(item)}>
                                                //             <ItemContacto registro={this.renderFlatListItem(item)} />
                                                //         </TouchableOpacity>
                                                //     )
                                                // }
                                                // else
                                                // {
                                                    
                                                    return (
                                                        <TouchableOpacity
                                                        onPress={() => this.handlePress(item)}>
                                                            <ItemContacto registro={this.renderFlatListItem(item)} />
                                                        </TouchableOpacity>
                                                    )
                                                // }
                                            }}
                                        />
                                
                                
                            
                
            </View>
        );
    }
}



// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtTitle :{
        color: COLORS.black,
        fontSize : SIZES.h2
    }
});
