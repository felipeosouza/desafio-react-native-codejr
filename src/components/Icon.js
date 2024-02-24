import React from 'react'
import { View, StyleSheet, Pressable, Image } from 'react-native'
//Components

const styles = StyleSheet.create({
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '3%'
    }
})

export default ({source, onPress, height, pressableStyle}) => {
    return (
        <Pressable style = {pressableStyle || styles.icon} onPress={onPress}>
            <Image
                style={{height: height, aspectRatio: 1, resizeMode: 'contain'}}
                source={source}
            />
        </Pressable>
    )
}