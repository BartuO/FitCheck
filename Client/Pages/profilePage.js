import React, {useState} from 'react';
import { Text, View, Modal, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform  } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import placeholderImage from "../assets/profilePicPlaceholder.jpg";

export default function ProfilePage() {

    const [showOptions, setShowOptions] = useState(false);
    const [image, setImage] = useState(placeholderImage);

    const openCamera = async () => {
        try {
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.back,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                await saveImage(result.assets[0].uri);
            }
        } catch (error) {
            // Handle error
        }
    }


    const openLib = async () => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [1, 1],
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                await saveImage(result.assets[0].uri);
            }
        } catch (error) {
            // Handle error
        }
    }

    const saveImage = async (imageUri) => {
        try {
            setImage({ uri: imageUri });
            closeOptions();
        } catch (error) {
            // Handle error
        }
    }

    const openOptions = () => {
        setShowOptions(true);
    };

    const closeOptions = () => {
        setShowOptions(false);
    };

    const closeModal = () => {
        setImage(placeholderImage); 
        setName("");
        setDescription("");
        setTags("");
        onRequestClose(); 
    }

    return( 
    <View style={styles.container}>
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >        
            <TouchableOpacity style={styles.addPhotoContainer} onPress={openOptions}>
                <Image resizeMode="cover" style={styles.img} source={image} />
            </TouchableOpacity>
            <Text style={styles.username}>Bartu</Text>
            <Text style={styles.bio}> Stylist </Text>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <Text style={styles.contactInfo}>Email: blablabla@blabla.com</Text>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showOptions}
                onRequestClose={closeOptions}
            >
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
        marginTop: 20,
        width: "60%",
        height: "60%",
        borderRadius: 180,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"

    },
    img: {
        width: "80%",
        height: "80%",
        alignSelf: "center",
        borderRadius: 180,
    }
  });