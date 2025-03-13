import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import config from "../config";

// this component renders the registration form
const RegisterForm = ({
  registerData,
  handleRegisterChange,
  handleRegisterSubmit,
  errors,
  message,
  changeView,
  showPasswordTooltip,
  setShowPasswordTooltip,
  showUsernameTooltip,
  setShowUsernameTooltip,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Register</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>{config.labels.emailLabel}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          value={registerData.email}
          onChangeText={(text) => handleRegisterChange("email", text)}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#888"
          value={registerData.username}
          onChangeText={(text) => handleRegisterChange("username", text)}
          onFocus={() => setShowUsernameTooltip(true)}
          onBlur={() => setShowUsernameTooltip(false)}
        />
        {showUsernameTooltip && (
          <Text style={styles.tooltip}>{config.labels.usernameTooltip}</Text>
        )}
        {errors.username && <Text style={styles.error}>{errors.username}</Text>}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>{config.labels.passwordLabel}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry
          value={registerData.password}
          onChangeText={(text) => handleRegisterChange("password", text)}
          onFocus={() => setShowPasswordTooltip(true)}
          onBlur={() => setShowPasswordTooltip(false)}
        />
        {showPasswordTooltip && (
          <Text style={styles.tooltip}>{config.labels.passwordTooltip}</Text>
        )}
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#888"
          secureTextEntry
          value={registerData.confirmPassword}
          onChangeText={(text) => handleRegisterChange("confirmPassword", text)}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Company Name (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your company name"
          placeholderTextColor="#888"
          value={registerData.companyName}
          onChangeText={(text) => handleRegisterChange("companyName", text)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Website (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your website"
          placeholderTextColor="#888"
          value={registerData.website}
          onChangeText={(text) => handleRegisterChange("website", text)}
        />
        {errors.website && <Text style={styles.error}>{errors.website}</Text>}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Age (in years)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={registerData.age}
          onChangeText={(text) => handleRegisterChange("age", text)}
        />
        {errors.age && <Text style={styles.error}>{errors.age}</Text>}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Security Question 1: What is your first pet's name?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Answer"
          placeholderTextColor="#888"
          value={registerData.securityAnswer1}
          onChangeText={(text) => handleRegisterChange("securityAnswer1", text)}
        />
        {errors.securityAnswer1 && (
          <Text style={styles.error}>{errors.securityAnswer1}</Text>
        )}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Security Question 2: What is your first city's name?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Answer"
          placeholderTextColor="#888"
          value={registerData.securityAnswer2}
          onChangeText={(text) => handleRegisterChange("securityAnswer2", text)}
        />
        {errors.securityAnswer2 && (
          <Text style={styles.error}>{errors.securityAnswer2}</Text>
        )}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>
          Security Question 3: What is your first school's name?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Answer"
          placeholderTextColor="#888"
          value={registerData.securityAnswer3}
          onChangeText={(text) => handleRegisterChange("securityAnswer3", text)}
        />
        {errors.securityAnswer3 && (
          <Text style={styles.error}>{errors.securityAnswer3}</Text>
        )}
      </View>
      {/* recaptcha is bypassed in react native */}
      <TouchableOpacity style={styles.button} onPress={handleRegisterSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => changeView("login")}>
        <Text style={styles.switchText}>
          Already have an account? Login here
        </Text>
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
    fontSize: 24,
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
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#2a2a2a",
    padding: 15,
    borderRadius: 4,
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
    textAlign: "center",
    marginTop: 10,
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

export default RegisterForm;
