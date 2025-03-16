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
  // recaptchaRef,
  // onCaptchaChange,
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
      {/* recaptcha is bypassed in mobile app */}
      {message !== "" && <Text style={styles.message}>{message}</Text>}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    margin: 20,
  },
  heading: {
    fontSize: 28,
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    color: "#ffffff",
    fontSize: 16,
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
    marginTop: 20,
    marginHorizontal: 40,
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
    color: "#ffff00",
    marginTop: 10,
    textAlign: "center",
  },
});

export default LoginForm;
