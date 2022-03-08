import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import {
    Container,
    Title
} from './styles';

interface Props extends RectButtonProps {
    title: string;
    color?: string;
    load?: boolean; 
    light?: boolean;
}

export function Button({ 
    title, 
    color, 
    load = false, 
    enabled = true, 
    light = false, 
    ...rest  
}: Props) {
    const theme = useTheme();


    return (
        <Container 
            {...rest} 
            color={color ? color : theme.colors.main} 
            enabled={enabled} 
            style={{ opacity: (enabled === true || load === true) ? 1 : .5 }}
        >
            {
                load ? 
                <ActivityIndicator color={theme.colors.shape} /> 
                :
                <Title light={light}>{ title }</Title>
            }
        </Container>
    );
}