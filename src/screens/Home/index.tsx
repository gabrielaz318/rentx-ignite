import React, { useEffect, useState } from 'react';
import { StatusBar  } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, BackHandler } from 'react-native';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

import Logo from '../../assets/logo.svg'
import { api } from '../../service/api';

import { Car } from '../../components/Car';

import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CarList,
} from './styles';

import { Load } from '../../components/Load';
import { CarDTO } from '../../dtos/CarDTO';
import { useTheme } from 'styled-components';
import { LoadAnimation } from '../../components/LoadAnimation';

interface NavigationProps {
    navigate: (
        screen: string,
        { car: CarDTO }
    ) => void;
}

export function Home() {
    const navigation = useNavigation<NavigationProps>();
    const theme = useTheme();
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);

    function handleCarDetails(car: CarDTO) {
        
        navigation.navigate('CarDetails', { car });
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars');
    }


    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCardsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        }
    })

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any){
            ctx.positionX = positionX.value
            ctx.positionY = positionY.value
        },
        onActive(event, ctx: any) {
            positionX.value = ctx.positionX + event.translationX
            positionY.value = ctx.positionY + event.translationY
        },
        onEnd() {
            // positionX.value = withSpring(0)
            // positionY.value = withSpring(0)
        },
    });

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/cars');
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    },[]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true
        })
    },[])

    return (
        <Container>
            <StatusBar style="light" />
            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>
                        {!loading ? `Total de ${cars.length} carros` : ''}
                    </TotalCars>
                </HeaderContent>
            </Header>
            {loading ? <LoadAnimation/> : 
                <CarList 
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => 
                        <Car data={item} onPress={() => handleCarDetails(item)}/>
                    }
                />
            }

            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[myCardsButtonStyle,{
                        position: 'absolute',
                        bottom: 13,
                        right: 22
                    }]}
                >
                    <ButtonAnimated onPress={handleOpenMyCars} style={[styles.button, {backgroundColor: theme.colors.main}]}>
                        <Ionicons
                            name="ios-car-sport"
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>
                </Animated.View>
            </PanGestureHandler>
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
})