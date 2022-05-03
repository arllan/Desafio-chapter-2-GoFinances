import React from "react";

import { render } from "@testing-library/react-native";
import { Profile } from "../../screens/Profile";

// função de teste - dois parametros | 1- parametros o nome indentificar o teste 2- função com o que vai ter que testar
test("Verificar se input com placeholder correto está na tela", () => {
  const { getByPlaceholderText } = render(<Profile />);

  // procura por um placeholder com o texto com "Nome"
  const inputName = getByPlaceholderText("Nome");
  console.log(inputName);

  // comando para validar se estiver o que foi esperado - toBeTruthy = verifica se existe alguma placeholder na tela
  expect(inputName.props.placeholder).toBeTruthy();
});

// mostra todo o conteudo que se tem rendenrizado na tela

test("Motra o conteudo como e redenrizado ", () => {
  const { debug } = render(<Profile />);

  debug();
});
