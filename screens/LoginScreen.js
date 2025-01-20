import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!correo || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.108:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (data.success) {
        navigation.navigate('HomeScreen', { user: data.user });
      } else {
        Alert.alert('Error', data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#AAAAAA" style={styles.icon} />
        <TextInput 
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#AAAAAA"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#AAAAAA" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#AAAAAA"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        <Text style={styles.linkText}>
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E60000', // Banorte red
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E60000', // Banorte red
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333333', // Dark gray text
    fontSize: 16,
  },
  icon: {
    marginRight: 10, 
  },
  button: {
    backgroundColor: '#E60000', // Banorte red
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
  },
  linkText: {
    color: '#E60000', // Banorte red
    marginTop: 10,
  },
});

export default LoginScreen;