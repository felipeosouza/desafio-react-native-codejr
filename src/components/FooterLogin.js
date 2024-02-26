import React from 'react'
import { View, StyleSheet } from 'react-native'
import Login from '../screens/Login'
//Components

const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ({navigation}) => {
    return (
        <Login handleFooterLogin={() => navigation.navigate('Home')}/>
    )
}