import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Bullet } from '../../../components/Bullet';
import { BackButton } from '../../../components/BackButton';
import { PasswordInput } from '../../../components/PasswordInput';

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle
} from './styles';
import { Button } from '../../../components/Button';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}

export function SignUpSecondStep() {
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = route.params as Params;
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    
    function handleBack() {
        navigation.goBack();
    }

    async function handleRegister() {
        if(!password || !passwordConfirm) {
            return Alert.alert('Atenção', 'Informe a senha e a confirme');
        }

        if(password !== passwordConfirm) {
            return Alert.alert('Atenção', 'As senha não são iguais ');
        }

        navigation.navigate('Confirmation', { 
            title: 'Conta criada!', 
            message: 'Agora é só fazer login\ne aproveitar', 
            nextScreen: 'SignIn' 
        })
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <Container>
                <Header>
                    <BackButton onPress={handleBack} />
                    <Steps>
                        <Bullet />
                        <Bullet active />
                    </Steps>
                </Header>

                <Title>
                    Crie sua{'\n'}conta
                </Title>
                <Subtitle>
                    Faça seu cadastro de{'\n'}forma rápida e fácil
                </Subtitle>

                <Form>
                    <FormTitle>2. Senha</FormTitle>
                    <PasswordInput
                        onChangeText={setPassword}
                        value={password}
                        iconName='lock'
                        placeholder='Senha'
                    />
                    <PasswordInput
                        onChangeText={setPasswordConfirm}
                        value={passwordConfirm}
                        iconName='lock'
                        placeholder='Repetir senha'
                    />
                </Form>

                <Button 
                    onPress={handleRegister}
                    color={theme.colors.success}
                    title='Cadastrar'
                />
            </Container>
        </KeyboardAvoidingView>
    );
}