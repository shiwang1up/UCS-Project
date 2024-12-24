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

const EmployeeCheckin = ({navigation, route}) => {
  const {theme, toggleTheme} = useTheme();
  const {isCheckoutMode} = route.params || {};
  const isDarkTheme = theme.buttonText === 'black';
  const images = [
    require('../assets/slides/slide1.jpg'),
    require('../assets/slides/slide2.jpg'),
    require('../assets/slides/slide3.jpeg'),
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
    source={images[currentImageIndex]}
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
              {isCheckoutMode ? 'UCS - Check Out' : 'UCS - Check In'}
            </Text>
          </View>
          {/* Header */}

          {/* Main Content */}
          <View style={styles.mainContainer}>
            <View style={styles.row}>
              {/* ID / Pass */}

              <TouchableOpacity
                style={[
                  styles.button,
                  {backgroundColor: theme.button},
                  {borderColor: theme.border},
                ]}
                onPress={() => navigation.navigate('IdPass', {isCheckoutMode})}>
                <View style={styles.row1}>
                  <Image
                    source={
                      isDarkTheme
                        ? require('../assets/pass.png')
                        : require('../assets/pass1.png')
                    }
                    style={styles.icon}
                    resizeMode="contain"
                  />
                  <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                    User ID
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Fingerprint */}
              <TouchableOpacity
                style={[
                  styles.button,
                  {backgroundColor: theme.button},
                  {borderColor: theme.border},
                ]}
                onPress={() =>
                  navigation.navigate('FingerAuth', {isCheckoutMode})
                }>
                <Image
                  source={
                    isDarkTheme
                      ? require('../assets/fingerprint.webp')
                      : require('../assets/fingerprint1.webp')
                  }
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
                  source={
                    isDarkTheme
                      ? require('../assets/face_recognition.webp')
                      : require('../assets/face_recognition1.webp')
                  }
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
  topButtonsContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    padding: 20,
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
    // borderWidth:2,
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
