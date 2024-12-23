import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from './context/ThemeProvider';
import WelcomeScreen from './screens/Welcome';
import SplashScreen from './screens/SplashScreen';
import EmployeeCheckin from './screens/EmployeeCheckin';
import FaceRecog from './screens/FaceRecog';
import UserScreen from './screens/UserScreen';
import IdPass from './screens/IdPass';
import Immersive from 'react-native-immersive'; // Import the immersive package
import FingerAuth from './screens/FingerAuth';
import PromptPage from './screens/PromptPage';
import EmployeeHistory from './screens/test';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
      Immersive.setImmersive(true); // Enable immersive mode after splash screen
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="FaceRecog" component={FaceRecog} />
          <Stack.Screen name="IdPass" component={IdPass} />
          <Stack.Screen name="FingerAuth" component={FingerAuth} />
          <Stack.Screen name="CheckIn" component={EmployeeCheckin} />
          <Stack.Screen name="DbView" component={UserScreen} />
          <Stack.Screen name="PromptPage" component={PromptPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
