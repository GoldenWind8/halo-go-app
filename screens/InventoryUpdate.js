import {StatusBar} from "react-native";
import {ScrollView, TextInput, TouchableOpacity} from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";
import {useState} from "react";

function View(props) {
    return null;
}

const InventoryUpdate = ({route, navigation}) => {
    const {productID, isEditing} = route.params;

    const [product, setProduct] = useState(isEditing ? getProduct(productID) : {});

    const updateField = (field, value) => {
        setProduct({
            ...product,
            [field]: value,
        });
    };

    const handleSubmit = () => {
        if (isEditing) {
            updateProductInDB(product);  // function to update the product in the database
        } else {
            addProductToDB(product);  // function to add the new product to the database
        }

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLOURS.backgroundLight} barStyle="dark-content"/>
            <ScrollView>
                <View style={styles.infoContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack('Home')}>
                            <Entypo name="chevron-left" style={styles.backButton} />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Product Name"
                        value={product.productName}
                        onChangeText={(text) => updateField('productName', text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Product Description"
                        value={product.description}
                        onChangeText={(text) => updateField('description', text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Product Price"
                        value={product.productPrice}
                        onChangeText={(text) => updateField('productPrice', text)}
                    />

                    <TouchableOpacity onPress={handleSubmit}>
                        <Text>{isEditing ? 'Update Product' : 'Add Product'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default InventoryUpdate;
