import React, {useEffect, useState} from 'react';
import {StyleSheet, Linking, Text, TouchableOpacity, View} from "react-native";
import {COLOURS} from "./components/database/Database";

function Deeplink({amount}) {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", "KzI3Njc5NzY1NTY0LjVhN2I3NmIyLTBkNTgtNGY4Mi1hODk2LWM4MzhjYWFjMTJmYg==");
    myHeaders.append("Content-Type", "application/json");

    const [url, setUrl] = useState("google.com");

    const raw = JSON.stringify({
        "amount": amount,
        "merchantId": 597,
        "paymentReference": "qwerty",
        "currencyCode": "ZAR",
        "timestamp": "Wed Oct 19 2022 15:41:40 GMT+0300",
        "isConsumerApp": true,
        "image": {
            "required": false
        }
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

   /* useEffect(() => {
        fetch("https://kernelserver.qa.haloplus.io/consumer/qrCode", requestOptions)
            .then(response => response.text())
            .then(result => {
                const deepLink = JSON.parse(result).url;
                setUrl(deepLink);
                console.log("Hi"+deepLink);
            })
            .catch(error => console.log('error', error));
    }, []);*/

    const handlePress = () => {

        fetch("https://kernelserver.qa.haloplus.io/consumer/qrCode", requestOptions)
            .then(response => response.text())
            .then(result => {
                const deepLink = JSON.parse(result).url;
                console.log(deepLink + " SUCCESS")
                Linking.openURL(deepLink);
            })
            .catch(error => console.log('error', error));
    };

    return (
            <View style={styles.addToCartButton}>
                <TouchableOpacity
                    onPress={handlePress}
                    style={styles.addToCartButtonContainer}>
                    <Text style={styles.addToCartButtonText}>
                        Pay With Halo.Link
                    </Text>
                </TouchableOpacity>
            </View>
    );
}

const styles = StyleSheet.create({
    addToCartButton: {
        position: 'absolute',
        bottom: 10,
        height: '8%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartButtonContainer: {
        width: '86%',
        height: '90%',
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
})

export default Deeplink;
