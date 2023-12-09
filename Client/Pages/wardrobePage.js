import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  AddClothingScreen  from './addClothingScreen';

const Stack = createNativeStackNavigator();

export default function WardrobePage({navigation}) {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };


    return (
        
        <View>
            <Text>This is where the wardrobe will be</Text>
            <View style={styles.container}>

                    <TouchableOpacity style={styles.button} onPress={togglePopup}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                    <AddClothingScreen visible={isPopupVisible} onRequestClose={togglePopup} />
    
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 50,
        width: 60,
        height: 60,
        borderRadius: 40, // Makes it round
        backgroundColor: 'lightblue', // Customize the button color
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
    
        fontSize: 35,
        color: 'white',
        lineHeight: 40
    },
  });

