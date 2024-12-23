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

const image = require('../assets/background.png');

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
    navigation.navigate('Welcome');
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1B1824" />
      <ImageBackground source={image} resizeMode="stretch" style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.title}>
            Hello, <Text style={{color: '#F2D56A', }}>Good Morning</Text>
          </Text>
          <Text style={styles.title}>
            Welcome Back<Text style={{color: '#F2D56A', }}>!</Text>
          </Text>
        </View>
      </ImageBackground>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.inputWrapper}>
        <Text style={{paddingHorizontal: 10}}>
          User Name<Text style={{color: 'red'}}>*</Text>
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
      <View style={styles.inputWrapper}>
        <Text style={{paddingHorizontal: 10}}>
          Password<Text style={{color: 'red'}}>*</Text>
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
      <TouchableOpacity style={styles.submitbtn} onPress={handleLogin}>
        <Text style={{color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: 250,
    backgroundColor: '#1B1824',
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  logo: {
    height: 190,
    width: 380,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
    // borderWidth:1,
  },
  inputWrapper: {
    width: '75%',
    alignSelf: 'center',
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#DCDFE5',
    margin: 20,
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  submitbtn: {
    backgroundColor: '#1B1824',
    borderRadius: 10,
    width: '30%',
    padding: 20,
    alignSelf: 'center',
  },
});
