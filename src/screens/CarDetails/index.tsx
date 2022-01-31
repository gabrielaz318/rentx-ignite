import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
    Container,
    Header,
    CarImages,
    Details,
    Description,
    Brand,
    Name,
    Period,
    Price,
    Rent,
    About,
    Acessories,
    Footer
} from './styles';

import { CarDTO } from '../../dtos/CarDTO';

interface Params {
    car: CarDTO;
}

export function CarDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();
    const { car } = route.params as Params;



    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
        console.log(event.contentOffset.y);
    });

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 80],
                Extrapolate.CLAMP
            )
        }
    })

    const slidersCardsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })



    function handleConfirmRental() {
        navigation.navigate('Scheduling', { car })
    }

    function handleBack() {
        navigation.goBack();
    }

    
    return (
        <Container>
            <StatusBar style="dark" />
            <Animated.View
                style={[
                    headerStyleAnimation, 
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary }
                ]}
            >
                <Header style={{zIndex: 2}}>
                    <BackButton onPress={handleBack} />
                </Header>
                <Animated.View style={[slidersCardsStyleAnimation]}>
                    <CarImages>
                        <ImageSlider imagesUrl={car.photos} />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{ car.brand }</Brand>
                        <Name>{ car.name }</Name>
                    </Description>

                    <Rent>
                        <Period>{ car.rent.period }</Period>
                        <Price>R$ { car.rent.price }</Price>
                    </Rent>
                </Details>

                <Acessories>
                    { car.accessories.map(accessory => (
                        <Accessory 
                            key={accessory.type} 
                            name={ accessory.name } 
                            icon={getAccessoryIcon(accessory.type)} 
                        />
                    )) }
                </Acessories>

                <About>{ car.about }</About>
                <About>{ car.about }</About>
                <About>{ car.about }</About>
                <About>{ car.about }</About>
                <About>{ car.about }</About>
            </Animated.ScrollView>

            <Footer>
                <Button title="Escolher período de aluguel" onPress={handleConfirmRental} />
            </Footer>
        </Container>
    );
}


const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1
    },
    back: {
        marginTop: 24
    }
})