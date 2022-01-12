import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from 'react-native';

interface PropsView {
    cor: string;
}

interface PropsButton {
    type: 'sm' | 'big' 
}


export const Container = styled.View`
    flex: 1;
    width: 100%;
    flex-direction: column;
    align-items: center;
    background-color: ${({theme}) => theme.colors.background};
`;

export const ContainerInput = styled.View`
    flex-direction: column;
    width: 90%;
    align-items: center;
    justify-content: center;
`;

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

export const ButtonForm = styled(TouchableOpacity)`
    width: 100%;
    background-color: ${({theme}) => theme.colors.secondary};
    padding: 18px;
    margin-top: 8px;
    border-radius: 5px;
    align-items: center;
`;