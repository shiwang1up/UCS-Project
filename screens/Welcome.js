import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import {useTheme} from '../context/ThemeProvider';
const WelcomeScreen = ({navigation}) => {
  const {theme, toggleTheme} = useTheme();
  const images = [
    'https://wallpaperaccess.com/full/189167.jpg',
    'https://www.pixelstalk.net/wp-content/uploads/images1/City-Merlion-Park-Singapore-Wallpaper-1920x1080.jpg',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isDarkTheme = theme.buttonText === 'black';
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <ImageBackground
      source={{uri: images[currentImageIndex]}}
      style={styles.background}
      imageStyle={styles.backgroundImage}>
      <StatusBar hidden={true} />
      <TouchableOpacity style={styles.themeToggleButton} onPress={toggleTheme}>
        <Icon
          name={isDarkTheme ? 'moon-outline' : 'sunny-outline'} // Change this line
          size={30}
          color={theme.icon}
        />
      </TouchableOpacity>
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
              style={[styles.button, {backgroundColor: theme.button}]}>
              <View style={styles.row}>
                <Text style={[styles.buttonText, {color: theme.buttonText}]}>
                  Check Out
                </Text>
                <Icon2 name="logout" size={30} color={theme.icon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={styles.iconContainer} > */}
        <View style={[styles.iconContainer, {backgroundColor: theme.button}]}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="person-outline" size={30} color={theme.icon} />
            <Text style={[styles.iconText, {color: theme.text}]}>
              Employees
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="person-outline" size={30} color={theme.icon} />
            <Text style={[styles.iconText, {color: theme.text}]}>Visitors</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="settings-outline" size={30} color={theme.icon} />
            <Text style={[styles.iconText, {color: theme.text}]}>Settings</Text>
          </TouchableOpacity>
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
    height: '15%',
    padding: 20,
    // borderWidth: 2,
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
  themeToggleButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'transparent', // Adjust as needed
    padding: 10,
    borderRadius: 20,
    zIndex: 100,
    // borderWidth:2,
  },
});

export default WelcomeScreen;
