import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { Codes } from "../constants/currencies";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [hasConverted, setHasConverted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const res = await axios.get("https://open.er-api.com/v6/latest/USD");
      setRates(res.data.rates);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch exchange rates");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConvert = () => {
    if (!amount) {
      Alert.alert("Invalid Input", "Please enter a valid number");
      return;
    }

    const fromRate = rates[from];
    const toRate = rates[to];

    if (fromRate && toRate) {
      const result = (parseFloat(amount) / fromRate) * toRate;
      setConvertedAmount(result.toFixed(2));
      setHasConverted(true);
    } else {
      Alert.alert("Error", "Currency rate not available");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setHasConverted(false);
    setConvertedAmount(null);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const getSymbol = (code: string) => Codes.find(c => c.code === code)?.symbol || code;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>
            <Text style={styles.icon}>💱</Text> Currency Converter
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            onFocus={handleFocus}
            onBlur={() => setIsFocused(false)}
          />
          <Text style={styles.label}>From:</Text>
          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              onValueChange={(value) => {
                setFrom(value);
                setHasConverted(false);
                setConvertedAmount(null);
              }}
              value={from}
              items={Codes.map(({ code }) => ({ label: code, value: code }))}
            />
          </View>

          <Text style={styles.label}>To:</Text>
          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              onValueChange={(value) => {
                setTo(value);
                setHasConverted(false);
                setConvertedAmount(null);
              }}
              value={to}
              items={Codes.map(({ code }) => ({ label: code, value: code }))}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonInner}
            onPress={handleConvert}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Convert</Text>
          </TouchableOpacity>

          {hasConverted && convertedAmount && !isFocused && (
            <Text style={styles.result}>
            {getSymbol(from)} {amount} = {getSymbol(to)} {convertedAmount}
          </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  icon: {
    fontSize: 40,
    marginRight: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "600",
    fontSize: 18,
  },
  result: {
    fontSize: 24,
    marginTop: 40,
    textAlign: "center",
    fontWeight: 700,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerWrapper: {
    width: "100%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  buttonInner: {
    backgroundColor: "#808080",
    paddingVertical: 12,
    paddingHorizontal: 24,
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    width: "50%",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CurrencyConverter;
