import React, { useState } from "react";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../Components/SignInSocialButton";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

import { useAuth } from "../../hooks/auth";
import { ActivityIndicator, Alert } from "react-native";

export function SignIn() {
  const [isLoading, setIsLoadin] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoadin(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log("Problema login: ", error);
      Alert.alert("Não foi possível conectar a conta Google");
      setIsLoadin(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoadin(true);
      return await signInWithApple();
    } catch (error) {
      console.log("Problema login: ", error);
      Alert.alert("Não foi possível conectar a conta Apple");
      setIsLoadin(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas {"\n"} finanças de forma {"\n"} muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com uma das {"\n"} contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          {Platform.OS === "ios" ? (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          ) : (
            <></>
          )}
        </FooterWrapper>
        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
