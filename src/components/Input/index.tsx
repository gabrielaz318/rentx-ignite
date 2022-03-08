import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
 
import {
    Container,
    InputText,
    IconContainer,
} from './styles';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function Input({ iconName, value, ...rest }: InputProps) {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleIsFocused() {
        setIsFocused(true)
    }

    function handleIsBlur() {
        setIsFocused(false)
        setIsFilled(!!value)
    }

    return (
        <Container>
            <IconContainer isFocused={isFocused}>
                <Feather
                    name={iconName}
                    size={24}
                    color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>

            <InputText 
                isFocused={isFocused}
                onFocus={handleIsFocused}
                onBlur={handleIsBlur}
                {...rest} 
            />
        </Container>
    );
}