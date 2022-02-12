import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { HistoryCard } from "../../Components/HistoryCard";
import {
  Container,
  Header,
  Title,
  ChartContainer,
  Content,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainers,
  ContentView,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../utils/categories";
import { FlatList } from "react-native";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { addMonths, subMonths, format } from "date-fns"; // formata de soma e subtracao de datas
import { ptBR } from "date-fns/locale"; // formata no padrao brasileiro
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/core";
import uuid from "react-native-uuid";
import { useAuth } from "../../hooks/auth";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const { signOut, user } = useAuth();

  // funcao de soma mais um mes ao state
  function handleDateChange(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response!) : [];
    // console.log("@GET", responseFormatted);

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (acumullator: number, expensive: TransactionData) => {
        return acumullator + Number(expensive.amount);
      },
      0
    );

    console.log(expensivesTotal);

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;
      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(0)}`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }
    });

    console.log("values: ", totalByCategory);
    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  // useEffect(() => {
  //   loadData();
  // }, [selectedDate]);

  // forma de certa de sempre carregar pagina ao ser acessada na pilha indo e voltando
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resume</Title>
      </Header>
      {isLoading ? (
        <LoadContainers>
          <ActivityIndicator color="red" size="large" />
        </LoadContainers>
      ) : (
        <>
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange("prev")}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>
              <Month>
                {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
              </Month>

              <MonthSelectButton onPress={() => handleDateChange("next")}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                x="percent"
                y="total"
                colorScale={totalByCategories.map((category) => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: "bold",
                    fill: "#FFF",
                  },
                }}
                labelRadius={50}
              />
            </ChartContainer>
            <ContentView>
              <FlatList
                data={totalByCategories}
                style={{ padding: 5 }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                  <HistoryCard
                    title={item.name}
                    amount={item.totalFormatted}
                    color={item.color}
                  />
                )}
              />
            </ContentView>
          </Content>
        </>
      )}
    </Container>
  );
}
