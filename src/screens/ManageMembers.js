import React, { useCallback, useContext, useReducer, useRef, useState } from 'react'
import { View, StyleSheet, LogBox } from 'react-native'
import Footer from '../components/Footer'
import CustomText from '../components/CustomText'
import { height } from '../modules/DimensionsModule'
import DropShadowButton from '../components/DropShadowButton'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import MemberInfo from '../components/MemberInfo'
import { useFocusEffect } from '@react-navigation/native'
//Components
import SearchBar from '../components/SearchBar'
import Login from '../screens/Login'
import { AppContext } from '../Context'

const styles = StyleSheet.create({
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    utilitiesRow: {
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: '3%'
    }
})

export default ({ navigation, route }) => {
    const isLoggedIn = useContext(AppContext).isLoggedIn
    //Saber se é apenas leitura ou gerenciável
    const isReadOnly = route.params?.readOnly || false

    const ManageMembers = () => {
        //Aviso inútil
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])


        //Pegando os dados
        const allMembers = useRef([]);
        const [members, dispatch] = useReducer((state, params) => {
            return params.newArray
        }, [])

        const fetchData = async () => {
            const fetchMembers = await fetch('seuip/membros', {
                method: 'GET'
            })
            const data = await fetchMembers.json()
            allMembers.current = data
            dispatch({ newArray: data })
        }

        useFocusEffect(
            useCallback(() => {
                fetchData()
            }, [])
        )

        //Função para abrir os modais
        const openModal = (route, params) => {
            //Abrir modal
            navigation.navigate(route, params)
        }

        //Atualizar lista de membros
        const filterMembers = (text, oldArray) => {
            const newArray = oldArray.filter((el) => {
                if (el.name.toLowerCase().indexOf(text.toLowerCase()) >= 0)
                    return true
            })

            dispatch({ newArray: newArray })
        }

        return <ScrollView style={{ height: '100%', backgroundColor: '#454545' }} contentContainerStyle={{ alignItems: 'center' }}>
            <View>
                {
                
                }
            </View>
            <View style={[styles.centered, { marginVertical: '3%' }]}>
                {
                    isReadOnly ? null
                        : <CustomText style={{ fontFamily: 'Khand-Bold', fontSize: height * 0.04 }}>Gerenciar Membros</CustomText>
                }
            </View>
            <View style={styles.utilitiesRow}>
                {
                    isReadOnly ?
                        <CustomText style={{ fontFamily: 'Khand-Bold', fontSize: height * 0.04 }}>Membros</CustomText>
                        : <DropShadowButton action={() => openModal('CreateUpdateForm', { action: 'Create' })} fontSize={height * 0.02}>
                            Novo Membro
                        </DropShadowButton>
                }
                <SearchBar handleTextChange={(text) => filterMembers(text, allMembers.current)}/>
            </View>
            <View style={[{ height: height * 0.6, width: '80%' }]}>
                {
                    members.length > 0 ?
                        <FlatList
                            style={{ marginVertical: height * 0.04, paddingHorizontal: '1%' }}
                            data={members}
                            renderItem={({ item }) => {
                                const readOnly = isReadOnly
                                return <MemberInfo readOnly={readOnly} openModal={openModal} member={item} />
                            }}
                            keyExtractor={(item) => item.id}
                            initialNumToRender={10}
                        />
                        : <View style={[styles.centered, { height: '100%' }]}>
                            <CustomText style={{ fontFamily: 'Khand-Bold', fontSize: height * 0.026 }}>Nenhum membro foi encontrado...</CustomText>
                        </View>
                }
            </View>
            <Footer navigation={navigation}/>
        </ScrollView>
    }

    if(!isLoggedIn && !isReadOnly)
        return <Login/>
    else
        return <ManageMembers/>
}