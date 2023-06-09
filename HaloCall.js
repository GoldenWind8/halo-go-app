import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import Deeplink from "./Deeplink";

export default function HaloCall() {
  var myHeaders = new Headers();
  const [intentResponse, setIntentResponse] = useState(null);
  myHeaders.append("x-api-key", "KzI3Njc5NzY1NTY0LjVhN2I3NmIyLTBkNTgtNGY4Mi1hODk2LWM4MzhjYWFjMTJmYg==");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "amount": 13,
    "merchantId": 597,
    "paymentReference": "qwerty",
    "currencyCode": "ZAR",
    "timestamp": "Wed Oct 19 2022 15:41:40 GMT+0300"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };


  useEffect(() => {
    fetch("https://kernelserver.qa.haloplus.io/consumer/intentTransaction", requestOptions)
        .then(response => response.text())
        .then((result) => {
          const parsedResponse = JSON.parse(result);
          setIntentResponse(parsedResponse);
        })
        .catch(error => console.log('error', error));

  }, []);

  return (
    <View style={styles.container}>
      <Text>[Remove] This is where the intent call is made</Text>
      {intentResponse && <Text>{intentResponse.id}</Text>}
      <Deeplink amount={20}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8ffb3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
