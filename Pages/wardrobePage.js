import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function WardrobePage() {
    return (
        <View>
            <Text>This is whee the wardrobe will be</Text>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
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

