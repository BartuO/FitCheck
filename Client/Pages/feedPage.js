import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import photoo from "../bigsteppers.jpg"
import { TabRouter } from "@react-navigation/routers";
import { useNavigation } from '@react-navigation/native';
import ItemDetails from "./itemDetails";


export default function FeedPage({route}) {

    const {params} = route;
    const {id} = params;

    const [isDetailsVisible, setDetailsVisible] = useState(false);
    
    [photo, setPhoto] = useState(photoo);
    [itemName, setName] = useState("Jacket");
    [price, setPrice] = useState("0.987");
    [description, setDescription] = useState("HELO HELLO THIS IS HELLO HELLO IS DESCRIPTION I AM HELLO THIS ITEM IS HELLO");
    [isLoading, setLoading] = useState(true);
    [posts, setPosts] = useState([]);
    [tags, setTags] = useState(["cool", "awesome", "loveit", "wontsell"]);
    [isAdmin, setAdmin] = useState(false);
 
    useEffect(()=>{
        try {
        fetch(process.env.EXPO_PUBLIC_SERVER_IP+"/getPosts")
            .then(response => response.json())
            .then(postss => {
                setPosts(postss);
                setLoading(false);
                }
            )
        } catch (e) {console.log(e)}
        },[]
    );

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

    const closeDetails = () => {
        setDetailsVisible(false);
    };

    while(isLoading) return (
        <View style={{justifyContent:"center", alignItems:"center"}}>
         <ActivityIndicator/>
       </View>
    );
 
    return (
        <SafeAreaView style ={styles.container}>
            <ScrollView contentContainerStyle = {styles.scrollView}>
                {posts.map((p, index) => <Listing key={index} index={index} title={p.title} price={p.price} photo={p.img}/>)}
            </ScrollView>
            <ItemDetails
                isOpen = {isDetailsVisible} 
                onClose={closeDetails} 
                photo = {photo} 
                name = {itemName}
                price = {price} 
                description={description}
                tags = {tags}
                isAdmin = {isAdmin}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex:1,
        backgroundColor: '#e0e0e0',
        padding: 10,
    },
    scrollView: {
        alignItems: 'stretch',
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
        backgroundColor: '#e8e8e8',
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 4,
    }
})