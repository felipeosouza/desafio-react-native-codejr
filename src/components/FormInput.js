import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { height } from '../modules/DimensionsModule'
//Components
import CustomText from './CustomText'

const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    formInputContainer: {
        height: height * 0.11,
        width: '85%',
    },
})

export default ({visible=true, inputStyle, inputProps, children, onChangeText}) => {
    return <View style={styles.formInputContainer}>
        <View style={{flex: 0.6}}>
            <CustomText style = {{fontFamily: 'Khand-Regular', fontSize: height*0.025}}>{children}</CustomText>
        </View>
        <View style={{flex: 1}}>
            <TextInput onChangeText={onChangeText} placeholderTextColor={'#FFFFFF80'} secureTextEntry={!visible} style={inputStyle} {...inputProps}/>
        </View>
    </View>
}