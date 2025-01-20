import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const ProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [nombre, setNombre] = useState(user.nombre);
  const [correo, setCorreo] = useState(user.correo);

  const handleSave = () => {
    // Lógica para guardar los cambios en el perfil
    Alert.alert('Perfil actualizado', 'Sus cambios han sido guardados.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
      />
      <TextInput
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        placeholder="Correo electrónico"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>

      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>Acerca de</Text>
        <Text style={styles.aboutText}>
          Banco XYZ es una institución financiera comprometida con ofrecer la mejor experiencia bancaria a nuestros clientes. Nuestro objetivo es proporcionar servicios financieros innovadores y seguros para ayudarle a alcanzar sus metas financieras.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF', // White background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E60000', // Banco XYZ red
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E60000', // Banco XYZ red
    color: '#333333', // Dark gray text
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E60000', // Banco XYZ red
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
  },
  aboutContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#F5F5F5', // Light gray background
    borderRadius: 10,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E60000', // Banco XYZ red
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: '#333333', // Dark gray text
    lineHeight: 22,
  },
});

export default ProfileScreen;
