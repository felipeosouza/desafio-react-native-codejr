import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Image, View, StyleSheet } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { height, width } from '../modules/DimensionsModule'
//Components
import CustomText from './CustomText'
import { Shadow } from 'react-native-shadow-2'



export default forwardRef(({name, price, url}, ref) => {
        const cardRef = useRef();
        const currentX = useSharedValue(0);

        //Medidas do card
        const initialX = useRef(0)
        const aspectRatio = 0.8

        const cardContainerStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        scale: interpolate(currentX.value, [0, width/1.4, width], [1, 1, 0.9], 'clamp'),
                    }
                ]
            }
        })

        //Gatilho de animação
        useImperativeHandle(ref, () => {
            return {
              setOffset(offsetX) {
                currentX.value = initialX.current - offsetX;
              }
            };
          }, []);

        const styles = StyleSheet.create({
            cardContainer: {
                height: '90%',
                aspectRatio: aspectRatio,
                marginHorizontal: width * 0.02,
            },
            shadowBox: {
                height: '100%',
                width: '100%',
                borderRadius: 8,
                backgroundColor: 'black',
                justifyContent: 'space-between',
                overflow: 'hidden'
            },
            productImage: {
                resizeMode: 'cover',
                width: '100%',
                height: '60%'
            },
            name: {
                flex: 1
            },
            price: {
                flex: 0.5,
                flexDirection: 'row',
                alignItems: 'center',
                
            },
            priceTag: {
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
                transform: [{rotateZ: '-35deg'}]
            },
            priceTagContainer: {
                height: '90%',
                width: '10%',
                justifyContent: 'center',
                paddingBottom: '2%'
            },
            padding: {
                paddingHorizontal: '3%'
            }
        })

        return (
            <Animated.View style = {[styles.cardContainer, cardContainerStyle]}
                           ref={cardRef}
                           onLayout={(el) => {
                              initialX.current = el.nativeEvent.layout.x
                              currentX.value = initialX.current
                           }}>
                <Shadow style={styles.shadowBox} startColor='#202020' offset={['3%', '8%']} distance={height*0.006} sides={{top: false, start: false}}>
                    <Image style={styles.productImage}
                        source={{uri: url}}
                    />
                    <View style={[styles.name, styles.padding]}>
                        <CustomText numberOfLines={2} style = {{fontFamily: 'Khand-SemiBold', fontSize: height*0.018}}>{name}</CustomText>
                    </View>
                    <View style={[styles.price, styles.padding]}>
                        <View style={styles.priceTagContainer}>
                            <Image style={styles.priceTag}
                                source={require('../../assets/images/price_tag.png')}
                            />
                        </View>
                        {/* <View style={styles.priceTagContainer}>
                        </View> */}
                        <CustomText style = {{fontFamily: 'Khand-SemiBold', fontSize: height*0.02, marginHorizontal: '5%'}}>R$ {price}</CustomText>
                    </View>
                </Shadow>
            </Animated.View>
        )
    }
)