import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  StyleProp,
  ViewStyle,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { ScreenName } from "../types/ScreenName";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function _layout() {
  const insets = useSafeAreaInsets();

  let safeAreaStyle: StyleProp<ViewStyle> = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
  };

  return (
    <SafeAreaView style={[styles.container, safeAreaStyle]}>
      <StatusBar
        animated={true}
        barStyle="light-content"
        backgroundColor="#080A1C"
        hidden={false}
      />
      <Stack
        initialRouteName={ScreenName.INDEX}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={ScreenName.INDEX} />
        <Stack.Screen name={ScreenName.RESULT} />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#080A1C",
    justifyContent: "center",
    flex: 1,
  },
});
