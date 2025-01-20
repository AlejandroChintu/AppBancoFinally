import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// TransferConfirmationScreen component
export default function TransferConfirmationScreen({ route, navigation }) {
  const { recipientName, amount } = route.params;
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <FontAwesome name="check-circle" size={60} color="#4CAF50" style={styles.icon} />
        <Text style={styles.title}>¡Transferencia exitosa!</Text>
        <Text style={styles.message}>
          Has enviado <Text style={styles.highlight}>${amount} MXN</Text> a{" "}
          <Text style={styles.highlight}>{recipientName}</Text>. 🎉
        </Text>
      </View>

      {/* Button to navigate to HomeScreen */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('HomeScreen', { user: user })}
      >
        <FontAwesome name="home" size={25} color="#fff" style={styles.iconButton} />
        <Text style={styles.buttonText}>Ir a inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the TransferConfirmationScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF", // White background
  },
  card: {
    backgroundColor: "#F5F5F5", // Light gray background
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    marginBottom: 50,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, 
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26, 
    fontWeight: "bold",
    color: "#E60000", // Banorte red
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: "#333333", // Dark gray text
    textAlign: "center",
    lineHeight: 25,
  },
  highlight: {
    fontWeight: "bold",
    color: "#E60000", // Banorte red
  },
  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E60000", // Banorte red
    paddingVertical: 15, 
    paddingHorizontal: 25,
    borderRadius: 50, 
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20, 
    color: "#FFFFFF", // White text
    fontWeight: "600",
    marginLeft: 10, 
  },
  iconButton: {
    marginRight: 10, 
  },
});