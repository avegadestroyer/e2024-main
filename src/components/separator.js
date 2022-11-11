import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

function Separator(props) {
    return (
        <View style={[styles.separator,
            {
                borderTopColor: (props.color) ? props.color: '#EAEAEA',
            }
        ]}>
          {/*   <Text>Esto es un separado</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    separator:{
       height:10
    }
})

export default Separator;