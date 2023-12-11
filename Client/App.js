import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  ProfilePage  from "./Pages/profilePage";
import  FeedPage  from "./Pages/feedPage";
import WardrobePage from './Pages/wardrobePage';


const tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <tab.Navigator>
        <tab.Screen name='My Feed' component={FeedPage}/>
        <tab.Screen name='My Wardrobe' component={WardrobePage} />
        <tab.Screen name="My Profile" component={ProfilePage} />
      </tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
