import React from 'react'
import { View, StyleSheet } from 'react-native'
import { height } from '../modules/DimensionsModule'
import CustomText from './CustomText'
import Icon from './Icon'
//Components

const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    memberInfo: {
        width: '100%',
        paddingVertical: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'white',
        borderBottomWidth: height * 0.003
    }
})

export default ({openModal, member, readOnly=false}) => {
    const infoFontSize = height* 0.022

    const handlePress = (action) => {
        switch (action) {
            case 'see':
                openModal('ReadDeleteCard', {action: 'Read', member: member})
            break;
            case 'edit':
                openModal('CreateUpdateForm', {action: 'Update', member: member})
            break;
            case 'delete':
                openModal('ReadDeleteCard', {action: 'Delete', member: member})
            break;
        
            default:
                break;
        }
    }

    return (
        <View style = {styles.memberInfo}>
            <View style={{flex: 1}}>
                <CustomText numberOfLines={1} style={{fontFamily: 'Khand-SemiBold', fontSize: infoFontSize}}>{member.name}</CustomText>
            </View>
            <View style={{flex: 0.6, flexDirection: 'row-reverse'}}>
                {!readOnly? <Icon height={infoFontSize * 1.6} source={require('../../assets/images/trash.png')} onPress={() => handlePress('delete')}/> : null}
                <Icon height={infoFontSize * 1.6} source={require('../../assets/images/eye.png')} onPress={() => handlePress('see')}/>
                {!readOnly? <Icon height={infoFontSize * 1.6} source={require('../../assets/images/edit.png')} onPress={() => handlePress('edit')}/> : null}
            </View>
        </View>
    )
}