import { Text, View, Modal, StyleSheet, TouchableOpacity, Icon, Image } from "react-native";
import React, { useState } from 'react';
import * as ImagePicker from "expo-image-picker";
import placeholderImage from "../assets/photoPlaceholder.png";


export default function AddClothingScreen({ visible, onRequestClose }) {

    const [showOptions, setShowOptions] = useState(false);

    const [image, setImage] = useState(placeholderImage);


    const openCamera = async() => {
        try{
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.back,
                aspect: [1,1],
                quality: 1,
            });

            if (!result.canceled){
                await saveImage(result.assets[0].uri)
            }
        } catch (error){

        }
    }

    const openLib = async() => {
        const result = await launchImageLibrary();
        setImgUrl(result?.assets[0]?.uri);
    }


    const openOptions = () => {
        setShowOptions(true);
    };

    const closeOptions = () => {
        setShowOptions(false);
    };

    const saveImage = async(image) => {
        try{
            setImage({ uri :image});
            closeOptions();

        } catch (error){
            throw error;
        }


    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onRequestClose}
            >
                <View style={styles.mainView}>
                    <TouchableOpacity style={styles.button} onPress={() => {setImage(placeholderImage); onRequestClose();}}>
                        <Text style={styles.buttonText}>x</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addPhotoContainer} onPress={openOptions}>
                        <Image resizeMode="cover" style = {styles.img} source={image} />
                    </TouchableOpacity>

                    {/* Options popup */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showOptions}
                        onRequestClose={closeOptions}
                    >
                        <View style={styles.optionsView}>
                            <TouchableOpacity style={styles.optionButton} onPress = {openLib}>
                                <Text style={styles.optionButtonText}>Choose from library</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress = {() => openCamera()}>
                                <Text style={styles.optionButtonText}>Capture using camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionButton} onPress={closeOptions}>
                                <Text style={styles.optionButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView:{
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
        marginTop: 20,
        width: "50%",
        height: "30%",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cadbd2"
    },
    img:
        {
        width: "100%",
        height: "100%",
        alignSelf: "center",
        borderRadius: 2,
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
})