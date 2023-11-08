import { Text, View, StyleSheet, SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  HomePage  from "./homePage";
export default function StartPage({ navigation }) {
   return (
      <View style={styles.container}>
         <View style = {styles.buttonsContainer}>
            <View style={styles.rightButton}>
               <Button
                  title = "Register"
                  onPress ={() => navigation.push('Register')}
               />
            </View>
            <View style={styles.leftButton}>
               <Button
               title = "Log in"
               onPress={() => navigation.push('Log in')}
               />
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container : {
      flex: 1,
      padding: 50
   },
   buttonsContainer : {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%'
   },

   rightButton: {
      marginRight: 0,
      borderWidth: 0,
      width: '50%',
      padding: 0

   },

   leftButton: {
      marginRight: 0,
      width: '50%',
      borderWidth: 0,
      borderColor: '000000'

   },

});
