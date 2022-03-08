import React, { useState, useEffect } from 'react';
import { CarDTO } from '../../dtos/CarDTO';
import { StatusBar  } from 'expo-status-bar';
import { api } from '../../service/api';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    AppointmentsTitle,
    Appointments,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';

import { BackButton } from '../../components/BackButton';
import { FlatList } from 'react-native';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}

export function MyCars() {
    const theme = useTheme();
    const navigation = useNavigation();
    const [cars, setCars] = useState<CarProps[]>([] as CarProps[]);
    const [loading, setLoading] = useState(true);

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCards()  {
            try {
                const response = await api.get('/schedules_byuser?user_id=1')

                setCars(response.data)
            } catch (error) {
                console.log(error)

            } finally{
                setLoading(false)
            }
        }
        fetchCards()
    }, [])

    return (
        <Container>
            <Header>
                <StatusBar style="light" />
                <BackButton onPress={handleBack} color={theme.colors.shape} />

                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <SubTitle>Conforto, segurança e praticidade.</SubTitle>
            </Header>

            {loading 
            ?   <LoadAnimation />
            :
                <Content>
                    <Appointments>
                        <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Appointments>
                    <FlatList 
                        data={cars}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CarWrapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.startDate}</CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={20}
                                            color={theme.colors.text}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>
                        )}
                    />
                </Content>
            }
        </Container>
    );
}