import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

//Components
import Section from '../components/Section'
import Footer from '../components/Footer'
import CustomText from '../components/CustomText'
import { height } from '../modules/DimensionsModule'

const styles = StyleSheet.create({
    homeScreen: {
        flex: 1,
        backgroundColor: '#454545'
    },
    welcome: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: '5%'
    }
})

export default ({ navigation }) => {
    return (
        <ScrollView style={styles.homeScreen} contentContainerStyle={{ alignItems: 'center' }}>
            <View style={styles.welcome}>
                <CustomText style={{ fontFamily: 'Khand-Bold', fontSize: height * 0.04 }}>{'Bem-vindo(a) à NSQ!'}</CustomText>
                <CustomText style={{ width: '80%', fontSize: height * 0.025, textAlign: 'center' }}>Montando ou atualizando seu computador,
                    Todo o hardware que você precisa está aqui!</CustomText>
            </View>
            <Section title={'Mais vendidos'} />
            <Section title={'Você pode se interessar'} />
            <Footer navigation={navigation} />
        </ScrollView>
    )
}