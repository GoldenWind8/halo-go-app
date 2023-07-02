import {auth, db} from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

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

export async function getProduct() {
    const products = [];
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        let product = doc.data();
        product.id = doc.id;
        products.push(product);
    });
    return products;
}


export async function addProduct() {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
}

export async function updateProduct() {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
}
