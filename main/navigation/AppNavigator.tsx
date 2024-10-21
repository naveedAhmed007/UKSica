import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenData } from "./screenData";
import { screenNames } from "./screenNames";

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName={screenNames.login} screenOptions={{headerShown:false}}>
      {screenData.map((screen) => (
        <Stack.Screen 
          key={screen.name} 
          name={screen.name} 
          component={screen.component} 
          options={{ title: screen.name }} 
        />
      ))}
    </Stack.Navigator>
  </NavigationContainer>

  )
}

export default AppNavigator