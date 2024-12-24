import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeProvider';
import gifSource from '../assets/prompt.gif';
import FastImage from 'react-native-fast-image';
import {CommonActions} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import bgImg from '../assets/backgroundPrompt.png';

const PromptPage = ({navigation, route}) => {
  // const {isCheckoutMode, timing, id} = route.params || {};
  const {timing, id} = route.params || {};
  const isCheckoutMode = false;



  const {width, height} = Dimensions.get('window');
  const isPortrait = height > width;
  // const {timing, id} = route.params || {};
  // const isCheckoutMode = false;

  const {theme} = useTheme();

  const formatDate = isoString => {
    const date = new Date(isoString);

    const optionsDate = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour12: false,
    };
    const optionsTime = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return {formattedDate, formattedTime};
  };

  const {formattedDate, formattedTime} = formatDate(timing);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Welcome'}],
        }),
      );
    }, 100000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const contentStyle = {
    marginTop: isPortrait ? '15%' : '8%',
    height: isPortrait ? '50%' : '82%',
    width: '100%',
    flex: 1,
    flexDirection: isPortrait ? 'column' : 'row', // Use isPortrait here
    justifyContent: 'space-around',
    alignItems: 'center',
  };

  const infoWrapper = {
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: isPortrait ? 50 : 0,
    height: isPortrait ? '50%' : '70%',
    width: isPortrait ? '80%' : '40%',
    alignItems: 'center',
    flex: 0,
    justifyContent: 'center',
  };

  return (
    <View style={styles.container}>
      {/* Top Buttons */}
      <View style={styles.topButtonsContainer}>
        <View>
          {/* <Icon name="arrow-back" size={35} color={'#00b4d8'} /> */}
        </View>

        <Text style={styles.titleText}>
          {isCheckoutMode ? 'Checkout Successful' : 'Checkin Successful'}
        </Text>

        <TouchableOpacity
          style={styles.topButtonForward}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Welcome'}], // Navigate to Welcome screen
              }),
            );
          }}>
          <Icon name="home" size={35} color={'white'} />
        </TouchableOpacity>
      </View>
      {/* Top Buttons */}
      <ImageBackground source={bgImg} resizeMode="cover">
        <View style={contentStyle}>
          <View
            style={[
              styles.cameraWrapper,
              {borderColor: isCheckoutMode ? '#dd2726' : '#17a24a'},
            ]}>
            <FastImage
              source={gifSource} // Use FastImage for the GIF
              style={styles.gif}
              resizeMode={FastImage.resizeMode.stretch} // Adjust resizeMode as needed
            />
          </View>

          <View
            style={[
              infoWrapper,
              {
                backgroundColor: isCheckoutMode ? '#dd2726' : '#17a24a',
              },
            ]}>
            <View
              style={[
                styles.retakeButton,
                {
                  // backgroundColor: isCheckoutMode ? '#dd2726' : '#17a24a',
                  backgroundColor: 'white',
                  position: 'relative',
                },
              ]}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 36,
                  color: '#65696c',
                  marginBottom: 10,
                  fontWeight:'800',
                }}>
                {isCheckoutMode ? 'Thankyou' : 'Welcome'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 0,
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                <View style={{marginTop: 20}}>
                  <Text style={styles.buttonLabel}>Employee ID:</Text>
                  <Text style={styles.buttonLabel}>Date:</Text>
                  <Text style={styles.buttonLabel}>Time:</Text>
                </View>
                <View style={{marginTop: 20}}>
                  <Text style={styles.buttonText}>{id}</Text>
                  <Text style={styles.buttonText}>{formattedDate}</Text>
                  <Text style={styles.buttonText}>{formattedTime}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 26,
                    color: '#65696c',
                    marginTop: 20,
                    fontWeight:'600',
                  }}>
                  Have a nice day!!!
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',

    width: '100%',
    height: '100%',
  },
  // shadowProp: {
  //   shadowColor: 'rgba(0,0,0,1)',
  //   shadowOffset: {width: 10, height: 10},
  //   shadowOpacity: 0.8,
  //   shadowRadius: 10,
  // },
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

  timerText: {fontSize: 24, color: '#00b4d8', marginBottom: 10},
  timerNumber: {fontSize: 40, fontWeight: 'bold'},
  cameraWrapper: {
    width: 350,
    height: 350,
    borderRadius: 400,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 3,
  },
  welcomeText: {
    fontSize: 22,
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
    borderWidth: 8,
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    height: '95%',
    width: '95%',
    padding: 20,
  },
  titleText: {
    color: '#00b4d8',
    fontSize: 36,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '500',
  },
  buttonLabel: {
    color: '#65696c',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
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

export default PromptPage;
