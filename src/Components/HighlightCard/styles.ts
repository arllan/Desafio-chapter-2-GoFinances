import styled, { css } from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

//interface de parametros passados para o icon 
interface TypeProps {
    type: 'up' | 'down' | 'total'; // esse campo só pode ter essa três opções
}

export const Container = styled.View<TypeProps>`
    background-color: ${({theme, type}) => type === 'total' ? theme.colors.secondary : theme.colors.shape };
    width: ${RFValue(300)}px;
    border-radius: 5px;
    padding: 10px 18px;
    padding-bottom: ${RFValue(10)}px;
    margin-right: 16px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;

`;

export const Title = styled.Text<TypeProps>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme, type}) => type === 'total' ? theme.colors.shape : theme.colors.text_dark };
`;

// neste trecho tempos a parte condicional que são os if para adicionar estilos a parti de parametros recebidos
export const Icon = styled(Feather)<TypeProps>`
    font-size: ${RFValue(40)}px;

    ${({type})=> type === 'up' && css`
        color: ${({theme}) => theme.colors.success};
    `}

    ${({type})=> type === 'down' && css`
        color: ${({theme}) => theme.colors.attention};
    `}

    ${({type})=> type === 'total' && css`
        color: ${({theme}) => theme.colors.shape};
    `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;
    color: ${({theme, type}) => type === 'total' ? theme.colors.shape : theme.colors.text_dark };
    margin-top: 20px;
`;

export const LasTransaction = styled.Text<TypeProps>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${({theme, type}) => type === 'total' ? theme.colors.shape : theme.colors.text };
`;
