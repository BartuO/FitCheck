import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
//import { Navigation } from 'react-native-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  HomePage  from "./Pages/homePage";
import  FeedPage  from "./Pages/feedPage";
import WardrobePage from './Pages/wardrobePage';
import LoginPage from "./Pages/loginPage";
import RegisterPage from './Pages/registerPage';
import StartPage from './Pages/startPage';

const tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// function LoginScreen() {
//   return (
//      <SafeAreaView>
//         <Text> Log In</Text>
//      </SafeAreaView>
//   );
// }
// Navigation.registerComponent('LOGIN_SCREEN', () => loginPage);
// Navigation.events().registerAppLaunchedListener(async () => {
//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               name: 'LOGIN_SCREEN'
//             }
//           }
//         ]
//       }
//     }
//   });
// });

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{ headerShown: false}}>
        
        <Stack.Screen name = "Register" component={RegisterPage} />
        <Stack.Screen name = "Log in" component={LoginPage} />
       <Stack.Screen name = "Start" component={StartPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//export default App;
const styles = StyleSheet.create({
  c: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
