import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import LoginRegister from "./components/LoginRegister";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LoginRegister />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});

export default App;
