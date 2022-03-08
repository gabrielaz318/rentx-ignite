import React from 'react';
import { StatusBar  } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
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

interface Props {
    title: string;
    message: string;
    nextScreen: any;
}

export function Confirmation() {
    const navigation = useNavigation();
    const route = useRoute();
    const { title, message, nextScreen } = route.params as Props;
    const { width } = useWindowDimensions();

    function handleHome() {
        navigation.navigate(nextScreen)
    }

    return (
        <Container>
        <StatusBar style="light" />
            <LogoSvg width={width} />
            
            <Content>
                <DoneSvg width={80} height={80} />
                <Title>{title}</Title>

                <Message>{message}</Message>
            </Content>

            <Footer>
                <ConfirmButton title="OK" onPress={handleHome}/>
            </Footer>
        </Container>
    );
}