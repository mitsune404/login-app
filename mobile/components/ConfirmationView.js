import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// this component shows a confirmation message when otp is sent
const ConfirmationView = ({ message, changeView }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Password reset link sent</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeView("login")}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    margin: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    color: "#ffffff",
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default ConfirmationView;
