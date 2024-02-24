import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import Icon from './Icon'


const styles = StyleSheet.create({
    navBarContainer: {
        backgroundColor: 'black',
        width: '100%',
        aspectRatio: 3.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    membersContainer: {
        height: '100%',
        width: 'fit-content',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    logo: {
        height: '60%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    logoContainer: {
        position: 'absolute',
        height: '100%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
})

export default ({navigate}) => {
    return (
        <View style = {styles.navBarContainer}>
            <Icon 
                height={'60%'}
                pressableStyle={styles.logoContainer}
                source={require('../../assets/images/logo.png')}
                onPress={() => navigate('Home')}
                />
            <Icon 
                height={'50%'}
                pressableStyle={styles.membersContainer}
                source={require('../../assets/images/members.png')}
                onPress={() => navigate('ManageMembers')}
                />
        </View>
    )
}