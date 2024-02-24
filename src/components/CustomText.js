import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'
//Components

const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default props => {
    let fontFamily = props.fontFamily
    let fontSize = props.fontSize || 12
    let fontColor = props.fontColor || 'white'

    

    return (
        <Text selectable={props.selectable} numberOfLines={props.numberOfLines} style = {{fontFamily: 'Khand-Regular', marginTop: '0.5%', color: 'white', width: 'auto', ...props.style}}>
            {props.children}
        </Text>
    )
}