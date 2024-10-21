import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './main/screens/Login';
import SurveyForm from './main/screens/SurveyForm';
import UserTypesScreen from './main/screens/UserTypesScreen';
import Toast from 'react-native-toast-message';
import { LogBox } from './main/utils/imports';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="Form" component={SurveyForm} />
          <Stack.Screen name="UserTypeScreens" component={UserTypesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  )
}

export default App