import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

// this component asks the security questions for forgot password flow
const ForgotSecurityForm = ({
  forgotSecurityData,
  handleForgotSecurityChange,
  handleForgotSecuritySubmit,
  errors,
  message,
  changeView,
  loading,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Security Questions</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>What is your first pet's name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Answer"
          placeholderTextColor="#888"
          value={forgotSecurityData.answer1}
          onChangeText={(text) => handleForgotSecurityChange("answer1", text)}
        />
        {errors.answer1 && <Text style={styles.error}>{errors.answer1}</Text>}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>What is your first city's name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Answer"
          placeholderTextColor="#888"
          value={forgotSecurityData.answer2}
          onChangeText={(text) => handleForgotSecurityChange("answer2", text)}
        />
        {errors.answer2 && <Text style={styles.error}>{errors.answer2}</Text>}
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>What is your first school's name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Answer"
          placeholderTextColor="#888"
          value={forgotSecurityData.answer3}
          onChangeText={(text) => handleForgotSecurityChange("answer3", text)}
        />
        {errors.answer3 && <Text style={styles.error}>{errors.answer3}</Text>}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleForgotSecuritySubmit}
      >
        <Text style={styles.buttonText}>Verify Answers</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#4caf50" />}
      <TouchableOpacity onPress={() => changeView("forgot")}>
        <Text style={styles.switchText}>Back</Text>
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

export default ForgotSecurityForm;
