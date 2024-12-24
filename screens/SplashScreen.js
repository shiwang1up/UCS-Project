import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
          source={{
            uri: 'https://static.wixstatic.com/media/6d3b11_9b1d5b57dda54586b2f4e3376d0c78d0~mv2.png/v1/fill/w_834,h_626,al_c/6d3b11_9b1d5b57dda54586b2f4e3376d0c78d0~mv2.png',
          }}
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
