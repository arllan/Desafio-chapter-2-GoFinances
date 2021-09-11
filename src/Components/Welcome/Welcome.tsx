import React from 'react';
import { View, Text } from 'react-native';

/*
    Forma de declarar o componente - <Welcome title="React Native Bare Workflow com TypeScript"/>
    Forma de importa o componente - import { Welcome } from './src/Components/Welcome';
*/

interface Props {
    title: string;
}

export function Welcome({title}: Props){
    return(
        <View>
            <Text>{title}</Text>
        </View>
    );
}