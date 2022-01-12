import React from 'react';
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';


// importante o extends por que assim ele recebe todas as props do componente TouchableOpacity
interface Props extends TouchableOpacityProps{
    title: string;
}

export function ComponentPropsStyled({title, ...rest} : Props){
    return(
        <TouchableOpacity style={styles.button} {...rest}>
            <Text style={styles.titleButton}>{title}</Text>
        </TouchableOpacity>
    )
} 

const styles = StyleSheet.create({
    button:{
        width: '100%',
        paddingVertical: 15,
        backgroundColor:'red'
    },
    titleButton:{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        color: '#FFF',
        fontSize:20
    }
})
