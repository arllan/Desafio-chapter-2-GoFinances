import React from "react";

import { render } from "@testing-library/react-native";
import { Input } from ".";
import { ThemeProvider } from "styled-components/native";
import theme from "../../../global/styles/theme";

/*
    ATENÇÃO - esse teste e feito com CONTEXTO e para isso como estamos testando um componente isolado e preciso adicionar 

*/

/* o describe e comando de suite, ou seja e uma forma de agrupar e indentificar um conjunto de teste
    assim podemos criar todos os testes respectivos ao componente de input e indentificar esse conjunto de teste por um nome
*/

/*
 A forma de testar um componente e um pouco diferente por que podemos chamar 
 o componente como utilizamos ele em uma tela e assim passar os parametros do componente
 para poder testar e verificar se tudo esta certo ao passar os parametos o componente e executado de forma correta
*/

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Input Component", () => {
  it("testando borba e props no componente feito com styled", () => {
    const { getByTestId, debug } = render(
      <Input
        testID="input-email"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        active={true}
      />,
      {
        wrapper: Providers,
      }
    );

    //Mostra como está sendo redenrizado os componentes
    // debug();

    // indentifica o componente adicionado no proprio teste
    const inputComponent = getByTestId("input-email");

    // VERIFICA - se o componente tem a borba da cor informada abaixo
    expect(inputComponent.props.style[0].borderColor).toEqual(
      theme.colors.attention
    );

    // VERIFICA -  se a borda tem 3 pixels de medida - foi adicionado [0] por que o campo pode receber varios estilos e no casso como apenas estamos testando primeiro estamos apenas pegando o primeiro array com estilos
    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
});
