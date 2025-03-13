import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// this component renders the login form
const LoginForm = ({
  loginData,
  handleLoginChange,
  handleLoginSubmit,
  recaptchaRef,
  onCaptchaChange,
  errors,
  message,
  changeView,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email or Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email or username"
          placeholderTextColor="#888"
          value={loginData.identifier}
          onChangeText={(text) => handleLoginChange("identifier", text)}
        />
        {errors.identifier && (
          <Text style={styles.error}>{errors.identifier}</Text>
        )}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry
          value={loginData.password}
          onChangeText={(text) => handleLoginChange("password", text)}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>
      {/* recaptcha is bypassed in react native so we skip its rendering */}
      <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeView("register")}>
        <Text style={styles.switchText}>
          Don't have an account? Register here
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeView("forgot")}>
        <Text style={styles.switchText}>Forgot Password?</Text>
      </TouchableOpacity>
      {message !== "" && <Text style={styles.message}>{message}</Text>}
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
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#2a2a2a",
    padding: 15,
    borderRadius: 4,
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  switchText: {
    color: "#4caf50",
    marginTop: 10,
    textAlign: "center",
  },
  error: {
    color: "#f44336",
    marginTop: 5,
  },
  message: {
    color: "#ffffff",
    marginTop: 10,
    textAlign: "center",
  },
});

export default LoginForm;
