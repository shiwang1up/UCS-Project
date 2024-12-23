import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '../context/ThemeProvider';
import Icon from 'react-native-vector-icons/Ionicons';
const Settings = ({navigation}) => {
  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      {/* Top Buttons */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          style={styles.topButtonBack}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={35} color={'#00b4d8'} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Settings</Text>
        <View></View>
      </View>
      <View style={styles.content}>
        <View style={styles.cameraWrapper}>
          <Text>Hello</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: '8%',
    height: '82%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:2,
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  topButtonsContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
    height:'15%',
    flexDirection: 'row',
    alignContent:'center',
    alignItems:'center',
    justifyContent: 'space-between',
    zIndex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    backgroundColor: 'white',
    borderWidth:2,
  },
  topButtonBack: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00b4d8',
  },
  cameraWrapper: {
    width: 500,
    height: 500,
    borderRadius: 400,
    //   overflow: 'hidden',
  },
  titleText: {
    color: '#00b4d8',
    fontSize: 36,
  },
});

export default Settings;
