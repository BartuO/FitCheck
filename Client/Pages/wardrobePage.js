import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, Button, RefreshControl } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  AddClothingScreen  from './addClothingScreen';
import ItemDetails from './itemDetails';
 


export default function WardrobePage({route}) {
    const {params} = route;
    const {id} = params; 
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [isDetailsVisible, setDetailsVisible] = useState(false);
    [photo, setPhoto] = useState();
    [itemName, setName] = useState("Jacket");
    [price, setPrice] = useState("0.987");
    [description, setDescription] = useState("HELO HELLO THIS IS HELLO HELLO IS DESCRIPTION I AM HELLO THIS ITEM IS HELLO");
    [isLoading, setLoading] = useState(true);
    [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(()=>{
        try {
            fetch(process.env.EXPO_PUBLIC_SERVER_IP+"/getUserPosts", {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'}, 
                body: JSON.stringify({"userID": id})
                }
            )
            .then(response => response.json())
            .then(postss => {
                setPosts(postss);
                setLoading(false);
                }
            )
        } catch (e) {console.log(e)}
        },[route]
    );

    const onRefresh = () => {
        setRefreshing(true);
        try {
            fetch(process.env.EXPO_PUBLIC_SERVER_IP+"/getUserPosts", {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'}, 
                body: JSON.stringify({"userID": id})
                }
            )
            .then(response => response.json())
            .then(postss => {
                setPosts(postss);
                setLoading(false);
                }
            )
        } catch (e) {console.log(e)}
        setRefreshing(false);
    }


    const Listing = ({ photo, title,price, index}) => {
        return (
            <TouchableOpacity style={styles.listingContainer} onPress = {()=>openDetails(index)}>
                <Image source={{uri: 'data:image/jpeg;base64,' + photo}} style={{flex: 4, width: '100%', height: '100%'}}/>
                <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>
                    <Text style={{flex: 2}}>{title}</Text>
                    <Text style={{flex: 1, fontWeight: 'bold', textAlign:'left'}}>${price}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const openDetails = (index) => {
        const post = posts[index];
        setPhoto(post.img);
        setName(post.title);
        setPrice(post.price);
        setDescription(post.info);  
        setDetailsVisible(true);

    };
    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };
    const closeDetails = () => {
        setDetailsVisible(false);
    };



    return (
        
        <View style={{flex:1}}>
           <AddClothingScreen visible={isPopupVisible} onRequestClose={togglePopup} id={id} />
            <ScrollView 
                contentContainerStyle={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {posts.map((p, index) => <Listing key={index} index={index} title={p.title} price={p.price} photo={p.img} />)}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={togglePopup}>
                <Text style={{textAlign:'center', fontWeight:'bold'}}>Add Post</Text>
            </TouchableOpacity> 
          
            <ItemDetails
                isOpen={isDetailsVisible}
                onClose={closeDetails}
                photo={photo}
                name={itemName}
                price={price}
                description={description}
                tags={tags}
                isAdmin={isAdmin}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    addContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    button: {
        height: 60,
        borderRadius: 5, // Makes it round
        backgroundColor: 'lightblue', // Customize the button color
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
    
        fontSize: 35,
        color: 'white',
        lineHeight: 40
    },
    container: {
        flex:1,
        backgroundColor: '#e0e0e0',
        padding: 10,
    },
    scrollView: {
        alignItems: 'stretch',
        flex: 8,
    },
    row: {
        flex: 1,
        //marginBottom: 10,
        flexDirection: "row",
        
    },
    listingContainer: {
        margin: 5,
        flex: 1,
        height: 200,
        maxHeight: 200,
        backgroundColor: '#e8e8e8',
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 4,
    }
})
  

