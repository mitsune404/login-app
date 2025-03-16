import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import config from "../config";

// this component shows the form to update the password after OTP verification
const UpdatePasswordForm = ({
  updatePasswordData,
  handleUpdatePasswordChange,
  handleUpdatePasswordSubmit,
  errors,
  message,
  changeView,
  showPasswordTooltip,
  setShowPasswordTooltip,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Your Password</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          placeholderTextColor="#888"
          secureTextEntry
          value={updatePasswordData.newPassword}
          onChangeText={(text) =>
            handleUpdatePasswordChange("newPassword", text)
          }
          onFocus={() => setShowPasswordTooltip(true)}
          onBlur={() => setShowPasswordTooltip(false)}
        />
        {showPasswordTooltip && (
          <Text style={styles.tooltip}>{config.labels.passwordTooltip}</Text>
        )}
        {errors.newPassword && (
          <Text style={styles.error}>{errors.newPassword}</Text>
        )}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          placeholderTextColor="#888"
          secureTextEntry
          value={updatePasswordData.confirmPassword}
          onChangeText={(text) =>
            handleUpdatePasswordChange("confirmPassword", text)
          }
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdatePasswordSubmit}
      >
        <Text style={styles.buttonText}>Update Password</Text>
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
  },
  heading: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
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
  tooltip: {
    backgroundColor: "#424242",
    color: "#ffffff",
    padding: 5,
    borderRadius: 4,
    marginTop: 5,
    fontSize: 12,
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

export default UpdatePasswordForm;
