import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import { icons, images, COLORS, SIZES } from '../constants'

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            {/* <Image
                style={styles.loading}
                source={images.loading}
              /> */}
              {/* <Text style={styles.txtMensaje}>Inclusión laboral para las juventudes</Text>
              <Text style={styles.txtMensaje}>de los municipios prioritarios</Text> */}
              <Text style={styles.txtPunto}>...</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container : {
        backgroundColor: COLORS.primary,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo:{
        fontSize : SIZES.largeTitle
    },
    loading :{
        height:60,
        width:60
    },
    txtPunto :{
        color: COLORS.secondary
    },
    txtMensaje: {
        color: COLORS.white,
        fontSize:20
    }
})
