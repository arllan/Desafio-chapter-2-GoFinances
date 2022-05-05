import React from "react";
import { View, Text, TextInput, Button } from "react-native";

export function Profile() {
  return (
    <View>
      <Text testID="text-title">Perfill</Text>
      <TextInput
        testID="input-name"
        value="Arllan"
        placeholder="Nome"
        autoCorrect={false}
      />
      <TextInput testID="input-surname" value="Pablo" placeholder="Sobrenome" />
      <Button title="Savar" onPress={() => {}} />
    </View>
  );
}
