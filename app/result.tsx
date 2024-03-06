import {
  View,
  Text,
  StyleProp,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { resultHash } from "../data/resultHash";
import { router, useLocalSearchParams } from "expo-router";

export default function result() {
  const params = useLocalSearchParams<{ bmi?: string }>();
  const [resutlBmi, setResutlBmi] = React.useState<
    "Underweight" | "Normal" | "Overweight" | "Obese"
  >("Obese");
  const [bmi, setBmi] = useState(0);

  useEffect(() => {
    getBmiDataKey(Number.parseInt(params.bmi!));
    setBmi(Number.parseInt(params.bmi!));
  }, [params]);

  // Helpers
  const getBmiDataKey = (value?: number | undefined) => {
    if (value! < 18.5) {
      setResutlBmi("Underweight");
    } else if (value! >= 18.5 && value! <= 24.9) {
      setResutlBmi("Normal");
    } else if (value! >= 25 && value! <= 29.9) {
      setResutlBmi("Overweight");
    } else {
      setResutlBmi("Obese");
    }
  };

  // Styles
  let rangeHeaderStyle: StyleProp<TextStyle> = {
    color: resultHash[resutlBmi].color,
    fontSize: 22,
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 2,
  };

  // Handlers
  const handleRecalculate = () => {
    // navigation.goBack();
    router.back();
  };

  return (
    <View style={styles.container}>
      {/** Inner Main container */}
      <View style={styles.inner}>
        <Text style={styles.header}>Your Result</Text>

        {/** Result view */}
        <View style={styles.result}>
          <Text style={rangeHeaderStyle}>{resutlBmi}</Text>

          <Text style={styles.value}>{bmi}</Text>

          <Text style={styles.rangeLabel}>{resutlBmi} BMI range:</Text>

          <Text style={styles.rangeText}>{resultHash[resutlBmi].range}</Text>

          <Text style={styles.description}>{resultHash[resutlBmi].text}</Text>
        </View>

        {/** Button */}
        <View style={{ marginTop: "5%" }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btnStyle}
            onPress={handleRecalculate}
          >
            <Text style={styles.btnTextStyle}>Re-Calculate your BMI</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#080A1C",
    flex: 1,
    padding: "3%",
  },

  inner: {
    backgroundColor: "#0A0C21",
    flex: 1,
    padding: 10,
  },

  header: {
    color: "white",
    fontSize: 40,
    fontWeight: "600",
  },

  result: {
    backgroundColor: "#1D1F32",
    // backgroundColor: 'red',
    flex: 1,
    marginVertical: "15%",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: "10%",
  },

  btnStyle: {
    backgroundColor: "#D83456",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
  },

  btnTextStyle: {
    color: "white",
    fontSize: 20,
    textTransform: "uppercase",
  },

  value: {
    color: "white",
    fontSize: 90,
    fontWeight: "700",
    marginVertical: "10%",
  },

  rangeLabel: {
    color: "#8E8E98",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.75,
  },

  rangeText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.75,
    marginTop: "3%",
  },

  description: {
    color: "white",
    fontSize: 20,
    letterSpacing: 0.75,
    marginTop: "15%",
    textAlign: "center",
  },
});
