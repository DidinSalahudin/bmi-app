import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import GenderButtonSelect from "../components/GenderButtonSelect";
import SliderSelect from "../components/SliderSelect";
import CounterSelect from "../components/CounterSelect";

// type
interface FormState {
  gender?: "male" | "female";
  height?: number;
  weight?: number;
  age?: number;
}

const index = () => {
  const [formState, setFormState] = React.useState<FormState>({ weight: 60 });

  // Helpers
  const isButtonDisabled = () => {
    return !(
      formState.gender &&
      formState.age &&
      formState.height &&
      formState.weight
    );
  };

  // Handlers
  const handleChange = (key: keyof FormState, value: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handlePress = (value: "male" | "female") => {
    setFormState((prevState) => ({
      ...prevState,
      gender: prevState.gender === value ? undefined : value,
    }));
  };

  const calculateBmi = () => {
    let { weight, height } = formState;

    if (weight && height) {
      let heightMeters = height / 100;
      const bmiResult = (weight / (heightMeters * heightMeters)).toFixed(2);
      router.push({
        pathname: "result",
        params: { bmi: Number.parseInt(bmiResult) },
      });
    }
  };

  return (
    <View style={styles.inner}>
      {/** Gender Button Group */}
      <View style={{ gap: 10, flexDirection: "row" }}>
        <GenderButtonSelect
          onPress={() => handlePress("male")}
          selected={formState.gender === "male"}
        />
        <GenderButtonSelect
          gender="female"
          onPress={() => handlePress("female")}
          selected={formState.gender === "female"}
        />
      </View>

      {/** Height Slider */}
      <View style={{ marginVertical: "5%", flex: 1 }}>
        <SliderSelect
          onValueChange={(value) => handleChange("height", value)}
        />
      </View>

      {/** Weight and Age Counters */}
      <View style={{ gap: 10, flexDirection: "row" }}>
        <CounterSelect
          label="weight"
          suffix="kg"
          defaultValue={60}
          onValueChange={(value) => handleChange("weight", value)}
        />
        <CounterSelect
          label="age"
          onValueChange={(value) => handleChange("age", value)}
        />
      </View>

      {/** Button */}
      <View style={{ marginTop: "10%" }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            ...styles.btnStyle,
            backgroundColor: isButtonDisabled() ? "#D3D3D3" : "#D83456",
          }}
          disabled={isButtonDisabled()}
          onPress={calculateBmi}
        >
          <Text style={styles.btnTextStyle}>Calculate your BMI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

  btn: {},
  btnStyle: {
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
});

export default index;
