import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const src = require('../assets/splashLogo.png');
const SplashScreen = () => {
  return (
    <LinearGradient
      colors={[
        '#0000FF',
        '#1F1FFF',
        '#4949FF',
        '#7879FF',
        '#A3A3FF',
        '#BFBFFF',
      ]}
      style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          //   source={require('../assets/logo.png')}
          //  // Replace with your logo path
          source={src}
          style={styles.logo}
        />
        <Text style={styles.text}>a UEMS product</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreen;
