import React, { useEffect, useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { InputForm } from "../../Components/Forms/inputForm";
import { Button } from "../../Components/Forms/Button";
import { TransactionTypeButton } from "../../Components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../Components/Forms/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from "./styles";
import { useAuth } from "../../hooks/auth";

interface FormData {
  name: string;
  amount: string;
}

// esquemas de validação do campos
const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatorio"),
  amount: Yup.number()
    .typeError("Informe um valor númerico")
    .positive("O valor não pode ser negativo")
    .required("O valor é obrigatorio"),
});

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const { user } = useAuth();
  const dataKey = `@gofinances:transactions_user${user.id}`; // constante da chave do async storage

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeButton(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) return Alert.alert("Selecionae o tipo da transação");

    if (category.key === "category")
      return Alert.alert("Selecionae a categoria");

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const searchData = await AsyncStorage.getItem(dataKey); // buscar os dados que já estao salvos da chave
      const currentData = searchData ? JSON.parse(searchData!) : []; // se tiver dados retornas e se não tem dados retorna array vazio
      const dataFormatted = [
        // forma de juntar o estado desestruturado com os dados que estão entrando
        ...currentData,
        newTransaction,
      ];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted)); // Salva o dado tratado

      reset(); // comando do reset do hookform
      // limpar os dados dos campos apos salvar as informacoes
      setTransactionType("");
      setCategory({
        key: "",
        name: "",
      });

      // apos valvar as informacoes e resetar os campos vai direcionar para a pagina de listagem
      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey);
      console.log("Valores: ", JSON.parse(data!));
    }

    loadData();

    async function removeAll() {
      // remove todos os dados
      await AsyncStorage.removeItem(dataKey);
    }

    // removeAll();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeButton("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeButton("negative")}
                isActive={transactionType === "negative"}
              />
            </TransactionsTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
