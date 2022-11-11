import React, { Component } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native';
import { COLORS, icons } from '../constants/'
import Separator from './separator'
import Empty from '../components/empty'
import Icon from 'react-native-vector-icons/FontAwesome';

import ItemPublicidad from './itemPublicidad';


export default class ListPublicidad extends Component {
   state=
   {
        imagenes: [],
        acceso:[],
        visible: false,
        visibleActivo: false,
        visibleValoracion: false,
        isLoading: false,
        visibleFirma:false,
        rendimiento : []
    }

    renderEmpty() 
    {
        return(<Empty text = "Espere un momento" > </Empty>)
    }

    obtenerImagenes = async() => {

       const {imagenes} = this.props
       console.log(imagenes.length)
        this.setState({
            isLoading: true,
            imagenes
        })

    }

    stringToDate = (dateString) => {
        const [dd, mm, yyyy] = dateString.substring(0,10).split("-");
        return `${yyyy}-${mm}-${dd}`;
    };

    itemSeparator=() =><Separator/>

    componentDidMount() {
        
         this.obtenerImagenes();
    }

    handlePress(item) 
    {
        // console.log("Modalfirma")
        // if (!item.estatus ){
        // // console.log("item.estatus", item.estatus)

        //     this.setState({
        //         rendimiento:item, 
        //         visibleFirma: true
        //     })
        // }
    }

    renderFlatListItem(item) {
        let evento={}

        return (
            evento = {
                key:item.id,
                id_rendimiento : item.id_rendimiento,
                firma :item.firma,
                fecha_firmado :item.fecha_firmado,
                estatus : item.estatus, 
                cuenta: item.cuenta
            }
        )
    }

    _pressCerraModal = () => {
        this.setState({
            visibleFirma: false
        })
    }

    render() {
        return (
        <View style={styles.container}>
                 
                
                <FlatList 
                        data={this.state.imagenes}
                        ListEmptyComponent ={this.renderEmpty}
                        keyExtractor={(i,k)=>k.toString()}
                        refreshing={this.state.isLoading}
                        ItemSeparatorComponent = {this.itemSeparator}
                        onRefresh={this.obtenerImagenes}
                        renderItem={({ item }) => 
                                {
                                    return (
                                        <ItemPublicidad registro={this.renderFlatListItem(item)} />
                                    )
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
    }
});
