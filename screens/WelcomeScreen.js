import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// WelcomeScreen component
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>¡Bienvenido!</Text>
      {/* Inspirational Phrase */}
      <Text style={styles.inspirationalPhrase}>El futuro de tus finanzas comienza aquí.</Text>

      {/* Button to navigate to LoginScreen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Button to navigate to RegisterScreen */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the WelcomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E60000', // Banorte red
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inspirationalPhrase: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#E60000', // Banorte red
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;