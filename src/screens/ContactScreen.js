import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

//Components
import Section from '../components/Section'
import Footer from '../components/Footer'
import { height } from '../modules/DimensionsModule'
import CustomText from '../components/CustomText'

const styles = StyleSheet.create({
    homeScreen: {
        flex: 1,
        backgroundColor: '#454545'
    },
    contactContainer: {
        width: '85%',
        alignItems: 'center',
        backgroundColor: '#323232',
        borderRadius: 10,
        marginVertical: height * 0.05
    },
    title: {
        width: '90%',
        alignItems: 'center',
        paddingVertical: '2%',
        borderBottomWidth: 1.5,
        borderBottomColor: 'white'
    },

})

const InfoCard = ({title, imgSource, description}) => {
    return <View style={{ width: '100%', paddingLeft: '3%', marginVertical: '5%'}}>
        <CustomText style={{ fontFamily: 'Khand-Bold', fontSize: height * 0.023 }}>{title}</CustomText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {
            imgSource? <View style={{height: height * 0.05, aspectRatio: 1, marginRight: 3}}>
                 <Image source={imgSource} style={{height: '100%', width: '100%', resizeMode: 'contain'}}/>
            </View> : null
            }
            <CustomText selectable style={{ fontSize: height * 0.023, paddingTop: '2%', width: '95%' }}>{description}</CustomText>
        </View>
    </View>
}

export default ({ navigation }) => {
    return (
        <ScrollView style={styles.homeScreen} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.contactContainer}>
                <View style={styles.title}>
                    <CustomText style={{ fontFamily: 'Khand-Bold', fontSize: height * 0.04 }}>NSQ Hardware</CustomText>
                </View>
                <InfoCard title={'Sobre nós'} description={'Somos uma empresa revendedora de hardware, fundada em Minas Gerais, 2013, com filiais em todo o Brasil.'}/>
                <View style={styles.title}>
                    <CustomText style={{ fontFamily: 'Khand-Bold', fontSize: height * 0.04 }}>Contato</CustomText>
                </View>
                <InfoCard title={'Acesse nosso Instagram'} imgSource={require('../../assets/images/iglogo.png')} description={'@nsqhardware'}/>
                <InfoCard title={'Mande uma mensagem para nosso whatsapp'} imgSource={require('../../assets/images/wpplogo.png')} description={'(32) 90000-0000'}/>
                <InfoCard title={'Nos mande um e-mail'} imgSource={require('../../assets/images/gmaillogo.png')} description={'contato@nsqhardware.com.br'}/>
            </View>
            <Footer navigation={navigation}/>
        </ScrollView>
    )
}