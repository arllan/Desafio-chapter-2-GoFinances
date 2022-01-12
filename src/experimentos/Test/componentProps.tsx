import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Button, Text } from './styled';

interface Props extends TouchableOpacityProps {
    title: string;
    width: 'small' | 'big';
    fontSize: 'small' | 'big';
}

export function ComponentProps({ title, width, fontSize, ...rest } : Props){
    return(
        <Button width={width} {...rest}>
            <Text fontSize={fontSize}>{title}</Text>
        </Button>
    );
}

