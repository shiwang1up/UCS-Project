import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  Switch,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useTheme} from '../context/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {CommonActions} from '@react-navigation/native';
import {SettingsContext} from '../context/SettingsProvider';
const Settings = ({navigation, route}) => {
  const {theme, toggleTheme} = useTheme();
  // const [language, setLanguage] = useState('English');
  // const [isPortrait, setIsPortrait] = useState(true);
  // const [brightness, setBrightness] = useState(50);
  // const [mediaQuality, setMediaQuality] = useState(50);
  // const [deviceIdentifier, setDeviceIdentifier] = useState('');
  // const [logSaveLocation, setLogSaveLocation] = useState('');
  // const [isInternetConnected, setIsInternetConnected] = useState(false);
  // const [isGPSConnected, setIsGPSConnected] = useState(false);
  const {
    language,
    setLanguage,
    isInternetConnected,
    setIsInternetConnected,
    isGPSConnected,
    setIsGPSConnected,
    mediaQuality,
    setMediaQuality,
    logSaveLocation,
    setLogSaveLocation,
    deviceIdentifier,
    setDeviceIdentifier,
  } = useContext(SettingsContext); // Destructure context values

  const isDarkTheme = theme.buttonText === 'black';
  // const images = [
  //   'https://wallpaperaccess.com/full/189167.jpg',
  //   'https://www.pixelstalk.net/wp-content/uploads/images1/City-Merlion-Park-Singapore-Wallpaper-1920x1080.jpg',
  //   'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  // ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const saveSettings = async () => {
    try {
      // Save settings to AsyncStorage
      const settings = {
        language,
        isInternetConnected,
        isGPSConnected,
        mediaQuality,
        logSaveLocation,
        deviceIdentifier,
      };
      await AsyncStorage.setItem('settings', JSON.stringify(settings));
      console.log('Settings saved:', settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };
  return (
    // <ImageBackground
    //   source={{uri: images[currentImageIndex]}}
    //   style={styles.background}>
    <View style={[styles.container]}>
      <View style={styles.overlay}>
        <View style={[styles.topButtonsContainer, {backgroundColor: 'white'}]}>
          <TouchableOpacity
            style={styles.topButtonBack}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={35} color={'#00b4d8'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.topButtonForward}
            onPress={async () => {
              await saveSettings(); // Call the saveSettings function
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Welcome'}], // Navigate to Welcome screen
                }),
              );
            }}>
            <Icon name="checkmark" size={35} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={[styles.brandText, {color: '#00b4d8'}]}>Settings</Text>
        </View>

        {/* Main Content */}
        <ScrollView
          contentContainerStyle={styles.mainContainer} // Use contentContainerStyle for layout properties
          style={{flexGrow: 1}}>
          <View style={styles.content}>
            <View
              style={[
                styles.settingsWrapper,
                {backgroundColor: 'white', borderColor: theme.border},
              ]}>
              <View style={styles.settingsOptions}>
                <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                  Language
                </Text>
                <Picker
                  selectedValue={language}
                  style={styles.picker}
                  onValueChange={itemValue => setLanguage(itemValue)}>
                  <Picker.Item label="English" value="English" />
                  <Picker.Item label="Spanish" value="Spanish" />
                  <Picker.Item label="French" value="French" />
                  {/* Add more languages as needed */}
                </Picker>
              </View>

              {/* <View style={styles.settingsOptions}>
                  <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                    Orientation
                  </Text>
                  <View style={styles.switchContainer}>
                    <Text
                      style={[styles.buttonText, {color: theme.buttonText}]}>
                      Portrait
                    </Text>
                    <Switch value={isPortrait} onValueChange={setIsPortrait} />
                  </View>
                </View> */}

              <View style={styles.settingsOptions}>
                <View style={styles.switchContainer}>
                  <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                    Internet Connectivity
                  </Text>
                  <Switch
                    value={isInternetConnected}
                    onValueChange={setIsInternetConnected}
                  />
                </View>
              </View>

              <View style={styles.settingsOptions}>
                <View style={styles.switchContainer}>
                  <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                    GPS Connectivity
                  </Text>
                  <Switch
                    value={isGPSConnected}
                    onValueChange={setIsGPSConnected}
                  />
                </View>
              </View>
              {/* 
                <View style={styles.settingsOptions}>
                  <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                    Brightness
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={10}
                    maximumValue={100}
                    step={10}
                    value={brightness}
                    onValueChange={value => setBrightness(Math.round(value))}
                    onSlidingComplete={value =>
                      setBrightness(Math.round(value))
                    }
                  />
                  <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                    Value: {brightness}
                  </Text>
                </View> */}
              <View style={styles.settingsOptions}>
                <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                  Media Quality
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={10} // Set minimum value to 10
                  maximumValue={100} // Set maximum value to 100
                  step={10} // Step value to allow increments of 10
                  value={mediaQuality} // Current media quality value
                  onValueChange={value => setMediaQuality(value)} // Update state on change
                />
                <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                  Value: {mediaQuality}
                </Text>
              </View>
              <View style={styles.settingsOptions}>
                <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                  Log Save Location
                </Text>
                <TextInput
                  style={[styles.input, {backgroundColor: 'white'}]}
                  value={logSaveLocation}
                  onChangeText={setLogSaveLocation} // Update state on text change
                  placeholder="Enter Log Save Location"
                />
                <View
                  style={{
                    justifyContent: 'space-around',
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <View
                    style={[
                      styles.syncButton,
                      {
                        backgroundColor: 'transparent',
                      },
                    ]}></View>
                  <TouchableOpacity
                    style={[
                      styles.syncButton,
                      {
                        backgroundColor: theme.button,
                        borderWidth: 1,
                        borderColor: theme.border,
                      },
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      },
                    ]}
                    onPress={() => console.log('Syncing...')}>
                    <Text style={[styles.buttonText, {color: theme.text}]}>
                      Save Logs
                    </Text>
                    <Icon2
                      name="code-json"
                      size={22}
                      style={{color: theme.text}}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.settingsOptions}>
                <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                  Device Identifier
                </Text>
                <TextInput
                  style={[styles.input, {backgroundColor: 'rgba(0,0,0,0.1)'}]}
                  value={'675-237-478'}
                  on
                  ChangeText={setDeviceIdentifier}
                  placeholder="Enter Device Identifier"
                  keyboardType="numeric"
                  editable={false}
                />
              </View>
              <View style={styles.settingsOptions}>
                <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                  Other Pages
                </Text>
                <View
                  style={{
                    justifyContent: 'space-around',
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    // marginTop: 10,
                    marginVertical: 20,
                  }}>
                  <TouchableOpacity
                    style={[
                      styles.syncButton,
                      {
                        backgroundColor: theme.button,
                        borderWidth: 1,
                        borderColor: theme.border,
                      },
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      },
                    ]}
                    onPress={() => navigation.navigate('DbView')}>
                    <Text style={[styles.buttonText, {color: theme.text}]}>
                      Offline Records
                    </Text>
                    <Icon
                      name="newspaper-outline"
                      size={22}
                      style={{color: theme.text}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.syncButton,
                      {
                        backgroundColor: theme.button,
                        borderWidth: 1,
                        borderColor: theme.border,
                      },
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      },
                    ]}
                    onPress={() => navigation.navigate('LogsPage')}>
                    <Text style={[styles.buttonText, {color: theme.text}]}>
                      Logs Page
                    </Text>
                    <Icon3
                      name="code-json"
                      size={22}
                      style={{color: theme.text}}
                    />
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={[
                      styles.syncButton,
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: theme.border,
                      },
                    ]}
                    onPress={() => saveSettings}>
                    <Text style={[styles.buttonText, {color: 'white'}]}>
                      Save
                    </Text>
                    <Icon name="checkmark" size={22} style={{color: 'white'}} />
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  topButtonsContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    padding: 20,
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // padding:20,
    backgroundColor: '#f0f4f7',
  },
  content: {
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    // borderWidth: 1,
  },
  brandText: {
    fontSize: 56,
    fontWeight: '500',
  },
  header: {
    alignItems: 'flex-start',
    padding: 20,
    zIndex: 5,
  },
  mainContainer: {
    flex: 1,
    width: '100%',
    height: 'auto',
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  topButtonForward: {
    backgroundColor: '#00b4d8',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#00b4d8',
  },
  topButtonBack: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00b4d8',
  },
  settingsWrapper: {
    width: '60%',
    // height: '97%',
    paddingTop: 10,
    margin: 10,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
  },
  settingsOptions: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  picker: {
    height: 55,
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width:'100%',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  syncButton: {
    padding: 10,
    // marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '21%',
    backgroundColor: '#00b4d8',
  },
});

export default Settings;
