import {auth, db} from "../firebase-config";
import { collection, getDocs, getDoc, addDoc, updateDoc, doc } from "firebase/firestore";

export async function getProducts() {
    const products = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        let product = doc.data();
        product.id = doc.id;
        products.push(product);
    });
    return products;
}

export async function getProduct(id) {
    console.log(id)
    const productDoc = await getDoc(doc(db, "products", id));
    if (productDoc.exists()) {
        let product = productDoc.data();
        product.id = productDoc.id;
        console.log(JSON.stringify(product))
        return product;
    } else {
        console.log("No such product!");
    }
}

export async function addProduct(product) {
    const productRef = await addDoc(collection(db, "products"), product);
    console.log(`Product added with ID: ${productRef.id}`);
}

export async function updateProduct(updatedProduct) {
    const productRef = doc(db, "products", updatedProduct.id);
    await updateDoc(productRef, updatedProduct);
    console.log(`Product with ID ${updatedProduct.id} updated.`);
}
