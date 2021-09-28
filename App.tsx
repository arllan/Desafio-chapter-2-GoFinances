import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';

import { 
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
 } from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import { Register } from './src/screens/Register';
import { TestComponents } from './src/screens/TestComponents';

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
      <Register/>
    </ThemeProvider>
  );
}

