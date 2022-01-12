import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/routes/app.routes';

import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
 } from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
// import { Register } from './src/screens/Register';
// import { TestComponents } from './src/experimentos/TestComponents';
// import { Formulario } from './src/experimentos/validacaoForm/index';
// import { FormularioValida } from './src/experimentos/validacaoYup/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading/>
  }

  // <TestComponents/> componente de teste

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes/>
        {/* <Register/> */}
        {/* <Formulario/> */}
        {/* <FormularioValida/> */}
      </NavigationContainer>
    </ThemeProvider>
  );
}

