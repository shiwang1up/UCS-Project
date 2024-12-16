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
const FaceRecog = () => {
  const [timer, setTimer] = useState(5);
  const [isScanning, setIsScanning] = useState(true);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);
  const {theme} = useTheme();
  const devices = useCameraDevices();
  const frontCamera = devices[0];

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      if (status !== 'granted') {
        console.warn('Camera permission denied');
      }
    })();
  }, []);

  useEffect(() => {
    let countdown;
    if (timer > 0 && isScanning) {
      countdown = setTimeout(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0 && isScanning) {
      handleTakePhoto();
    }
    return () => clearTimeout(countdown);
  }, [timer, isScanning]);

  const handleRetake = () => {
    setTimer(5);
    setIsScanning(true);
    setCapturedPhoto(null); // Reset captured photo
  };

  const handleTakePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({
          flash: 'off',
        });
        console.log('Photo taken:', photo.path);

        // Check the platform and handle the image path accordingly
        let imagePath = photo.path;

        // If on iOS, we may need to access the path differently
        if (Platform.OS === 'ios') {
          imagePath = `file://${photo.path}`;
        }

        setCapturedPhoto(imagePath); // Store the captured photo path
        setIsScanning(false); // Stop scanning
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };

  if (!frontCamera) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No front camera available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top Buttons */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity style={styles.topButtonBack}>
          <Icon name="arrow-back" size={35} color={'blue'} />
        </TouchableOpacity>
        {!capturedPhoto ? (
          <>
            <Text style={styles.buttonText}>Scanning</Text>
          </>
        ) : (
          // Display the captured photo
          <Text style={styles.buttonText}>Thank You</Text>
        )}
        <TouchableOpacity style={styles.topButtonForward}>
          <Icon name="arrow-forward" size={35} color={'white'} />
        </TouchableOpacity>
      </View>

      {!capturedPhoto ? (
        <>
          <View style={styles.cameraWrapper}>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              device={frontCamera}
              isActive={isScanning}
              photo={true}
            />
          </View>
          {isScanning && (
            <>
              <Text style={styles.timerText}>Scanning...</Text>
              <Text style={styles.timerNumber}>{timer}</Text>
            </>
          )}
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Display the captured photo
        <View style={styles.capturedImageContainer}>
          <Image source={{uri: capturedPhoto}} style={styles.capturedImage} />
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderWidth: 2,
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
    backgroundColor: 'blue',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'blue',
  },
  topButtonBack: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'blue',
  },
  topButtonText: {
    fontSize: 18,
    color: '#007bff',
  },
  timerText: {fontSize: 24, color: 'blue', marginBottom: 10},
  timerNumber: {fontSize: 40, fontWeight: 'bold'},
  cameraWrapper: {
    width: 150,
    height: 150,
    borderRadius: 150,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  camera: {
    width: 150,
    height: 150,
    borderRadius: 150,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  retakeButton: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'blue',
  },
  buttonText: {
    color: 'blue',
    fontSize: 16,
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

export default FaceRecog;
