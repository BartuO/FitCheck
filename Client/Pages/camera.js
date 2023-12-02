import React, { useState, useEffect, useRef } from "react";
import { Text, View, Modal, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CustomCamera({ camOn, closeCamOnReq }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    };

    checkPermissions();
  }, []);

  const handleRequestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === "granted");
  };

  const takePicture = async () => {
    if (!hasCameraPermission) {
      // If permissions are not granted, request them when trying to take a picture
      handleRequestPermission();
      return;
    }

    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo);
    }
  };

  const savePicture = async (photoUri) => {
    // Display the captured image
    setCapturedImage({ uri: photoUri, confirmed: false });
  };

  const confirmPicture = () => {
    // Pass the confirmed image back to the outer class
    onPictureTaken(capturedImage);
    setCapturedImage(null); // Reset the captured image state
  };

  const retakePicture = () => {
    setCapturedImage(null); // Reset the captured image state
  };

  const pickImage = async () => {
    const { status } = await MediaLibrary.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await MediaLibrary.launchImageLibraryAsync({
        mediaTypes: MediaLibrary.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        savePicture(result.uri);
      }
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={camOn}
      onRequestClose={closeCamOnReq}
    >
      <View style={styles.container}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={type}
          flashMode={flash}
        >
          <View style={styles.overlayContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeCamOnReq}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            {/* Display the captured image */}
            {capturedImage && (
              <View style={styles.capturedImageContainer}>
                <Image
                  source={{ uri: capturedImage.uri }}
                  style={styles.capturedImage}
                />
                <View style={styles.confirmationButtons}>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={confirmPicture}
                  >
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.retakeButton}
                    onPress={retakePicture}
                  >
                    <Text style={styles.retakeButtonText}>Retake</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Capture button */}
            {!capturedImage && (
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              />
            )}
          </View>
        </Camera>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    camera: {
      flex: 1,
    },
    overlayContainer: {
      flex: 1,
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    closeButton: {
      width: 40,
      height: 40,
      backgroundColor: "#fff",
      borderRadius: 20,
      borderColor: "#ccc",
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
    },
    closeButtonText: {
      fontSize: 18,
      color: "#333",
    },
    libraryButton: {
      width: 80,
      height: 40,
      backgroundColor: "#fff",
      borderRadius: 10,
      borderColor: "#ccc",
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
    
    },
    libraryButtonText: {
      fontSize: 16,
      color: "#333",
    },
    captureButton: {
      width: 60,
      height: 60,
      backgroundColor: "#fff",
      borderRadius: 30,
      borderColor: "#ccc",
      borderWidth: 2,
      alignSelf: "center",
    },
  });
