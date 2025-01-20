import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// RegisterScreen component
const RegisterScreen = ({ navigation }) => {
  const [nombre, setFirstName] = useState('');
  const [apellido_p, setLastName] = useState('');
  const [apellido_m, setMiddleName] = useState('');
  const [correo, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle register
  const handleRegister = () => {
    if (!nombre || !apellido_p || !apellido_m || !correo || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    // Registro en el backend
    fetch('http://172.17.182.104:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        apellido_p,
        apellido_m,
        correo,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.user) {
          Alert.alert('Registro exitoso', `¡Bienvenido/a, ${nombre}!`);
          navigation.navigate('HomeScreen', { user: data.user });
        } else {
          Alert.alert('Error', data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema con el registro');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Crea una nueva cuenta.</Text>

      {/* Input fields for registration */}
      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#AAAAAA"
        style={styles.input}
        value={nombre}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Apellido paterno"
        placeholderTextColor="#AAAAAA"
        style={styles.input}
        value={apellido_p}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder="Apellido materno"
        placeholderTextColor="#AAAAAA"
        style={styles.input}
        value={apellido_m}
        onChangeText={setMiddleName}
      />
      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#AAAAAA"
        style={styles.input}
        keyboardType="email-address"
        value={correo}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#AAAAAA"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Button to handle registration */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      {/* Link to navigate to LoginScreen */}
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.link}>¿Ya estás registrado? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the RegisterScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', // White background
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#E60000', // Banorte red
  },
  input: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E60000', // Banorte red
    color: '#333333', // Dark gray text
    marginBottom: 20,
  },
  button: {
    height: 50,
    backgroundColor: '#E60000', // Banorte red
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#E60000', // Banorte red
  },
});

export default RegisterScreen;