import React, { useRef } from 'react'
import { Image, View, StyleSheet, TextInput, StatusBar, Alert } from 'react-native'
import CustomText from '../components/CustomText'
import { height } from '../modules/DimensionsModule'
import DropdownAlert, { DropdownAlertData, DropdownAlertType } from 'react-native-dropdownalert'

//Components
import DropShadowButton from '../components/DropShadowButton'
import FormInput from '../components/FormInput'
import Icon from '../components/Icon.js'

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
    formCard: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#202020',
        borderRadius: 8
    },
    inputStyle: {
        flex: 1,
        fontSize: height * 0.02,
        fontFamily: 'Khand-Regular',
        backgroundColor: '#555555',
        color: 'white',
        borderRadius: 5,
        paddingHorizontal: '5%'
    },
    absoluteIcon: {
        position: 'absolute',
        height: '10%',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row-reverse'
    }
})


export default ({navigation, route}) => {
    //Alerta
    let alert = (_data) => new Promise<DropdownAlertData>(res => res);

    const params = route.params
    const action = params?.action
    const member = params?.member
    const newMember = useRef(action=='Update'? member : new Object())
    
    const createOrUpdate = async (member) => {
        const postMember = async (member) => {
            try {
                await fetch(`http://192.168.2.105:3001/membros`, {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(member)
                })
            } catch (error) {
                await alert({
                    type: DropdownAlertType.Error,
                    title: "Erro",
                    message: 'Não foi possível criar/atualizar o usuário',
                });
            }
        }

        const deleteMember = async (member) => {
            try {
                await fetch(`http://192.168.2.105:3001/membros/${member.id}`, {
                    method: 'DELETE',
                })
            } catch (error) {
                await alert({
                    type: DropdownAlertType.Error,
                    title: "Erro",
                    message: 'Não foi possível criar/atualizar o usuário',
                });
            }
        }


        if(action == 'Create') {
            if(Object.keys(member).length < 4)
                await alert({
                    type: DropdownAlertType.Error,
                    title: 'Dados insuficientes',
                    message: 'Preencha todos os campos.',
                });
            else
                await postMember(member)
        } else if(action == 'Update') {
            await deleteMember(member)
            await postMember(member)
        }
        navigation.goBack()
    }

    return (
        <View style = {[styles.screenContainer, styles.centered]}>
            <StatusBar backgroundColor='#292929' style='light'/>
            <View style={[styles.formCard]}>
                <View style={styles.absoluteIcon}>
                    <Icon height={height*0.03} source={require('../../assets/images/x.png')} onPress={() => navigation.goBack()}/>
                </View>
                <View style={[styles.centered, { paddingVertical: '3%' }]}>
                    <CustomText style = {{fontFamily: 'Khand-Bold', fontSize: height*0.04}}>{action == 'Create'? 'Criar Membro' : 'Atualizar Membro'}</CustomText>
                </View>
                <FormInput onChangeText={(text) => newMember.current['name'] = text} inputProps={{placeholder: member?.name}} inputStyle={styles.inputStyle}>Nome</FormInput>
                <FormInput onChangeText={(text) => newMember.current['email'] = text} inputProps={{placeholder: member?.email}} inputStyle={styles.inputStyle}>E-mail</FormInput>
                <FormInput onChangeText={(text) => newMember.current['aniversario'] = text} inputProps={{placeholder: member?.aniversario}} inputStyle={styles.inputStyle}>Aniversário</FormInput>
                <FormInput onChangeText={(text) => newMember.current['cargo'] = text} inputProps={{placeholder: member?.cargo}} inputStyle={styles.inputStyle}>Cargo</FormInput>
                <View style={[styles.centered, { paddingVertical: '3%' }]}>
                    <DropShadowButton action={() => createOrUpdate(newMember.current)} fontSize={height*0.03}>{action == 'Create'? 'Criar' : 'Atualizar'}</DropShadowButton>
                </View>
            </View>
            <DropdownAlert alert={func => (alert = func)} />
        </View>
    )
}