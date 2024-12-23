import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeProvider';
import gifSource from '../assets/fingerprint_animation.gif';
import FastImage from 'react-native-fast-image';

const FingerAuth = ({navigation}) => {
  const [timer, setTimer] = useState(5);
  const [isScanning, setIsScanning] = useState(true);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);
  const {theme} = useTheme();
  const devices = useCameraDevices();
  const frontCamera = devices[1];

  useEffect(() => {
    let countdown;
    if (timer > 0 && isScanning) {
      countdown = setTimeout(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0 && isScanning) {
      // Handle the logic when the timer reaches 0
      // For example, you might want to capture the photo or stop scanning
      setIsScanning(false); // Stop scanning after the timer ends
    }
    return () => clearTimeout(countdown);
  }, [timer, isScanning]);
  return (
    <View style={styles.container}>
      {/* Top Buttons */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          style={styles.topButtonBack}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={35} color={'#00b4d8'} />
        </TouchableOpacity>

        <Text style={styles.titleText}>Finger Print Authentication</Text>

        <View>
          {/* <Icon name="arrow-forward" size={35} color={'white'} /> */}
        </View>
      </View>
      {/* Top Buttons */}
      <View style={styles.content}>
        <View style={styles.cameraWrapper}>
          <FastImage
            source={gifSource} // Use FastImage for the GIF
            style={styles.gif}
            resizeMode={FastImage.resizeMode.stretch} // Adjust resizeMode as needed
          />
        </View>

        <View style={[styles.retakeButton, {backgroundColor: '#00b4d8'}]}>
          <Text style={[styles.buttonText, {color: 'white'}]}>Use Fingerprint Sensor</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop:'8%',
    height: '82%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:2,
  },
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
    // borderWidth: 2,
    // borderColor: 'red',
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
  topButtonText: {
    fontSize: 18,
    color: '#007bff',
  },
  timerText: {fontSize: 24, color: '#00b4d8', marginBottom: 10},
  timerNumber: {fontSize: 40, fontWeight: 'bold'},
  cameraWrapper: {
    width: 500,
    height: 500,
    borderRadius: 400,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: 500,
    height: 500,
    borderRadius: 400,
    overflow: 'hidden',
    // borderWidth: 2,
    borderColor: '#00b4d8',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  gifWrapper: {
    width: 500,
    height: 900,
    borderRadius: 400,
    overflow: 'hidden',
    borderColor: '#ccc',
  },
  gif: {
    width: '100%',
    height: '100%',
  },
  retakeButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#00b4d8',
    zIndex: 10,
    marginTop: 20,
  },
  titleText: {
    color: '#00b4d8',
    fontSize: 36,
  },
  buttonText: {
    color: '#00b4d8',
    fontSize: 18,
    fontWeight: '600',
  },
  capturedImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'yellow',
  },
  capturedImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  errorText: {fontSize: 18, color: 'red'},
});

export default FingerAuth;
