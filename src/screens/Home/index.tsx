import React, { useEffect, useState } from 'react';
import { StatusBar  } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

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

interface NavigationProps {
    navigate: (
        screen: string,
        { car: CarDTO }
    ) => void;
}

export function Home() {
    const navigation = useNavigation<NavigationProps>();
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);

    function handleCarDetails(car: CarDTO) {
        
        navigation.navigate('CarDetails', { car });
    }

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
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>
            {loading ? <Load/> : 
                <CarList 
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => 
                        <Car data={item} onPress={() => handleCarDetails(item)}/>
                    }
                />
            }
        </Container>
    );
}