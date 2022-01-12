import React from 'react';
import { TextInputProps, TextInput } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { AreaInputFormGroup, Error } from './styles';
import { Input } from '../Input/Index';

interface Props extends TextInputProps {
    control: Control,
    name: string,
    error: string
} 

export function InputForm({ control, name, error, ...rest}: Props){
    return(
        <AreaInputFormGroup>
            <Controller
                control={control}
                render={({field: {onChange, value}}) =>(
                    <Input
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                )}
                name={name}
            />
                {error && <Error>{ error }</Error>}
        </AreaInputFormGroup>
    );
}

