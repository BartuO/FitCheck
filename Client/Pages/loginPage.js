import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import RegisterPage from './registerPage';

const LoginPage = ({ loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    if (email.trim() !== '' && password.trim() !== '') {
      try {
          fetch(process.env.EXPO_PUBLIC_SERVER_IP+"/loginUser", {
              method: 'POST',
              headers: { 'Content-Type' : 'application/json'}, 
              body: JSON.stringify({
                "email": email,
                "password": password,
                }
              )
            }
          )
          .then(response => response.json())
          .then(res => {
            console.log(res);
            if (!res.success) {
               // Display an error message or take appropriate action
              alert('incorrect email or password');
            }
            else {
              loginUser(res.userID);
            }
          }
          
          )
      } catch (e) {console.log(e)}



    } else {
      // Handle validation or display an error message
      // For simplicity, just showing the modal for now
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.registerText}>Don't have an account? Register here</Text>
      </TouchableOpacity>

      {/* Modal for registration */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <RegisterPage onCloseModal={handleCloseModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 30,
    marginVertical: 10,
    borderWidth: 1,
    padding: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  registerText: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
