import React, { useEffect, useState } from 'react';
import {  Text, View, Modal, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import placeholderImage from '../assets/profilePicPlaceholder.js';

export default function ProfilePage({route}) {
  
  const {params} = route;
  const {id} = params;
  const [showOptions, setShowOptions] = useState(false);
  const [image, setImage] = useState(placeholderImage.img);
  const [username, setUsername] = useState('Default');
  const [bio, setBio] = useState('Deafult');
  const [userEmail, setEmail] = useState("email");
  const [userID, setID] = useState(id);
  //const [userMemberSince, setDate] = useState(0);
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingBio, setEditingBio] = useState(false);
  const [isLoading, setLoading] = useState(true);

 

  let userMemberSince = "August 2013";

  useEffect(()=>{
    try{ 

      fetch(process.env.EXPO_PUBLIC_SERVER_IP+"/getProfile", {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'}, 
        body: JSON.stringify({"userID": userID})
        }
      )
      .then(response => response.json())
      .then(json => {
        setBio(json.bio);
        setUsername(json.username);
        if (json.profilepic != null ) setImage(json.profilepic);
        setID(json.userid);
        setEmail(json.email);
        setLoading(false);
        }
      )
    } catch {(e) => {console.log(e)}}
  },[])

  const openCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true
      });

      if (!result.cancelled) {
        await saveImage(result.assets[0].base64);
      }
    } catch (error) {
      // Handle error
    }
  };

  const openLib = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (!result.cancelled) {
        await saveImage(result.assets[0].base64);
      }
    } catch (error) {
      // Handle error
    }
  };

  const saveImage = async (base64img) => {
    try {
      setImage(base64img);
      fetch(process.env.EXPO_PUBLIC_SERVER_IP+"/updateProfilePic", {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({"userID": 1, "image": base64img}),
        }
      )

      closeOptions();
    } catch (error) {
      // Handle error
    }
  };

  const openOptions = () => {
    setShowOptions(true);
  };

  const closeOptions = () => {
    setShowOptions(false);
  };

  const startEditingUsername = () => {
    setEditingUsername(true);
  };

  const startEditingBio = () => {
    setEditingBio(true);
  };

  const saveChanges = () => {
    setEditingUsername(false);
    setEditingBio(false);
    // We save here
    try {
      const obj = JSON.stringify({
          "userID": userID,
          "userName": username,
          "bio": bio,
          "image": image
          }
        ); 
      fetch(process.env.EXPO_PUBLIC_SERVER_IP+"/updateProfile", { 
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: obj  
      })
    } catch {(e) => {console.log(e)}}
    setShowOptions(false);
  };

  while (isLoading) return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator />
    </View>
  );

 
    
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.addPhotoContainer} onPress={openOptions}>
          <Image resizeMode="cover" style={styles.img} source={{uri: 'data:image/jpeg;base64,' + image}} />
        </TouchableOpacity>
        {editingUsername ? (
          <TextInput
            style={styles.editableTextBio}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        ) : (
          <Text style={styles.username} onPress={startEditingUsername}>
            {username}
          </Text>
        )}
        {editingBio ? (
          <TextInput
            style={styles.editableTextDesc}
            value={bio}
            onChangeText={(text) => setBio(text)}
          />
        ) : (
          <Text style={styles.bio} onPress={startEditingBio}>
            {bio}
          </Text>
        )}

        {(editingUsername || editingBio) && (
                <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
        )}

        <Text style={styles.sectionTitle}>Account Information</Text>
        <Text style={styles.contactInfo}>UserID: {userID}</Text>
        <Text style={styles.contactInfo}>Email: {userEmail}</Text>
        <Text style={styles.contactInfo}>Member Since: {userMemberSince}</Text>

   

        <Modal
          animationType="slide"
          transparent={true}
          visible={showOptions}
          onRequestClose={closeOptions}>
          <View style={styles.optionsView}>
            <TouchableOpacity style={styles.optionButton} onPress={() => openLib()}>
              <Text style={styles.optionButtonText}>Choose from library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => openCamera()}>
              <Text style={styles.optionButtonText}>Capture using camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={closeOptions}>
              <Text style={styles.optionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: 20,
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    bio: {
      fontSize: 16,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 20,
    },
    contactInfo: {
      fontSize: 16,
      marginBottom: 10,
    },

    optionsView: {
        marginTop: "60%",
        height: "40%",
        width: "100%",
        backgroundColor: "#fff",
        borderTopEndRadius: 20,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    optionButton: {
        marginTop: 10,
        width: "80%",
        height: 40,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#99f2c1",
    },
    optionButtonText: {
        fontSize: 16,
        color: "white",
    },

    addPhotoContainer: {
        marginTop: -20,
        width: 175,
        height: 175,
        borderRadius: 75,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"

    },
    img: {
        width: "80%",
        height: "80%",
        alignSelf: "center",
        borderRadius: 180,
    },
    editableTextBio: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: 5,
      },
      editableTextDesc: {
        fontSize: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: 5,
      },
      
      saveButton: {
        marginTop: 10,
        backgroundColor: '#99f2c1',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
    
      saveButtonText: {
        fontSize: 16,
        color: 'white',
      },

   
  });