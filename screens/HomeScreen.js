import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [saldo, setSaldo] = useState(user.saldo);
  const [loading, setLoading] = useState(false);

  const fetchSaldo = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://192.168.1.108:5000/api/saldo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) throw new Error('Error al obtener el saldo.');
      const data = await response.json();
      
      if (data.success) {
        setSaldo(data.user.saldo);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el saldo.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSaldo();
  }, []);

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', onPress: () => navigation.navigate('WelcomeScreen') },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.greeting}>Bienvenido, {user.nombre}</Text>
        <Text style={styles.newPhrase}>Estamos aquí para asistirle.</Text>
        <View style={styles.saldoContainer}>
          <Text style={styles.saldoTitle}>Saldo disponible</Text>
          <Text style={styles.newSlogan}>La mejor experiencia bancaria.</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#4caf50" />
          ) : (
            <Text style={styles.saldoAmount}>${saldo.toFixed(2)}</Text>
          )}
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('TransferScreen', { user: { ...user, saldo } })}
        >
          <Icon name="money" size={20} color="#ffffff" style={styles.icon} />
          <Text style={styles.optionText}>Transferir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('RecibirScreen', { user: { ...user, saldo } })}
        >
          <Icon name="arrow-down" size={20} color="#ffffff" style={styles.icon} />
          <Text style={styles.optionText}>Recibir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('MovimientosScreen', { userId: user.id })}
        >
          <Icon name="history" size={20} color="#ffffff" style={styles.icon} />
          <Text style={styles.optionText}>Movimientos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('ProfileScreen', { user })}
        >
          <Icon name="user" size={20} color="#ffffff" style={styles.icon} />
          <Text style={styles.optionText}>Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <Icon name="cog" size={20} color="#ffffff" style={styles.icon} />
          <Text style={styles.optionText}>Configuración</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="sign-out" size={20} color="#ffffff" style={styles.icon} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E60000', // Banco XYZ red
    textAlign: 'center',
  },
  newPhrase: {
    fontSize: 18,
    color: '#E60000', // Banco XYZ red
    textAlign: 'center',
    marginBottom: 10,
  },
  saldoContainer: {
    backgroundColor: '#F5F5F5', // Light gray background
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  saldoTitle: {
    fontSize: 18,
    color: '#333333', // Dark gray text
  },
  newSlogan: {
    fontSize: 16,
    color: '#333333', // Dark gray text
    textAlign: 'center',
    marginBottom: 10,
  },
  saldoAmount: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#E60000', // Banco XYZ red
    marginTop: 10,
  },
  optionsContainer: {
    marginTop: 40,
  },
  optionButton: {
    backgroundColor: '#E60000', // Banco XYZ red
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
  },
  icon: {
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#333333', // Dark gray background
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  logoutText: {
    color: '#FFFFFF', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;