import styled from "styled-components/native";
import { TextInput, TouchableOpacity } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

interface PropsView {
    cor: string;
}

interface PropsButton {
    type: 'sm' | 'big' 
}

export const Header = styled.View<PropsView>`
    width: 100%;
    height: ${RFValue(100)}px;
    background-color: ${({cor}) => cor};
    justify-content: center;
    align-items: center;
`;

export const Text = styled.Text<PropsButton>`
    color: ${({theme}) => theme.colors.background};
    text-align: center;
    font-size: ${({type}) => type === 'big' ? RFValue(25) : RFValue(18)}px;
`;

export const Container = styled.View`
    flex: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
    background-color: ${({theme}) => theme.colors.background};
`;


export const InputForm = styled(TextInput)`
    width: 100%;
    padding: 16px 18px;
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    background-color: ${({theme}) => theme.colors.shape};
    color: ${({theme}) => theme.colors.text_dark};
    border-radius: 5px;
    margin-top: 8px;
`;

export const ContainerInput = styled.View`
    flex-direction: column;
    width: 90%;
    align-items: center;
    justify-content: center;
`;

export const ButtonForm = styled(TouchableOpacity)`
    width: 100%;
    background-color: ${({theme}) => theme.colors.secondary};
    padding: 18px;
    margin-top: 8px;
    border-radius: 5px;
    align-items: center;
`;
