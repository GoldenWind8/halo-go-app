import {Alert, Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import React, {useEffect, useState} from "react";
import {COLOURS, Items} from "../components/database/Database";
import {addProduct, getProduct, updateProduct, deleteProduct} from "../handler/products-handler";
import InventoryInput from "../components/InventoryInput";


const InventoryUpdate = ({route, navigation}) => {
    const { height: windowHeight } = Dimensions.get('window'); // window always returns height as if the application can draw under StatusBar
    const statusBarHeight = StatusBar.currentHeight || 0;
    const rootViewHeight = windowHeight - (statusBarHeight);

    const {productID, isEditing} = route.params;
    const [product, setProduct] = useState(Items[0]);//TODO replace with empty product,  deletion, imgage

    const updateField = (field, value) => {
        setProduct({
            ...product,
            [field]: value,
        });
    };
    const width = Dimensions.get('window').width;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if(isEditing){
                getDataFromDB();
            }
        });

        return unsubscribe;
    }, [navigation]);

    //get product data by productID

    const getDataFromDB = async () => {
        const product = await getProduct(productID);
        await setProduct(product);
        return;
    };

    function updateProductInDB(product) {
        updateProduct(product);
    }

    function addProductToDB(product) {
        addProduct(product);
    }

    const handleSubmit = () => {
        if (isEditing) {
            updateProductInDB(product);  // function to update the product in the database
        } else {
            addProductToDB(product);  // function to add the new product to the database
        }

        navigation.goBack();
    };

    const deleteProductFromDB = (id) => {
        Alert.alert(
            "Delete product",
            "Are you sure you want to delete this product?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Deletion cancelled"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => {
                    deleteProduct(id).then(r => navigation.goBack());

                } }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={[styles.container, {minHeight: rootViewHeight}]}>
            <StatusBar backgroundColor={COLOURS.backgroundLight} barStyle="dark-content"/>
                <View style={styles.infoContainer}>
                    <View style={styles.chevron}>
                        <TouchableOpacity onPress={() => navigation.goBack('Inventory')}>
                            <Entypo name="chevron-left" style={styles.backButton} />
                        </TouchableOpacity>

                    </View>
                    <View
                        style={{
                            width: width,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom:10,
                        }}>
                        <Image
                            source={{uri: product.imgUrl}}
                            style={{
                                width: 150,
                                height: 150,
                                resizeMode: 'contain',
                                borderRadius: 25,
                            }}
                        />
                    </View>
                </View>
                <View style={{paddingHorizontal: 16, backgroundColor:COLOURS.backgroundLight,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.header}>Name</Text>
                        <InventoryInput onChangeText={text => updateField("name", text)} value={product.name}/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.header}>Price</Text>
                        <InventoryInput onChangeText={text => updateField("price", text)} value={""+product.price}/>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.header}>Stock</Text>
                        <InventoryInput onChangeText={text => updateField("stock", text)} value={""+product.stock} />
                    </View>
                </View>
            <View style={styles.addToCartButton}>
                {isEditing && (
                    <TouchableOpacity
                        onPress={() => deleteProductFromDB(product.id)}
                        style={styles.deleteButtonContainer}>
                        <Text style={styles.addToCartButtonText}>
                            {'Delete Product'}
                        </Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.addToCartButtonContainer}>
                    <Text style={styles.addToCartButtonText}>
                        {isEditing ? 'Update Product' : 'Add Product'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default InventoryUpdate;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
        flex:1,
    },
    infoContainer: {
        width: '100%',
        backgroundColor: COLOURS.backgroundLight,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingLeft: 16,
    },
    chevron: {
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingLeft: 16,
    },
    backButton: {
        fontSize: 18,
        color: COLOURS.backgroundDark,
        padding: 12,
        backgroundColor: COLOURS.white,
        borderRadius: 10,
    },
    productName: {
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 0.5,
        marginVertical: 4,
        color: COLOURS.black,
        maxWidth: '84%',
    },
    linkIcon: {
        fontSize: 24,
        color: COLOURS.blue,
        backgroundColor: COLOURS.blue + 10,
        padding: 8,
        borderRadius: 100,
    },
    productDescription: {
        fontSize: 12,
        color: COLOURS.black,
        fontWeight: '400',
        letterSpacing: 1,
        opacity: 0.5,
        lineHeight: 20,
        maxWidth: '85%',
        maxHeight: 44,
        marginBottom: 18,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: '500',
        maxWidth: '85%',
        color: COLOURS.black,
        marginBottom: 4,
    },
    addToCartButton: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'column',
        height: '20%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartButtonContainer: {
        margin: 10,
        width: '86%',
        flex:1,
        maxHeight: '40%',
        backgroundColor: COLOURS.blue,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartButtonText: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLOURS.white,
        textTransform: 'uppercase',
    },
    deleteButtonText: {
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
    },
    deleteButtonContainer: {
        margin: 10,
        width: '86%',
        flex: 1,
        backgroundColor: COLOURS.red,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
