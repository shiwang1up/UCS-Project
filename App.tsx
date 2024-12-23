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
import Settings from './screens/Settings';
import EmployeesList from './screens/EmployeesList';
import VisitorList from './screens/VisitorList';
import {createLogsTable} from './services/dbService';
import {SettingsProvider} from './context/SettingsProvider'; // Import your SettingsProvider
import AdminPage from './screens/AdminPage';
import LogsPage from './screens/LogsPage';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    createLogsTable();
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
      <SettingsProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="FaceRecog" component={FaceRecog} />
            <Stack.Screen name="IdPass" component={IdPass} />
            <Stack.Screen name="FingerAuth" component={FingerAuth} />
            <Stack.Screen name="CheckIn" component={EmployeeCheckin} />
            <Stack.Screen name="DbView" component={UserScreen} />
            <Stack.Screen name="PromptPage" component={PromptPage} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="EmployeesList" component={EmployeesList} />
            <Stack.Screen name="VisitorList" component={VisitorList} />
            <Stack.Screen name="AdminPage" component={AdminPage} />
            <Stack.Screen name="LogsPage" component={LogsPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default App;
