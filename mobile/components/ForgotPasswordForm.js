import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// this component shows the form to enter email or username for forgot password
const ForgotPasswordForm = ({
  forgotData,
  handleForgotChange,
  handleForgotSubmit,
  errors,
  message,
  changeView,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forgot Password</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email or Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email or username"
          placeholderTextColor="#888"
          value={forgotData.identifier}
          onChangeText={(text) => handleForgotChange("identifier", text)}
        />
        {errors.identifier && (
          <Text style={styles.error}>{errors.identifier}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleForgotSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeView("login")}>
        <Text style={styles.switchText}>Back to Login</Text>
      </TouchableOpacity>
      {message !== "" && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    margin: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
  },
  formGroup: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#ffffff",
    margin: 5,
  },
  input: {
    backgroundColor: "#2a2a2a",
    padding: 15,
    borderRadius: 15,
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  switchText: {
    color: "#4caf50",
    marginTop: 10,
  },
  error: {
    color: "#f44336",
    marginTop: 5,
  },
  message: {
    color: "#ffff00",
    marginTop: 10,
    textAlign: "center",
  },
});

export default ForgotPasswordForm;
