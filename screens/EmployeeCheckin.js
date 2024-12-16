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

const EmployeeCheckin = ({navigation}) => {
  const {theme, toggleTheme} = useTheme();
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.brandText, {color: theme.text}]}>UCS</Text>
          </View>
          <TouchableOpacity
            style={styles.themeToggleButton}
            onPress={toggleTheme}>
            <Icon
              name={isDarkTheme ? 'moon-outline' : 'sunny-outline'} // Change this line
              size={30}
              color={theme.icon}
            />
          </TouchableOpacity>

          {/* Main Content */}
          <View style={styles.mainContainer}>
            <View style={styles.row}>
              {/* ID / Pass */}
              <TouchableOpacity
                style={[
                  styles.button,
                  {backgroundColor: theme.button},
                  {borderColor: theme.border},
                ]}>
                <View style={styles.row1}>
                  <Image
                    source={require('../assets/pass.png')} // ID icon
                    style={styles.icon}
                    resizeMode="contain"
                  />
                  <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                    ID / Pass
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Fingerprint */}
              <TouchableOpacity
                style={[
                  styles.button,
                  {backgroundColor: theme.button},
                  {borderColor: theme.border},
                ]}>
                <Image
                  source={require('../assets/fingerprint.webp')} // Fingerprint icon
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                  Fingerprint
                </Text>
              </TouchableOpacity>

              {/* Face Recognition */}
              <TouchableOpacity
                style={[
                  styles.button,
                  {backgroundColor: theme.button},
                  {borderColor: theme.border},
                ]}
                onPress={() => navigation.navigate('FaceRecog')}>
                <Image
                  source={require('../assets/face_recognition.webp')} // Face Recognition icon
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                  Face Recognition
                </Text>
              </TouchableOpacity>
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
    // borderWidth:2,
  },
  brandText: {
    fontSize: 56,
    fontWeight: 'bold',
    // color: '#5F5F5F',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  row1: {
    flexDirection: 'column',
    alignItems: 'center', // Aligns items vertically centered
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    // flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 250,
    margin: 10,
    borderWidth: 2,
    // borderColor: '#000',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Button transparency
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent footer background
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
    top: 20,
    right: 20,
    backgroundColor: 'transparent', // Adjust as needed
    padding: 10,
    borderRadius: 20,
    // borderWidth:2,
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

export default EmployeeCheckin;
