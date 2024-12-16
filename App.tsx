import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from './context/ThemeProvider';
import WelcomeScreen from './screens/Welcome';
import SplashScreen from './screens/SplashScreen';
import EmployeeCheckin from './screens/EmployeeCheckin';
import FaceRecog from './screens/FaceRecog';
const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
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
          {/* <Stack.Navigator initialRouteName="Welcome"> */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="CheckIn" component={EmployeeCheckin} />
          <Stack.Screen name="FaceRecog" component={FaceRecog} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
