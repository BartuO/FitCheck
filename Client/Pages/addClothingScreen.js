import { Text, View, Modal, StyleSheet, TouchableOpacity, Icon } from "react-native";

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
                        <Text style = {styles.buttonText}>X</Text> 
                    </TouchableOpacity>
                </View>
            </Modal>
            


        </View>




    )

}

const styles = StyleSheet.create({
    mainView:{
        marginTop: "10%",
        height: "100%",
        width: "100%",
        backgroundColor: "#b2f7d1",
        borderRadius: 20
    },
    button: {
        marginTop: "2%",
        marginLeft: "90%",
        width: 25,
        height: 25,
        borderRadius: 40, // Makes it round
        backgroundColor: '#5be398', // Customize the button color
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        marginLeft: 1,
        fontSize: 15,
        color: '#b2f7d1',
        lineHeight: 20
    },
})