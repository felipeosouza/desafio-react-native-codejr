import React, { forwardRef } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Shadow } from 'react-native-shadow-2'
import CustomText from './CustomText'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
//Components



export default props => {
    const styles = StyleSheet.create({
        centered: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        button: {
            borderRadius: 5,
            backgroundColor: props.color || '#555555'
        }
    })

    const AnimatablePressable = forwardRef((props, ref) => {
        return <Pressable ref={ref} {...props}/>
    })
    
    const AnimatedPressable = Animated.createAnimatedComponent(AnimatablePressable)
    const buttonTransform = useSharedValue(1)

    const buttonAnimation = useAnimatedStyle(()=> {
        return {
            transform: [
                {
                    scale: buttonTransform.value
                }
            ]
        }
    })

    const handlePress = ()=> {
        const duration = 50;
        buttonTransform.value = withTiming(0.9, {
            duration: duration,
        })

        setTimeout(()=> {
            buttonTransform.value = withTiming(1, {duration: duration})
            props.action()
        }, duration)

    }

    return (
        <AnimatedPressable
            style={[props.style, buttonAnimation]}
            onPress={handlePress}
        >
            <Shadow distance={3} offset={['1%', '10%']} style = {[styles.centered, styles.button]} containerStyle={styles.centered}>
                    <CustomText style={{fontFamily: 'Khand-SemiBold', fontSize: props.fontSize, paddingHorizontal: '4%', paddingVertical: '2%'}}>{props.children}</CustomText>
            </Shadow>
        </AnimatedPressable>
    )
}