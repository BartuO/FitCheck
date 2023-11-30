import { Text, View, Modal, StyleSheet, TouchableOpacity, Icon } from "react-native";
//import { Camera, useCameraDevices } from "react-native-vision-camera";

export default function AddClothingScreen({ visible, onRequestClose }) {


 
    return (
        
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onRequestClose}
            >
                <View style ={styles.mainView}>
                    <TouchableOpacity style = {styles.button} onPress={onRequestClose}>
                        <Text style = {styles.buttonText}>x</Text> 
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.addPhotoContainer}>
                        <Text style = {styles.addPhotoText}> + </Text> 
                    </TouchableOpacity>

                

                </View>
            </Modal>
            


        </View>




    )

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
    addPhotoText:{
        fontSize: 55,
        color: "white"

    }
})