import React from 'react'
import { Image, View, StyleSheet, TextInput, StatusBar, Alert } from 'react-native'
import CustomText from '../components/CustomText'
import { height } from '../modules/DimensionsModule'
import * as Clipboard from 'expo-clipboard'
import DropdownAlert, { DropdownAlertData, DropdownAlertType } from 'react-native-dropdownalert'

//Components
import DropShadowButton from '../components/DropShadowButton'
import Icon from '../components/Icon'

//Servidor
import { servidor } from '../servidor.js'

const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    screenContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: '#303030cc'
    },
    card: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#282828',
        borderRadius: 8,
    },
    title: {
        width: '90%',
        paddingVertical: '2%',
        borderBottomWidth: 1.5,
        borderBottomColor: 'white'
    },
    inputStyle: {
        flex: 1,
        fontSize: height * 0.02,
        fontFamily: 'Khand-Regular',
        backgroundColor: '#555555',
        color: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: '5%',
    },
    buttonContainer: {
        paddingBottom: '2%',
        paddingHorizontal: '3%',
        width: '100%',
        alignItems: 'flex-end'
    },
    absoluteIcon: {
        position: 'absolute',
        height: '15%',
        width: '100%',
        alignItems: 'center',
        //backgroundColor: 'red',
        flexDirection: 'row-reverse',
        padding: '2%'
    }
})


export default ({navigation, route}) => {
    //Alerta
    let alert = (_data) => new Promise<DropdownAlertData>(res => res);

    const params = route.params
    const action = params?.action
    const member = params?.member 
    
    const deleteUser = async () => {
        try {
            await fetch(`${servidor}/membros/${member.id}`, {
                method: 'DELETE'
            })
        } catch (error) {
            await alert({
                type: DropdownAlertType.Error,
                title: "Erro",
                message: 'Não foi possível excluir o usuário',
            });
        }

        navigation.goBack()
    }

    const handlePress = (action) => {
        action == 'Read'?
            navigation.goBack()
        : deleteUser()
    }

    const copyToClipboard = async (text) => {
        await Clipboard.setStringAsync(text)
    }

    return (
        <View style = {[styles.screenContainer, styles.centered]}>
            <StatusBar backgroundColor='#292929' style='light'/>
            <View style={[styles.card]}>
                    <View style={styles.absoluteIcon}>
                        <Icon pressableStyle={{height: height*0.026, aspectRatio: 1}} height={'100%'} source={require('../../assets/images/x.png')} onPress={() => navigation.goBack()}/>
                    </View>
                <View style={[styles.centered, styles.title]}>
                    <CustomText style = {{fontFamily: 'Khand-Bold', fontSize: height*0.03}}>{action == 'Read'? member?.name : 'Excluir Membro'}</CustomText>
                </View>
                <View style={[{width: '100%', marginVertical: '2%'}, styles.centered]}>
                    {
                            action == 'Read'? <>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <CustomText style = {{fontFamily: 'Khand-SemiBold', fontSize: height*0.025}}>E-mail: {member?.email}</CustomText>
                                        <Icon onPress={() => copyToClipboard(member?.email)} height={'100%'} pressableStyle={{height: height*0.025, marginHorizontal: 3}} source={require('../../assets/images/copy.png')}/>
                                    </View>
                                    <CustomText style = {{fontFamily: 'Khand-SemiBold', fontSize: height*0.025}}>Aniversário: {member?.aniversario}</CustomText>
                                    <CustomText style = {{fontFamily: 'Khand-SemiBold', fontSize: height*0.025}}>Cargo: {member?.cargo}</CustomText>
                                </>
                            : <CustomText style = {{fontFamily: 'Khand-SemiBold', fontSize: height*0.026, textAlign: 'center', width: '93%'}}>Certeza que dejesa excluir o membro “{member?.name}”? Essa ação não poderá ser desfeita.</CustomText>
                    }
                </View>
                <View style={[styles.buttonContainer]}>
                    <DropShadowButton action={() => handlePress(action)} color={action == 'Read'? null : '#C70000'} fontSize={height*0.03}>{action == 'Read'? 'Fechar' : 'Excluir'}</DropShadowButton>
                </View>
            </View>
            <DropdownAlert alert={func => (alert = func)} />
        </View>
    )
}