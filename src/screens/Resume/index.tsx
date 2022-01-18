import React, { useEffect, useState } from "react";
import { HistoryCard } from "../../Components/HistoryCard";
import { Container, Header, Title, ChartContainer } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../utils/categories";
import { FlatList } from "react-native";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";

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
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  async function loadData() {
    const dataKey = "@gofinances: transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response!) : [];
    // console.log("@GET", responseFormatted);

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === "negative"
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
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resume</Title>
      </Header>
      <ChartContainer>
        <VictoryPie
          data={totalByCategories}
          x="percent"
          y="total"
          colorScale={totalByCategories.map((category) => category.color)}
          style={{
            labels: { fontSize: RFValue(18), fontWeight: "bold", fill: "#FFF" },
          }}
          labelRadius={50}
        />
      </ChartContainer>

      <FlatList
        data={totalByCategories}
        style={{ padding: 24 }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <HistoryCard
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        )}
      />
    </Container>
  );
}
