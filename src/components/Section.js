import React, { useRef } from 'react'
import { View, Text, StyleSheet, PixelRatio } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { height, width } from '../modules/DimensionsModule'
//Components
import Card from './Card'
import CustomText from './CustomText'


const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        height: height*0.3,
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: '5%'
    },
    carouselContainer: {
        marginVertical: height*0.004,
        height: '90%',
        overflow: 'visible'
    },
    carousel: {
        alignItems: 'center'
    }
})

export default ({title}) => {
    const pecas = require('../../peças.json').pecas
    const cardRefs = useRef(new Array(6))
    const scrollViewRef = useRef()
    

    return (
        <View style = {styles.sectionContainer}>
                <CustomText style = {{fontFamily: 'Khand-Bold', fontSize: width*0.08, marginLeft: width*0.03}}>{title}</CustomText>
                <View style={styles.carouselContainer}>
                    <ScrollView horizontal contentContainerStyle={styles.carousel}
                                ref={scrollViewRef}
                                onScroll={(scrollInfo) => {
                                    cardRefs.current.forEach((el) => {
                                        el.setOffset(scrollInfo.nativeEvent.contentOffset.x)
                                    })
                                  }
                                }
                                >
                    {
                        (() => {
                            const shuffle = (array) => { 
                                for (let i = array.length - 1; i > 0; i--) { 
                                  const j = Math.floor(Math.random() * (i + 1)); 
                                  [array[i], array[j]] = [array[j], array[i]]; 
                                } 
                                return array
                            }

                            const shuffledArray = shuffle(pecas)
                            const mappedArray = shuffledArray.map((el, i) => {
                                return <Card name={el.name} price={el.price} url={el.url} key={i} ref={el => cardRefs.current[i] = el}/>
                            })

                            return mappedArray
                        })()
                    }
                    </ScrollView>
                </View>
        </View>
    )
}