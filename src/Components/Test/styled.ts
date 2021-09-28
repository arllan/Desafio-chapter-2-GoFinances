import styled from "styled-components/native";
import { TextProps, TouchableOpacityProps } from 'react-native';

interface PropsButton extends TouchableOpacityProps {
    width: 'small' | 'big';
}

interface PropsText extends TextProps{
    fontSize: 'small' | 'big';
}

export const Button = styled.TouchableOpacity<PropsButton>`
    width: ${({width}) => width === 'big' ? '100%' : '50%' };
    background-color: green;
    padding: 10px 0px;
`;

export const Text = styled.Text<PropsText>`
    font-size: ${({fontSize}) => fontSize === 'big' ? 20 : 15}px;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: ${({theme}) => theme.colors.shape};
`;