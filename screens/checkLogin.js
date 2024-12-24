import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImg = require('../assets/background.png');
const logoImg = require('../assets/logo.png');

const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert(
        'Validation Error',
        'Please enter both username and password.',
      );
      return;
    }
    await AsyncStorage.setItem('isLoggedIn', 'true');
    navigation.navigate('Welcome'); // Navigate to Dashboard on successful login
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1B1824" />
      <ImageBackground source={backgroundImg} style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.title}>
            Hello, <Text style={styles.highlight}>Good Morning</Text>
          </Text>
          <Text style={styles.title}>
            Welcome Back<Text style={styles.highlight}>!</Text>
          </Text>
        </View>
      </ImageBackground>
      <Image source={logoImg} style={styles.logo} />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          User Name <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            style={styles.textInput}
            accessible
            accessibilityLabel="Username Input"
          />
          <EvilIcon name="user" size={30} color="#000" style={styles.icon} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Password <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
            style={styles.textInput}
            accessible
            accessibilityLabel="Password Input"
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons
              name={hidePassword ? 'eye-off' : 'eye'}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={handleLogin}
        accessible
        accessibilityLabel="Submit Button">
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  image: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    backgroundColor: '#1B1824',
  },
  overlay: {
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  highlight: {
    color: '#F2D56A',
  },
  logo: {
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  required: {
    color: 'red',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCDFE5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginLeft: 5,
  },
  submitBtn: {
    backgroundColor: '#1B1824',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});