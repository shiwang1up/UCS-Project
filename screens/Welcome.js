import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import {useTheme} from '../context/ThemeProvider';
import {SettingsContext} from '../context/SettingsProvider';
const WelcomeScreen = ({navigation}) => {
  const {isInternetConnected} = useContext(SettingsContext);
  const {theme, toggleTheme} = useTheme();
  const images = [
    require('../assets/slides/slide1.jpg'),
    require('../assets/slides/slide2.jpg'),
    require('../assets/slides/slide3.jpeg'),
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isDarkTheme = theme.buttonText === 'black';
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length,isInternetConnected]);

  return (
    <ImageBackground
      source={images[currentImageIndex]}
      style={styles.background}
      imageStyle={styles.backgroundImage}>
      <StatusBar hidden={true} />
      {/* <View style={styles.header}> */}
      <View style={[styles.networkDisplay, {backgroundColor: theme.button}]}>
        <Icon4
          name={isInternetConnected ? 'wifi' : 'wifi-off'} // Change icon based on connection status
          size={30}
          color={theme.icon}
        />
      </View>
      <TouchableOpacity
        style={[styles.themeToggleButton, {backgroundColor: theme.button}]}
        onPress={toggleTheme}>
        <Icon
          name={isDarkTheme ? 'moon-outline' : 'sunny-outline'} // Change this line
          size={30}
          color={theme.icon}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
          style={[styles.logButton, {backgroundColor: theme.button}]}
          onPress={() => navigation.navigate('LogsPage')}>
          <Icon3 name="code-json" size={30} color={theme.icon} />
        </TouchableOpacity> */}
      {/* </View> */}
      <View style={styles.wrapper}>
        <View style={[styles.greetingCon]}>
          <Text style={[styles.title, {color: theme.text}]}>Welcome</Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: theme.button}]}
              onPress={() => navigation.navigate('CheckIn')}>
              <View style={styles.row}>
                <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                  Check in
                </Text>
                <Icon2 name="login" size={30} color={theme.icon} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: theme.button}]}
              onPress={() =>
                navigation.navigate('CheckIn', {isCheckoutMode: true})
              }>
              <View style={styles.row}>
                <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                  Check Out
                </Text>
                <Icon2 name="logout" size={30} color={theme.icon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.datawrapper}>
          <TouchableOpacity
            style={[styles.iconWrapper, {backgroundColor: theme.button}]}
            onPress={() => navigation.navigate('DbView')}>
            <Icon name="newspaper-outline" size={30} color={theme.icon} />
          </TouchableOpacity>
        </View> */}

        <View style={[styles.iconContainer, {backgroundColor: theme.button}]}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('EmployeesList')}>
            <Icon name="person-outline" size={30} color={theme.icon} />
            <Text style={[styles.iconText, {color: theme.text}]}>
              Employees
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('VisitorList')}>
            <Icon name="person-outline" size={30} color={theme.icon} />
            <Text style={[styles.iconText, {color: theme.text}]}>Visitors</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('test')}>
            <Icon3
              name="shield-account-variant-outline"
              size={30}
              color={theme.icon}
            />
            <Text style={[styles.iconText, {color: theme.text}]}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Settings')}>
            <Icon name="settings-outline" size={30} color={theme.icon} />
            <Text style={[styles.iconText, {color: theme.text}]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  datawrapper: {
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: -70,
    marginRight: 10,
  },

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    opacity: 0.6,
  },
  greetingCon: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    height: '85%',
    padding: 20,
    // borderWidth: 2,
  },
  buttonWrapper: {
    flexDirection: 'row',
    // borderWidth: 2,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 96,
    fontFamily: 'Arial',
    marginBottom: 70,
    // borderWidth: 2,
    fontWeight: '600',
  },
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 30,
    // borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', // Aligns items vertically centered
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '600',
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 10,
  },
  iconButton: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  iconText: {
    fontSize: 14,
    marginTop: 5,
  },
  visitorOutButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 30,
  },
  header: {
    width: '100%',
  },
  themeToggleButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 100,
    backgroundColor: '#00b4d8',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  logButton: {
    position: 'absolute',
    bottom: '13%',
    right: 160,
    zIndex: 100,
    backgroundColor: '#00b4d8',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  networkDisplay: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
    backgroundColor: '#00b4d8',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  iconWrapper: {
    padding: 15,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
    // backgroundColor: '#ff4d6d',
  },
});

export default WelcomeScreen;
