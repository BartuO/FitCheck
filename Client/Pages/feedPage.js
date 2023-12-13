import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import React, {useState, useEffect} from "react";
import photoo from "../bigsteppers.jpg"
import { TabRouter } from "@react-navigation/routers";


import { useNavigation } from '@react-navigation/native';

import photoo from "../bigsteppers.jpg";
import ItemDetails from "./itemDetails";








export default function FeedPage() {

    const Listing = ({ photo, title,price}) => {

        return (
            <TouchableOpacity style={styles.listingContainer} onPress = {openDetails}>
                <Image source={photo} style={{flex: 4, width: '100%', height: '100%'}}/>
                <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>
                    <Text style={{flex: 2}}>{title}</Text>
                    <Text style={{flex: 1, fontWeight: 'bold', textAlign:'left'}}>${price}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const Row = ({children}) => {
    
        return (<View style={styles.row} >{children}</View>);
    }

    const [isDetailsVisible, setDetailsVisible] = useState(false);

    const openDetails = () => {
        setDetailsVisible(true);
    };

    const closeDetails = () => {
        setDetailsVisible(false);
    };

    

    [photo, setPhoto] = useState(photoo);
    [itemName, setName] = useState("Jacket");
    [price, setPrice] = useState("0.987");
    [description, setDescription] = useState("HELO HELLO THIS IS HELLO HELLO IS DESCRIPTION I AM HELLO THIS ITEM IS HELLO");
    [tags, setTags] = useState(["cool", "awesome", "loveit", "wontsell"]);
// stuff for connecting to back end, not ready yet 
    [isLoading, setLoading] = useState(true);
    [posts, setPosts] = useState();
    [isAdmin, setAdmin] = useState(false);
    

    //console.log(photoo);
   
    // useEffect(()=>{
    // try {
    //     fetch("http://10.0.0.97:5000/getClothing")
    //         .then(response => response.json())
    //         .then(json => {setPhoto(json.img); setLoading(false);})
    //     } catch (e) {console.log(e)}
    // },[]);

    // while(isLoading) return (
    //     <View style={{justifyContent:"center", alignItems:"center"}}>
    //         <ActivityIndicator/>
    //     </View>
    // );
 
    return (
        <SafeAreaView style ={styles.container}>
            <ScrollView contentContainerStyle = {styles.scrollView}>
                <Row>
                    <Listing title={itemName} price={price} photo={photo}/>
                    <Listing title={itemName} price={price} photo={photo}/>
                </Row>
                <Row>
                    <Listing title={itemName} price={price} photo={photo}/>
                    <Listing title={itemName} price={price} photo={photo}/>
                </Row>
                <Row>
                    <Listing title={itemName} price={price} photo={photoo}/>
                    <Listing title={itemName} price={price} photo={photoo}/>
                </Row>
                <Image source={{uri: 'data:image/jpeg;base64,' + photo}} style={{height: 100, width: 100}}/>
            </ScrollView>
            <ItemDetails
                isOpen = {isDetailsVisible} 
                onClose={closeDetails} 
                photo = {photo} 
                name = {itemName}
                price = {price} 
                description={description}
                tags = {tags}
                isAdmin = {isAdmin}  ></ItemDetails>
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