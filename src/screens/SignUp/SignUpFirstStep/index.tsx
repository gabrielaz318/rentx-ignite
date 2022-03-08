import * as Yup from 'yup';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Input } from '../../../components/Input';
import { Bullet } from '../../../components/Bullet';
import { BackButton } from '../../../components/BackButton';
import { Alert, KeyboardAvoidingView } from 'react-native';

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

export function SignUpFirstStep() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicense, setDriverLicense] = useState('');

    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome é obrigatório'),
                email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
                driverLicense: Yup.string().required('CNH é obrigatória')
            });

            const data = { name, email, driverLicense };
            await schema.validate(data);
            navigation.navigate('SignUpSecondStep', { user: data });
        } catch (error) {
            if(error instanceof Yup.ValidationError) {
                return Alert.alert('Opa', error.message);
            }
        }
    }

    function handleBack() {
        navigation.goBack();
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <Container>
                <Header>
                    <BackButton onPress={handleBack} />
                    <Steps>
                        <Bullet active />
                        <Bullet />
                    </Steps>
                </Header>

                <Title>
                    Crie sua{'\n'}conta
                </Title>
                <Subtitle>
                    Faça seu cadastro de{'\n'}forma rápida e fácil
                </Subtitle>

                <Form>
                    <FormTitle>1. Dados</FormTitle>
                    <Input 
                        onChangeText={setName}
                        value={name}
                        iconName='user'
                        placeholder='Nome'
                    />
                    <Input 
                        onChangeText={setEmail}
                        value={email}
                        iconName='mail'
                        placeholder='E-mail'
                        keyboardType='email-address'
                    />
                    <Input 
                        onChangeText={setDriverLicense}
                        value={driverLicense}
                        iconName='credit-card'
                        placeholder='CNH'
                        keyboardType='numeric'
                    />
                </Form>

                <Button 
                    onPress={handleNextStep}
                    title='Próximo'
                />
            </Container>
        </KeyboardAvoidingView>
    );
}