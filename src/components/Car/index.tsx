import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CardImage,
} from './styles';

import GasolineSvg from '../../assets/gasoline.svg'
import EnergySvg from '../../assets/energy.svg'

import { CarDTO } from '../../dtos/CarDTO';

interface Props extends RectButtonProps {
    data: CarDTO;
}

export function Car({ data, ...rest }: Props) {
    return (
        <Container {...rest}>
            <Details>
                <Brand>{ data.brand }</Brand>
                <Name>{ data.name }</Name>

                <About>
                    <Rent>
                        <Period>{ data.rent.period }</Period>
                        <Price>{ `R$ ${data.rent.price}` }</Price>
                    </Rent>
                    
                    <Type>
                        {data.fuel_type === 'electric' ? <EnergySvg /> : <GasolineSvg /> }
                    </Type>
                </About>
            </Details>

            <CardImage
                source={{ uri: data.thumbnail }}
                resizeMode='cover'
            />
        </Container>
    );
}