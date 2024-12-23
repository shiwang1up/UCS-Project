import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import {useTheme} from '../context/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';

const Settings = ({navigation, route}) => {
  const {theme, toggleTheme} = useTheme();
  const {isCheckoutMode} = route.params || {};
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
      {/* Overlay with Transparency */}
      <View style={styles.container}>
        <View style={styles.overlay}>
          <View
            style={[
              styles.topButtonsContainer,
              {backgroundColor: theme.background},
            ]}>
            <TouchableOpacity
              style={[styles.topButtonBack]}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={35} color={'#00b4d8'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topButtonForward}
              onPress={toggleTheme}>
              <Icon
                name={isDarkTheme ? 'moon-outline' : 'sunny-outline'} // Change this line
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
          {/* Header */}

          {/* Main Content */}
          <View style={styles.mainContainer}>
            <View style={styles.content}>
              <View
                style={[
                  styles.settingsWrapper,
                  {backgroundColor: theme.button},
                  {borderColor: theme.border},
                ]}>
                <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                  Setting Options
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
  topButtonBack: {
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00b4d8',
  },
  topButtonForward: {
    backgroundColor: '#00b4d8',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#00b4d8',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // padding:20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Semi-transparent overlay
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  header: {
    alignItems: 'flex-start',
    padding: 20,
    zIndex: 5,
  },
  brandText: {
    fontSize: 56,
    fontWeight: 'bold',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  content: {
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
  },
  settingsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: '90%',
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
  },
  icon: {
    flex: 5,
    width: 120,
    height: 120,
  },
  buttonText: {
    flex: 1,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },
  footerText: {
    fontSize: 14,
    color: '#FFF',
  },
  themeToggleButton: {
    position: 'absolute',
    right: 20,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    marginBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  iconText: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default Settings;
