import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { colors, LogBox, SafeAreaProvider } from './main/utils/imports';
import AppNavigator from './main/navigation/AppNavigator';
import StatusBarCustom from 'react-native-custom-statusbar';
const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  const Stack = createNativeStackNavigator();
  return (


    <StatusBarCustom backgroundColor={colors.gradientColor1} barStyle="light-content">
      <SafeAreaProvider>

        <AppNavigator />
        <Toast />
      </SafeAreaProvider>
    </StatusBarCustom>

  )
}

export default App