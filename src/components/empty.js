import React from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native' 

function Empty(props) {
    
        return(
            <View style={styles.container}>
                  <Text style={styles.title}>{props.text}</Text>
            </View>
        )
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
    },
    title:{
        fontSize:16,
        fontFamily:'MontserratSemiBold'
    }
})

export default Empty