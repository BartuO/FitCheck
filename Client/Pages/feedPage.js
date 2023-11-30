import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator } from "react-native";
import React, {useState, useEffect} from "react";
import photoo from "../bigsteppers.jpg"



const Listing = ({ photo, title,price}) => {
    return (
        <View style={styles.listingContainer}>
            <Image source={photo} style={{flex: 4, width: '100%', height: '100%'}}/>
            <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>
                <Text style={{flex: 2}}>{title}</Text>
                <Text style={{flex: 1, fontWeight: 'bold', textAlign:'left'}}>${price}</Text>
            </View>
        </View>
    )
}

const Row = ({children}) => {
    
    return (<View style={styles.row} >{children}</View>);
}

export default function FeedPage() {
    
/* stuff for connecting to back end, not ready yet 
    [isLoading, setLoading] = useState(true);
    [posts, setPosts] = useState();

    useEffect(()=>{
        fetch("/posts").then(
            response => response.json()
        ).then(
            data => {
                setPosts(data);
                setLoading(false);
            }
        )
    },[]);
    while(isLoading) return (
        <View style={{justifyContent:"center", alignItems:"center"}}>
            <ActivityIndicator/>
        </View>
    );
 */
    return (
        <SafeAreaView style ={styles.container}>
            <ScrollView contentContainerStyle = {styles.scrollView}>
                <Row>
                    <Listing title="Big steppington ricks" price={10000} photo={photoo}/>
                    <Listing title="Big steppington ricks" price={5} photo={photoo}/>
                </Row>
                <Row>
                    <Listing title="Big steppington ricks" price={5} photo={photoo}/>
                    <Listing title="Big steppington ricks" price={5} photo={photoo}/>
                </Row>
                <Row>
                    <Listing title="Big steppington ricks" price={5} photo={photoo}/>
                    <Listing title="Big steppington ricks" price={5} photo={photoo}/>
                </Row>
            </ScrollView>
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