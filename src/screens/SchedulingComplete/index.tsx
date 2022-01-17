import React from 'react';
import { StatusBar  } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
    Container,
    Content,
    Title,
    Message,
    Footer,
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

export function SchedulingComplete() {
    const navigation = useNavigation();
    const { width } = useWindowDimensions();

    function handleHome() {
        navigation.navigate('Home')
    }

    return (
        <Container>
        <StatusBar style="light" />
            <LogoSvg width={width} />
            
            <Content>
                <DoneSvg width={80} height={80} />
                <Title>Carro alugado!</Title>

                <Message>
                    Agora você só precisa ir {'\n'}
                    até a concessionária da RENTX {'\n'}
                    pegar o seu aotomóvel.
                </Message>
            </Content>

            <Footer>
                <ConfirmButton title="OK" onPress={handleHome}/>
            </Footer>
        </Container>
    );
}