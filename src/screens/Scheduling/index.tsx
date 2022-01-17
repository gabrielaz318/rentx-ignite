import React from 'react';
import { StatusBar  } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components/native';

import ArrowSvg from '../../assets/arrow.svg'
import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

export function Scheduling() {
    const theme = useTheme();
    const navigation = useNavigation();

    function handleSchedulingDetails() {
        navigation.navigate('SchedulingDetails')
    }

    return (
        <Container>
            <Header>
                <StatusBar style="light" />
                <BackButton onPress={() => {} } color={theme.colors.shape} />

                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue selected={true}>18/06/2022</DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValue selected={false}></DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar />
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleSchedulingDetails} />
            </Footer>
        </Container>
    );
}