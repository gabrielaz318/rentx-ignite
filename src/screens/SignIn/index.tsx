import * as Yup from 'yup';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Alert, KeyboardAvoidingView } from 'react-native';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PasswordInput } from '../../components/PasswordInput';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Footer,
    Form,
} from './styles';

export function SignIn() {
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    const [password, setPassword] = useState('');

    function handleNewAccount() {
        navigation.navigate('SignUpFirstStep');
    }

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
                password: Yup.string().required('Senha obrigatória')
            });
    
            await schema.validate({ email, password });
            Alert.alert('Tudo certo')
        } catch (error) {
            if(error instanceof Yup.ValidationError) {
                return Alert.alert('Opa', error.message);
            } else {
                Alert.alert('Erro na autenticação', 'Ocorreu um erro ao realizar o login, verifique as credenciais');
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <Container>
                <StatusBar style='dark' />
                <Header>
                    <Title>
                        Estamos{'\n'}
                        quase lá.
                    </Title>
                    <SubTitle>
                        Faça seu login para começar{'\n'}
                        uma experiência incrível.
                    </SubTitle>
                </Header>

                <Form>
                    <Input
                        iconName='mail'
                        placeholder='E-mail'
                        keyboardType='email-address'
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={setEmail}
                        value={email}
                    />
                    <PasswordInput
                        iconName='lock'
                        placeholder='Senha'
                        onChangeText={setPassword}
                        value={password}
                    />
                </Form>

                <Footer>
                    <Button
                        title='Login'
                        onPress={handleSignIn}
                        enabled={true}
                        load={false}
                    />
                    <Button
                        title='Criar conta gratuita'
                        color={theme.colors.background_secondary}
                        light
                        onPress={handleNewAccount}
                        enabled={true}
                        load={false}
                    />
                </Footer>
            </Container>
        </KeyboardAvoidingView>
    );
}