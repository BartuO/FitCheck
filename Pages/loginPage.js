import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, SafeAreaView, Button } from 'react-native';

function checkUsername ({ username}) {
    return <Text> The username {username} is not available</Text>
}
// onChanngeText
export default function LoginPage ({ navigation}){
    const [name, setAvailability] = useState('username');
    return (
        <View style = {styles.container}>
            <View>
                <Text>Log in</Text>
            </View>
            <View style= {styles.userField}>
                <View>
                    <Text>Username</Text>
                    <TextInput style = {styles.textInputStyle}>  </TextInput>
                </View>
                <View>
                    <Text>Password</Text>
                    <TextInput style = {styles.textInputStyle}> </TextInput>
                </View>
            </View>
            
            <Button
            title = "Back"
            onPress={() => navigation.navigate('Start')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50
    },
    userField: {

        justifyContent: 'center',
        padding: 10

    },
    textInputStyle: {
        borderWidth:1,
        color: '#000000'

    }
});