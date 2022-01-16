import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { HighlightCard } from "../../Components/HighlightCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../Components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainers,
} from "./style";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [HighlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  ); // o trecho - {} as HighlightData - informa que começa vazio do tipo HighlightData
  async function loadTransactions() {
    const dataKey = "@gofinances: transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expenseveTotal = 0;

    function getLastTransactionsDate(
      colletion: DataListProps[],
      type: "positive" | "negative"
    ) {
      const lastTransaction = new Date(
        Math.max.apply(
          Math,
          colletion
            .filter((transaction) => transaction.type === type)
            .map((transaction) => new Date(transaction.date).getTime())
        )
      );

      return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
        "pt-BR",
        { month: "long" }
      )}`;
    }

    // forma de tratar um objeto e retornar um novo a parti dele - IMPORTANTE!!!
    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expenseveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));
        return {
          id: item.id, // retorna o que entrou
          name: item.name, // retorna o que entrou
          amount: amount, // retorna o que foi tratado - podemos apenas colocar para simplificar amount que outomaticamente entende como 'amount: amount'
          type: item.type, // retorna o que entrou
          category: item.category, // retorna o que entrou
          date: date, // retorna um data tratada
        };
      }
    );

    setTransactions(transactionsFormatted); // passa o objeto já tratado para o hook
    const lastTransactionsEntries = getLastTransactionsDate(
      transactions,
      "positive"
    );

    const lastTransactionsExpensives = getLastTransactionsDate(
      transactions,
      "negative"
    );

    const totalInterval = `01 a ${lastTransactionsExpensives}`;

    const total = entriesTotal - expenseveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada dia ${lastTransactionsEntries}`,
      },
      expensives: {
        amount: expenseveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última saída dia ${lastTransactionsExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  // faz parte da lib que entra nesse elemento toda vez quando a tela ganha focus - e uma forma de recarregar pagina quando voltar nela
  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainers>
          <ActivityIndicator color="red" size="large" />
        </LoadContainers>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/6806338?v=4",
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Rodrigo</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={HighlightData?.entries?.amount}
              lastTransaction={HighlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saidas"
              amount={HighlightData?.expensives?.amount}
              lastTransaction={HighlightData.expensives.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={HighlightData?.total?.amount}
              lastTransaction={HighlightData.total.lastTransaction}
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
