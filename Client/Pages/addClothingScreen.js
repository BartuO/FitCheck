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
                    <Text style>
                        Under Construction
                    </Text>
                    <TouchableOpacity onPress={onRequestClose}>
                        <Icon name="times" size={24} color="black" /> 
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
    }
})