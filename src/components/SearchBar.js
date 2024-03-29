import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { height } from '../modules/DimensionsModule'
//Components

const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        color: 'white',
        fontFamily: 'Khand-SemiBold',
        fontSize: height * 0.023,
        backgroundColor: '#292929',
        textAlign: 'center',
        paddingTop: '0.8%',
        borderRadius: 6
    }
})

export default ({handleTextChange}) => {
    return (
        <TextInput onChangeText={handleTextChange} placeholderTextColor={'#FFFFFF80'} placeholder='Procure por um membro' style = {styles.input}>
            
        </TextInput>
    )
}