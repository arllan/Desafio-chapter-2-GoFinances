import React from 'react';
import { Container, ContainerInput, Header, Text, ButtonForm } from './styles';
import { Input } from './Input/Index';
import * as yup from 'yup';

export function FormularioValida() {
    return(
        <Container>
            <Header cor="#4169E1">
                <Text type="big">Formulário</Text>
            </Header>

            <ContainerInput>
                <Input placeholder="Texto"/>

                <ButtonForm>
                    <Text type="sm">ENVIAR</Text>
                </ButtonForm>
            </ContainerInput>
        </Container>
    );
}