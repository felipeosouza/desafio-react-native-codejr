import React, { useContext, useRef } from 'react'
import { Image, View, StyleSheet, StatusBar } from 'react-native'
import CustomText from '../components/CustomText'
import { height } from '../modules/DimensionsModule'

//Components
import DropShadowButton from '../components/DropShadowButton'
import FormInput from '../components/FormInput'
import { DispatchContext } from '../Context'

const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#484848'
    },
    loginCard: {
        height: height * 0.6,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#282828',
        borderRadius: 8,
    },
    inputStyle: {
        flex: 1,
        fontSize: height * 0.02,
        fontFamily: 'Khand-Regular',
        backgroundColor: '#555555',
        color: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: '5%'
    }
})


export default () => {
    const dispatch = useContext(DispatchContext)

    const handleLogin = async () => {
        dispatch({type: 'login', isLoggedIn: true})
    }

    return (
        <View style = {[styles.loginScreen, styles.centered]}>
            <StatusBar backgroundColor='#292929' style='light'/>
            {/* <View style={[{flex: 1}, styles.centered, {paddingTop: 0}]}>
                <Image style={{height: '50%', resizeMode: 'contain'}}
                    source={require('../../assets/images/logo.png')}
                />
            </View> */}
            <View style={[styles.loginCard]}>
                <CustomText style = {{fontFamily: 'Khand-Bold', fontSize: height*0.04, textAlign: 'center'}}>Entre para gerenciar</CustomText>
                <FormInput inputStyle={styles.inputStyle}>E-mail</FormInput>
                <FormInput inputStyle={styles.inputStyle} visible={false}>Senha</FormInput>
                <DropShadowButton action={handleLogin} fontSize={height*0.03}>Fazer login</DropShadowButton>
            </View>
        </View>
    )
}