import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  TextInput,
  Switch,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useTheme} from '../context/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
const Settings = ({navigation, route}) => {
  const {theme, toggleTheme} = useTheme();
  const [language, setLanguage] = useState('English');
  const [isPortrait, setIsPortrait] = useState(true);
  const [brightness, setBrightness] = useState(50);
  const [mediaQuality, setMediaQuality] = useState(50);
  const [deviceIdentifier, setDeviceIdentifier] = useState('');
  const [logSaveLocation, setLogSaveLocation] = useState('');

  const isDarkTheme = theme.buttonText === 'black';
  const images = [
    'https://wallpaperaccess.com/full/189167.jpg',
    'https://www.pixelstalk.net/wp-content/uploads/images1/City-Merlion-Park-Singapore-Wallpaper-1920x1080.jpg',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <ImageBackground
      source={{uri: images[currentImageIndex]}}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.overlay}>
          <View
            style={[
              styles.topButtonsContainer,
              {backgroundColor: theme.background},
            ]}>
            <TouchableOpacity
              style={styles.topButtonBack}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={35} color={'#00b4d8'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topButtonForward}
              onPress={toggleTheme}>
              <Icon
                name={isDarkTheme ? 'moon-outline' : 'sunny-outline'}
                size={35}
                color={theme.icon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={[styles.brandText, {color: theme.text}]}>
              Settings
            </Text>
          </View>

          {/* Main Content */}
          <View style={styles.mainContainer}>
            <View style={styles.content}>
              <View
                style={[
                  styles.settingsWrapper,
                  {backgroundColor: theme.button, borderColor: theme.border},
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

                <View style={styles.settingsOptions}>
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
                </View>

                <View style={styles.settingsOptions}>
                  <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                    Brightness
                  </Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={10} // Set minimum value to 1
                    maximumValue={100} // Set maximum value to 100
                    step={10} // Step value to allow increments of 10
                    value={brightness}
                    onValueChange={value => setBrightness(Math.round(value))} // Update state on change
                    onSlidingComplete={value =>
                      setBrightness(Math.round(value))
                    } // Final value on slide complete
                  />
                  <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                    Value: {brightness}
                  </Text>
                </View>
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
                        Generate Logs
                      </Text>
                      <Icon2 name="code-json" size={22} style={{color: theme.text}} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.settingsOptions}>
                  <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                    Device Identifier
                  </Text>
                  <TextInput
                    style={[styles.input, {backgroundColor: 'white'}]}
                    value={deviceIdentifier}
                    on
                    ChangeText={setDeviceIdentifier}
                    placeholder="Enter Device Identifier"
                    keyboardType="numeric"
                  />
                  <View
                    style={{
                      justifyContent: 'space-around',
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      marginTop: 10,
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
                      onPress={() => console.log('Syncing...')}>
                      <Text style={[styles.buttonText, {color: theme.text}]}>
                        Sync Now
                      </Text>
                      <Icon name="sync" size={22} style={{color: theme.text}} />
                    </TouchableOpacity>
                    <TouchableOpacity
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
                      onPress={() => console.log('Syncing...')}>
                      <Text style={[styles.buttonText, {color: 'white'}]}>
                        Save
                      </Text>
                      <Icon
                        name="checkmark"
                        size={22}
                        style={{color: 'white'}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
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
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Semi-transparent overlay
  },
  content: {
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 56,
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'flex-start',
    padding: 20,
    zIndex: 5,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  // Define your styles here
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
  },
  syncButton: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '21%',
    backgroundColor: '#00b4d8',
  },
  // Add other styles as needed
});

export default Settings;
