import React, { useContext } from 'react'
import { Image, View, Text, StyleSheet, Pressable } from 'react-native'

//Components
import CustomText from './CustomText'
import { height } from '../modules/DimensionsModule'
import { DispatchContext } from '../Context'


const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: 'black',
        width: '100%',
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    redirectButtonsContainer: {
        height: '75%',
        width: '35%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    logoContainer: {
        position: 'absolute',
        height: '100%',
        width: 'fit-content',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    logo: {
        height: '25%',
        aspectRatio: 1,
        marginBottom: '2%',
        resizeMode: 'contain',
        margin: 5
    },
    redirectTexts: {
        color: 'white',
        fontFamily: 'Khand-SemiBold',
        fontSize: height*0.025
    }
})

export default ({navigation}) => {
    const dispatch = useContext(DispatchContext)
    const navigate = (route, params) => navigation.navigate(route, params)

    return (
        <View style = {styles.footerContainer}>
            <View style={styles.redirectButtonsContainer}>
                <Pressable onPress={() => navigate('Home')}>
                    <CustomText style={styles.redirectTexts}>Home</CustomText>
                </Pressable>
                <Pressable onPress={() => navigate('Contact')}>
                    <CustomText style={styles.redirectTexts}>Contato</CustomText>
                </Pressable>
                <Pressable onPress={() => navigate('ManageMembers', {readOnly: true})}>
                    <CustomText style={styles.redirectTexts}>Membros</CustomText>
                </Pressable>
                <Pressable onPress={() => {
                    dispatch({type: 'login', isLoggedIn: false})
                    navigate('FooterLogin')
                }
                }>
                    <CustomText style={styles.redirectTexts}>Login</CustomText>
                </Pressable>
            </View>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                />
            </View>
        </View>
    )
}