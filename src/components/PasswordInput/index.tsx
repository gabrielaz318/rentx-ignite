import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
 
import {
    Container,
    InputText,
    IconContainer,
    ChangePasswordVisibilityButton,
} from './styles';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: InputProps) {
    const theme = useTheme();
    const [isPasswordVisible, setIsPasswordVisible] = useState(true)
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handlePasswordVisibilityChange() {
        setIsPasswordVisible(oldState => !oldState)
    }

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
                {...rest} 
                secureTextEntry={isPasswordVisible} 
                onFocus={handleIsFocused}
                onBlur={handleIsBlur}
                isFocused={isFocused}
            />

            <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
                <Feather
                    name={isPasswordVisible ? 'eye' : 'eye-off'}
                    size={24}
                    color={theme.colors.text_detail}
                />
            </ChangePasswordVisibilityButton>
        </Container>
    );
}