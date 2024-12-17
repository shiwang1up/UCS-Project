import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeProvider';
import {TextInput} from 'react-native-gesture-handler';

const IdPass = ({navigation}) => {
  const {theme} = useTheme();
  const [id, setId] = useState(''); // State for ID input
  const [password, setPassword] = useState(''); // State for password input

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
        keyboardVerticalOffset={100} // Adjust this value based on your header height
      >
        <View style={styles.container}>
          {/* Top Buttons */}
          <View style={styles.topButtonsContainer}>
            <TouchableOpacity
              style={styles.topButtonBack}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={35} color={'#00b4d8'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topButtonForward}>
              <Icon name="arrow-forward" size={35} color={'white'} />
            </TouchableOpacity>
          </View>

          {/* Input Fields for ID and Password */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter ID"
              value={id}
              onChangeText={setId}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry // This will hide the password input
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  topButtonsContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  topButtonForward: {
    backgroundColor: '#00b4d8',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00b4d8',
  },
  topButtonBack: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00b4d8',
  },
  inputContainer: {
    marginTop: 100, // Adjust as needed
    width: '80%', // Adjust width as needed
  },
  input: {
    height: 50,
    borderColor: '#00b4d8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default IdPass;