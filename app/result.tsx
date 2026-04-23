import {
  View,
  Text,
  StyleProp,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { resultHash } from "../data/resultHash";
import { router, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");

export default function result() {
  const params = useLocalSearchParams<{ bmi?: string }>();
  const [resutlBmi, setResutlBmi] = React.useState<
    "Underweight" | "Normal" | "Overweight" | "Obese"
  >("Normal");
  const [bmi, setBmi] = useState(0);

  useEffect(() => {
    const bmiVal = Number.parseFloat(params.bmi || "0");
    getBmiDataKey(bmiVal);
    setBmi(bmiVal);
  }, [params]);

  // Helpers
  const getBmiDataKey = (value: number) => {
    if (value < 18.5) {
      setResutlBmi("Underweight");
    } else if (value >= 18.5 && value <= 24.9) {
      setResutlBmi("Normal");
    } else if (value >= 25 && value <= 29.9) {
      setResutlBmi("Overweight");
    } else {
      setResutlBmi("Obese");
    }
  };

  const getPointerPosition = () => {
    const min = 16;
    const max = 40;
    if (bmi <= min) return 0;
    if (bmi >= max) return 100;
    return ((bmi - min) / (max - min)) * 100;
  };

  // Handlers
  const handleRecalculate = () => {
    router.back();
  };

  const categoryLabel = resutlBmi === "Normal" ? "Normal Weight" : resutlBmi;

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.header}>Your BMI Result</Text>

        <View style={styles.resultContainer}>
          <Text style={styles.value}>{bmi.toFixed(1)}</Text>
          <Text style={[styles.category, { color: resultHash[resutlBmi].color }]}>
            {categoryLabel}
          </Text>

          {/* Range Bar */}
          <View style={styles.rangeBarContainer}>
            <View style={styles.barBackground}>
              <View style={[styles.barSegment, { flex: 2.5, backgroundColor: "#5DB1D1", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }]} />
              <View style={[styles.barSegment, { flex: 6.5, backgroundColor: "#49E37D" }]} />
              <View style={[styles.barSegment, { flex: 5, backgroundColor: "#F9D448" }]} />
              <View style={[styles.barSegment, { flex: 5, backgroundColor: "#F1954D" }]} />
              <View style={[styles.barSegment, { flex: 5, backgroundColor: "#E85B5B", borderTopRightRadius: 10, borderBottomRightRadius: 10 }]} />
            </View>
            
            {/* Pointer */}
            <View style={[styles.pointer, { left: `${getPointerPosition()}%` }]} />
          </View>

          {/* Range Labels */}
          <View style={styles.labelsContainer}>
            <Text style={styles.label}>16</Text>
            <Text style={styles.label}>18.5</Text>
            <Text style={styles.label}>25</Text>
            <Text style={styles.label}>30</Text>
            <Text style={styles.label}>35</Text>
            <Text style={styles.label}>40</Text>
          </View>

          <Text style={styles.description}>{resultHash[resutlBmi].text}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btnStyle}
          onPress={handleRecalculate}
        >
          <Text style={styles.btnTextStyle}>Re-Calculate your BMI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1C1E",
    flex: 1,
    padding: 20,
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  resultContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  value: {
    color: "#A067F9",
    fontSize: 80,
    fontWeight: "bold",
  },
  category: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 40,
  },
  rangeBarContainer: {
    width: "100%",
    height: 12,
    marginVertical: 10,
    position: "relative",
    justifyContent: "center",
  },
  barBackground: {
    flexDirection: "row",
    height: 8,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  barSegment: {
    height: "100%",
  },
  pointer: {
    position: "absolute",
    width: 12,
    height: 24,
    backgroundColor: "white",
    borderRadius: 2,
    marginLeft: -6, // half of width to center it
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 2,
    marginTop: 15,
  },
  label: {
    color: "#8E8E93",
    fontSize: 14,
    fontWeight: "500",
  },
  description: {
    color: "#E5E5EA",
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
    lineHeight: 24,
  },
  btnStyle: {
    backgroundColor: "#D83456",
    borderRadius: 12,
    alignItems: "center",
    padding: 18,
    marginBottom: 20,
  },
  btnTextStyle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
