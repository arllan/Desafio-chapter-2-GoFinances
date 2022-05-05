import React from "react";

import { render } from "@testing-library/react-native";
import { Profile } from "../../screens/Profile";

/* E uma forma de organizar os teste, e assim dizer que todos os teste abaixo fazem parte de profile. Forma de agrupar eles
 */
describe("Profile", () => {
  // função de teste - dois parametros | 1- parametros o nome indentificar o teste 2- função com o que vai ter que testar
  it("Verificar se input com placeholder correto está na tela", () => {
    const { getByPlaceholderText } = render(<Profile />);

    // procura por um placeholder com o texto com "Nome"
    const inputName = getByPlaceholderText("Nome");
    // console.log(inputName);

    // comando para validar se estiver o que foi esperado - toBeTruthy = verifica se existe alguma placeholder na tela
    expect(inputName.props.placeholder).toBeTruthy();
  });

  // mostra todo o conteudo que se tem rendenrizado na tela

  it("Motra o conteudo como e redenrizado ", () => {
    const { debug } = render(<Profile />);

    // debug();
  });

  it("verificar se os dados foram carregados", () => {
    // consegue pegar um elemento especifico da tela por um 'id'
    const { getByTestId } = render(<Profile />);

    // busca pelos id nos componente da tela
    const inputName = getByTestId("input-name");
    const inputSurname = getByTestId("input-surname");

    // verifica se existe os valores nos campos
    expect(inputName.props.value).toEqual("Arllan");
    expect(inputSurname.props.value).toEqual("Pablo");
  });

  it("verificar se o titulo está correto", () => {
    // rendenriza a screen com todos os componentes
    const { getByTestId } = render(<Profile />);

    // Pelo id procura o elemento
    const textTitle = getByTestId("text-title");

    // verificar se dentro do componente tem o texto informado
    expect(textTitle.props.children).toContain("Perfil");
  });
});
