import * as React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  ProfilePage  from "./Pages/profilePage";
import  FeedPage  from "./Pages/feedPage";
import WardrobePage from './Pages/wardrobePage';


 
const tab = createBottomTabNavigator();
export default function App() {
  const [id, setId] = useState(2);
  const [isLoggedin, setLogin] = useState(true);
  const [inp, setInp] = useState("enter your userID")

    const loginUser = (id) => {
    if (1) {
      // check if this user id exist in db here
      setId(id);
      setLogin(true);
    }
  }
  //login page
  while (!isLoggedin) return (
    <SafeAreaView style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
    <Text>Login Screen</Text>
    <TextInput style={styles.input} onChangeText={newInp => setInp(newInp)} value={inp}/>
    <Button onPress={loginUser} title='Login'/>
    </SafeAreaView>
  )

  return (
    <NavigationContainer>
      <tab.Navigator>
        <tab.Screen name='My Feed' component={FeedPage} initialParams={{id: id}}/>
        <tab.Screen name='My Wardrobe' component={WardrobePage} initialParams={{id:id}} />
        <tab.Screen name="My Profile" component={ProfilePage} initialParams={{id:id}}/>
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
  input: {
    width: 200,
    height: 30,
    margin: 12,
    borderWidth: 1,
  },
});
