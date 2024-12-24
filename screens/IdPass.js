import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeProvider';
import {TextInput} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  getLatestOperation,
  getUserById,
  saveUser,
  logOperation,
} from '../services/dbService';

const IdPass = ({navigation, route}) => {
  const {isCheckoutMode} = route.params || {};
  const {theme} = useTheme();
  const [id, setId] = useState('');
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const formatDate = isoString => {
    const date = new Date(isoString);

    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    const formattedDate = date.toLocaleString('en-US', options);

    const [month, day, year, time] = formattedDate.split(/, | /);

    const suffix =
      day.endsWith('1') && day !== '11'
        ? 'st'
        : day.endsWith('2') && day !== '12'
        ? 'nd'
        : day.endsWith('3') && day !== '13'
        ? 'rd'
        : 'th';

    return `${month} ${day}${suffix}, ${year}\nat ${time}`;
  };

  const handleSubmit = () => {
    if (!id) {
      const timing = new Date().toISOString();
      logOperation(
        id,
        isCheckoutMode ? 0 : 1,
        'not success',
        'Please enter UserID',
        timing,
      );
      Alert.alert('Error', 'Please enter UserID');
      return;
    }

    const operation = isCheckoutMode ? 0 : 1;
    const timing = new Date().toISOString();

    if (!isCheckoutMode) {
      // Check the latest operation before allowing check-in
      getLatestOperation(id, latestOperation => {
        if (latestOperation === '1') {
          const message = 'You are already checked in. Please check out first.';
          logOperation(id, operation, 'not success', message, timing);
          Alert.alert('Error', message);
          return; // Prevent further execution
        }

        // Proceed with check-in
        saveUser(
          id,
          operation,
          timing,
          () => {
            const successMessage = `Check in successful !!\nOn ${timing}!`;
            logOperation(id, operation, 'success', successMessage, timing);
            setIsCheckedIn(true);
            navigation.navigate('PromptPage', {
              isCheckoutMode: false,
              timing: timing,
              id: id,
              alertMessage: successMessage,
            });
          },
          errorMessage => {
            logOperation(id, operation, 'not success', errorMessage, timing);
            Alert.alert('Error', errorMessage);
          },
        );
      });
    } else {
      // Checkout logic
      getLatestOperation(id, latestOperation => {
        if (latestOperation !== '1') {
          const message = 'You must be checked in to check out.';
          logOperation(id, operation, 'not success', message, timing);
          Alert.alert('Error', message);
          return; // Prevent further execution
        }

        // Proceed with checkout
        getUserById(id, user => {
          if (user) {
            if (user.userid === id) {
              // Parse checkInTime from text
              const checkInTimeString = user.timing; // Assuming checkInTime is stored in the timing field
              console.log('Raw Check-in Time:', checkInTimeString); // Log the raw value
              const checkInTime = new Date(checkInTimeString); // Convert to Date object

              // Validate checkInTime
              if (isNaN(checkInTime.getTime())) {
                const message =
                  'Invalid check-in time. Please check your records.';
                logOperation(id, operation, 'not success', message, timing);
                Alert.alert('Error', message);
                return; // Prevent further execution
              }

              const currentTime = new Date();
              const timeDifference = (currentTime - checkInTime) / (1000 * 60); // Convert to minutes

              // Debugging logs
              console.log('Check-in Time:', checkInTime);
              console.log('Current Time:', currentTime);
              console.log('Time Difference (minutes):', timeDifference);

              // change these 1 to 10
              // Enforce the 10-minute rule
              if (timeDifference < 1) {
                const remainingTime = 1 - timeDifference;
                const message = `You can only check out after 10 minutes of Check in. Please wait ${remainingTime.toFixed(
                  0,
                )} more minutes.`;
                logOperation(id, operation, 'not success', message, timing);
                Alert.alert('Error', message);
                return; // Prevent further execution
              }

              // Proceed with checkout
              saveUser(
                id,
                operation,
                timing,
                () => {
                  const successMessage = `Checkout time updated successfully !!\nOn ${timing}!`;
                  logOperation(
                    id,
                    operation,
                    'success',
                    successMessage,
                    timing,
                  );
                  setIsCheckedIn(true);
                  navigation.navigate('PromptPage', {
                    isCheckoutMode: true,
                    timing: timing,
                    id: id,
                    alertMessage: successMessage,
                  });
                },
                errorMessage => {
                  logOperation(
                    id,
                    operation,
                    'not success',
                    errorMessage,
                    timing,
                  );
                  Alert.alert('Error', errorMessage);
                },
              );
            }
          }
        });
      });
    }
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}>
        <View style={styles.container}>
          <View style={styles.topButtonsContainer}>
            <TouchableOpacity
              style={styles.topButtonBack}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={35} color={'#00b4d8'} />
            </TouchableOpacity>
            {isCheckedIn ? (
              <Text style={styles.titleText}>Thank You</Text>
            ) : (
              <Text style={[styles.titleText]}>
                {isCheckoutMode ? 'Check Out' : 'Check In'}
              </Text>
            )}
            <View>{/** hello  */}</View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Employee ID"
              value={id}
              onChangeText={text => {
                if (/^\d*$/.test(text)) {
                  setId(text);
                }
              }}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
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
  submitButton: {
    backgroundColor: '#00b4d8',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 5,
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 100, // Adjust as needed
    width: '60%', // Adjust width as needed
  },
  input: {
    height: 50,
    borderColor: '#00b4d8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'white',
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
    borderWidth: 2,
    borderColor: '#00b4d8',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  camera: {
    width: 500,
    height: 500,
    borderRadius: 400,
    overflow: 'hidden',
    // borderWidth: 2,
    borderColor: '#ccc',
  },
  retakeButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#00b4d8',
    zIndex: 10,
    marginTop: -25,
  },
  titleText: {
    color: '#00b4d8',
    fontSize: 36,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
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

export default IdPass;
