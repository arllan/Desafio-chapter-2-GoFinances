import React from 'react';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Container, ContainerInput, ButtonForm, Header, Text } from './styles';
import { InputForm } from './InputForm/index'


// interface de dados da função que recebe os dados do input
interface FormData {
    nome: string;
    cidade: string;
}

export function Formulario() {

    // esquemas de validação do campos 
    const schema = Yup.object().shape({
        nome: Yup
        .string()
        .required('Nome é obrigatorio'),
        cidade: Yup
        .number()
        .typeError('Informe um valor númerico')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatorio')
    });

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleRegister(form: FormData){
            
        const data = {
            nome: form.nome,
            cidade: form.cidade
        }

        console.log(data)
    }

    return(
        <Container>
            <Header cor="#4169E1">
                <Text type="big">Formulário</Text>
            </Header>
            
            <ContainerInput>
                <InputForm
                    name="nome"
                    control={control}
                    placeholder="Nome"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    error={errors.nome && errors.nome.message}
                />

                <InputForm
                    name="cidade"
                    control={control}
                    placeholder="Preço"
                    keyboardType="numeric"
                    error={errors.cidade && errors.cidade.message}
                />
                
                <ButtonForm onPress={handleSubmit(handleRegister)}>
                    <Text type="sm">SALVAR</Text>
                </ButtonForm>
            </ContainerInput>
        </Container>
    );
}
