import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { Input } from '../Input';
import { Container } from '../Input/styles';

interface Props extends TextInputProps {
    control: Control, // elemento da lib que e preciso 
    name: string // nome do elemento
}

export function InputForm({
    control,
    name,
    ...rest
}: Props){
    return(
        <Container>
            <Controller
                control={control}
                render={({field: { onChange, value}}) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                )}
                name={name}
            />
        </Container>
    );
}
