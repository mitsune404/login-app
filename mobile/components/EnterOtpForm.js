import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

// this component lets the user enter the OTP received via email
const EnterOtpForm = ({
  otpData,
  handleOtpChange,
  handleOtpSubmit,
  errors,
  message,
  loading,
  changeView,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>OTP Verification</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Enter OTP</Text>
        <TextInput
          style={styles.input}
          placeholder="6 Digit OTP"
          placeholderTextColor="#888"
          value={otpData.otp}
          onChangeText={(text) => handleOtpChange("otp", text)}
          keyboardType="numeric"
        />
        {errors.otp && <Text style={styles.error}>{errors.otp}</Text>}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleOtpSubmit}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#4caf50" />}
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
    borderRadius: 30,
    margin: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
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
    width: "60%",
    marginTop: 20,
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

export default EnterOtpForm;
