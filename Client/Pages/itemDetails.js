import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function ItemDetails({ isOpen, onClose, photo, name, price, description, tags, isAdmin }) {
  if (!isOpen) {
    return null;
  }


  
  //console.log(photoUri);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>

            <Image source={{uri: 'data:image/jpeg;base64,' + photo}} style={styles.itemImage} />
            

            <Text style={styles.title}>{name}</Text>
            <Text style={styles.price}>Price: ${price}</Text>
            <Text style={styles.description}>{description}</Text>
            {tags && tags.length > 0 && (
                <Text style={styles.tags}>Tags: {tags.join(', ')}</Text>
            )}
        
            {isAdmin && (
                <TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Remove Post</Text>
                    </View>
                </TouchableOpacity>
            )}

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '96%',
    height: '90%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemImage: {
    width: '85%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    marginTop: 15,
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 10,
  },
  tags: {
    marginTop: 7,
    fontStyle: 'italic',
    color: 'gray',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
