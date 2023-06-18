import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, StatusBar, Text, TouchableOpacity, View, Image, FlatList} from 'react-native';
import {COLOURS, Items} from '../components/database/Database';
import Entypo from 'react-native-vector-icons/Entypo';

const Inventory = ({navigation}) => {
    const [products, setProducts] = useState({});


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        });

        return unsubscribe;
    }, [navigation]);

    //get product data by productID

    //get data from DB
    const getDataFromDB = () => {
        let productList = [];
        for (let index = 0; index < Items.length; index++) {

            productList.push(Items[index]);
        }

        setProducts(productList);
    };

    const renderItem = ({item}) => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('InventoryUpdate', { productID: item.id, isEditing: true })
            }
        >
            <View style={styles.itemContainer}>
                <Image source={item.productImage} style={styles.itemImage} />
                <View>
                    <Text style={styles.itemName}>{item.productName}</Text>
                    <Text style={styles.itemPrice}>R {item.productPrice}.00</Text>
                    <Text style={styles.itemCount}>Stock left: 10</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name="chevron-left" size={24} color="black" style={styles.backButton}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Inventory</Text>
            </View>
            <StatusBar backgroundColor={COLOURS.backgroundLight} barStyle="dark-content" />
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity
                style={styles.newProductButton}
                onPress={() => navigation.navigate('NewProduct')}
            >
                <Text style={styles.newProductButtonText}>Add new product</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Inventory;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLOURS.backgroundLight,
        height: 80,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingLeft: 16,

    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingRight:20
    },

    backButton: {
        fontSize: 18,
        color: COLOURS.backgroundDark,
        padding: 12,
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 10,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: COLOURS.black,
    },
    itemPrice: {
        fontSize: 14,
        color: COLOURS.black,
        opacity: 0.7,
    },
    itemCount: {
        fontSize: 14,
        color: COLOURS.black,
        opacity: 0.7,
    },
    newProductButton: {
        margin: 16,
        height: 40,
        backgroundColor: COLOURS.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    newProductButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLOURS.white,
    },
});
