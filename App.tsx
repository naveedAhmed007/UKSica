import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './main/screens/Login';
import SurveyForm from './main/screens/SurveyForm';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="Form" component={SurveyForm} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App