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
    [tags, setTags] = useState(["cool", "awesome", "loveit", "wontsell"]);
// stuff for connecting to back end, not ready yet 
    [isLoading, setLoading] = useState(true);
    [posts, setPosts] = useState([]);
    [isAdmin, setAdmin] = useState(false);
    [rows, setRows] = useState([]);
/* 
    const generateRows = (posts) => {
        console.log(posts.length);
        let rowarr = [];
        const numRows = Math.ceil(posts.length / 2);
        for (let i = 0; i < numRows ; i++){
            if ( i === numRows - 1 ) {
                if (posts.length % 2 === 1) {
                    const post = posts[i * 2]
                    rowarr.push(
                    <Row key={i}>
                        <Listing title={post.title} price={post.price} photo={post.photo} />
                        <View style={{flex:1, margin: 5}}/>
                    </Row>
                    );
                }
            }
            else {
                const post1 = posts[i * 2];
                const post2 = posts[i * 2 + 1];
                rows.push(
                    <Row key={i}>
                        <Listing title={post1.title} price={post1.price} photo={post1.photo} />
                        <Listing title={post2.title} price={post2.price} photo={post2.photo} />
                    </Row>
                );

            }
        }
        setRows(rowarr);
    }
     */

    useEffect(()=>{
        try {
        fetch(process.env.EXPO_PUBLIC_SERVER_IP+"/getPosts")
            .then(response => response.json())
            .then(postss => {
                //posts is an array of json objects each representing a post

                //rows = generateRows(posts);
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

    const Row = ({children}) => {
    
        return (<View style={styles.row} >{children}</View>);
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

    // while(isLoading) return (
    //     <View style={{justifyContent:"center", alignItems:"center"}}>
    //         <ActivityIndicator/>
    //     </View>
    // );
 
    return (
        <SafeAreaView style ={styles.container}>
            <ScrollView contentContainerStyle = {styles.scrollView}>
                {/* <Row>
                    <Listing title={itemName} price={price} photo={photo}/>
                    <Listing title={itemName} price={price} photo={photo}/>
                </Row>
                <Row>
                    <Listing title={itemName} price={price} photo={photo}/>
                    <Listing title={itemName} price={price} photo={photo}/>
                </Row>
                <Row>
                    <Listing title={itemName} price={price} photo={photoo}/>
                    <View style={{flex:1, margin: 5}}></View>
                </Row>
                <Image source={{uri: 'data:image/jpeg;base64,' + photo}} style={{height: 100, width: 100}}/> */}
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