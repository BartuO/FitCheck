import React, { useState } from 'react';
import { Text, View, Modal, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Tags from "react-native-tags";
import placeholderImage from "../assets/photoPlaceholder.png";


export default function AddClothingScreen({ visible, onRequestClose }) {


    const [showOptions, setShowOptions] = useState(false);
    const [image, setImage] = useState(placeholderImage);
    const [imageBase64, setBase64] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [tags, setTags] = useState([]);



    const openCamera = async () => {
        try {
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.back,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                base64: true,
            });

            if (!result.canceled) {
            await saveImage(result.assets[0].uri, result.assets[0].base64);
            console.log(res.assets[0])
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
                base64: true,
            });

            if (!result.canceled) {
                await saveImage(result.assets[0].uri, result.assets[0].base64);
            }
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

    const saveImage = async (imageUri, base64) => {
        try {
            setImage({ uri: imageUri });
            setBase64(base64);
            closeOptions();
        } catch (error) {
            // Handle error
        }
    }

    const saveClothingItem = async () => {
        const o = {"img": imageBase64};
        let obj = JSON.stringify(o);

        try {
        //await fetch("http://10.0.0.97:5000/test");
        await fetch("http://10.0.0.97:5000/addClothing", {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: obj, 
            });
        } catch (e) {console.log(e)}
        onRequestClose();
    }

    const closeModal = () => {
        setImage(placeholderImage); 
        setName("");
        setDescription("");
        setTags("");
        setPrice("");
        onRequestClose(); 
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onRequestClose}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoidingView}
                >
                    <ScrollView
                        contentContainerStyle={styles.mainView}
                        keyboardShouldPersistTaps="handled"
                    >
                        <TouchableOpacity style={styles.button} onPress={closeModal}>
                            <Text style={styles.buttonText}>x</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.addPhotoContainer} onPress={openOptions}>
                            <Image resizeMode="cover" style={styles.img} source={image} />
                        </TouchableOpacity>

                        <TextInput
                            style={styles.inputName}
                            placeholder="Name"
                            placeholderTextColor={"#6bd199"}
                            value={name}
                            onChangeText={(text) => setName(text)}
        
                        />
                        <TextInput
                            style={styles.inputDesc}
                            placeholder="Description"
                            placeholderTextColor={"#6bd199"}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                            multiline
                        />

                        <TextInput
                            style={styles.inputPrice}
                            placeholder="Price"
                            placeholderTextColor={"#6bd199"}
                            value={price ? `$${price}` : ""}
                            onChangeText={(text) => setPrice(text.replace('$', ''))}
                            keyboardType = "numeric"
                          
                        />

                        <Tags

                            textInputProps={{
                                placeholder: "Tags to categorize"
                            }}
                        
                            maxNumberOfTags={4}
                            onTagPress={() => {}}
                            containerStyle={{ 
                                justifyContent: "center",
                                marginTop: 10,
                                width: "80%",
                                height: 60,
                            }}
                            inputStyle={{ backgroundColor: "#99f2c1", borderRadius: 4, margin: 0, padding: 0,}}
                            renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
                                <TouchableOpacity key={`${tag}-${index}`} onPress={onPress} style={styles.tag}>
                                    <Text style = {styles.tagText}>{tag}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        
                        

                        <TouchableOpacity style={styles.saveButton} onPress={saveClothingItem}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>

                        {/* Options popup */}
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
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    mainView: {
        marginTop: "10%",
        height: "90%",
        width: "100%",
        backgroundColor: "#b2f7d1",
        borderTopEndRadius: 20,
        flex: 1,
        alignItems: "center"
    },
    button: {
        marginTop: "2%",
        marginLeft: "88%",
        width: 25,
        height: 25,
        borderRadius: 40,
        backgroundColor: '#99f2c1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        marginLeft: 1,
        fontSize: 15,
        color: "white",
        lineHeight: 20
    },
    addPhotoContainer: {
        marginTop: -6,
        width: "60%",
        height: "30%",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cadbd2"
    },
    img: {
        width: "100%",
        height: "100%",
        alignSelf: "center",
        borderRadius: 4,
    },
    inputName: {
        marginTop: 15,
        width: "80%",
        height: 30,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#99f2c1",
        paddingHorizontal: 10,
        textAlign: "center",
    },
    inputDesc: {
        marginTop: 10,
        width: "80%",
        height: 60,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#99f2c1",
        paddingHorizontal: 10,
        textAlign: "center",
    },
    inputPrice: {
        marginTop: 10,
        width: 80,
        height: 25,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#99f2c1",
        paddingHorizontal: 10,
        textAlign: "center",
    },

    tag: {
        backgroundColor: '#99f2c1',
        padding: 8,
        borderRadius: 8,
        marginVertical: 4,
        marginRight: 8,
    },
    tagText: {
        color: 'white',
    },


    saveButton: {
        marginTop: 20,
        width: "80%",
        height: 40,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#99f2c1",
    },
    saveButtonText: {
        fontSize: 16,
        color: "white",
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
    keyboardAvoidingView: {
        flex: 1,
      },
});
