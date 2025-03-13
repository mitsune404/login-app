import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

// this component is for the logged-in user to request an otp for changing password
const ChangePasswordForm = ({
  handleChangePasswordRequest,
  loading,
  changeView,
  message,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Change Password</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleChangePasswordRequest}
      >
        <Text style={styles.buttonText}>Generate OTP</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#4caf50" />}
      <TouchableOpacity onPress={() => changeView("loggedIn")}>
        <Text style={styles.switchText}>Cancel</Text>
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
  },
  heading: {
    fontSize: 22,
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
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
  message: {
    color: "#f44336",
    marginTop: 10,
    textAlign: "center",
  },
});

export default ChangePasswordForm;
