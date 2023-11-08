import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, SafeAreaView, Button } from 'react-native';

function checkUsername ({ username}) {
    return <Text> The username {username} is not available</Text>
}
// onChanngeText
export default function RegisterPage ({ navigation}){
    const [password, setPassword] = useState('');
    const [available, setAvailability] = useState('valid');
    const checkPassword = () => {
        const re = new RegExp("^[0-9]*$");
        if(password.match(re) == null)
            setAvailability('Invalid password');
        else
            setAvailability('Valid password');
    }
    return (
        <View style = {styles.container}>
            <View>
                <Text>Register</Text>
            </View>
            <View style= {styles.userField}>
                <View>
                    <Text>E-mail</Text>
                    <TextInput style = {styles.textInputStyle}>  </TextInput>
                </View>
                <View>
                    <Text>Username</Text>
                    <TextInput style = {styles.textInputStyle}>  </TextInput>
                </View>
                <View>
                    <Text>Password</Text>
                    <TextInput style = {styles.textInputStyle}
                    onChangeText={(psswd) => { setPassword(psswd); checkPassword}}>

                    </TextInput>
                    <Text>{available}</Text>
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