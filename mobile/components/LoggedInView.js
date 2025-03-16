import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// this component displays the logged-in user's details along with options to change password or logout
const LoggedInView = ({ user, changeView, handleLogout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome, {user.username || user.email}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.subheading}>User Details</Text>
        <Text style={styles.detail}>EMAIL: {user.email}</Text>
        <Text style={styles.detail}>USERNAME: {user.username}</Text>
        <Text style={styles.detail}>
          COMPANY NAME: {user.companyName || "N/A"}
        </Text>
        <Text style={styles.detail}>WEBSITE: {user.website || "N/A"}</Text>
        <Text style={styles.detail}>AGE: {user.age || "N/A"}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeView("changePassword")}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
    fontSize: 28,
    color: "#ffffff",
    marginBottom: 20,
  },
  detailsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  detail: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
    margin: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default LoggedInView;
