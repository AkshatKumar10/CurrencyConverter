import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import CurrencyConverter from "@/components/CurrencyConverter";

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <CurrencyConverter />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
