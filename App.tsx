import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { LogBox } from './main/utils/imports';
import AppNavigator from './main/navigation/AppNavigator';

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  const Stack = createNativeStackNavigator();
  return (
    <>
      <AppNavigator />
      <Toast />
    </>
  )
}

export default App