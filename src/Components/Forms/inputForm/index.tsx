import React from "react";
import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";
import { Input } from "../Input";
import { Container, Error } from "./styles";

interface Props extends TextInputProps {
  control: Control; // elemento da lib que e preciso
  name: string; // nome do elemento
  error: string;
}

export function InputForm({ control, name, error, ...rest }: Props) {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {/* esse trecho só mostra se tiver algum erro e se caso não tenha não mostra */}
      {error && <Error>{error}</Error>}
    </Container>
  );
}
