import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Styles from "../components/Style";

const Info = (props) => {
  const { type, data } = props.route.params;

  const [ productInfo, setProductInfo ] = useState({});
  const [ productInfoReady, setProductInfoReady ] = useState(false);

  const [ errorMessage, setErrorMessage ] = useState('');

  useState(() => {
    console.log(type, data)
  }, [])

  useState(() => {
    fetch(`https://mts-api-2a3on.ondigitalocean.app/v1/num/${data}`)
      // .then(res => {console.log(res); return res})
      .then(r => r.json())
      .then(json => {
        if(json.error == undefined) {
          setProductInfo(json[0]);
          setProductInfoReady(true);
        } else {
          Alert.alert(
            'Error', 
            json.error,
            [
              {
                text: `Add ${data} to your cart anyway`,
                onPress: () => props.nav.replace('Cart', {
                  predefined_sku:data,
                  openQtyInput:true
                })
              },
              {
                text: 'Cancel',
                onPress: () => {},
                style: "cancel"
              }
            ]
          )
          setErrorMessage(json.error);
        }
      })
      .catch((err) => {
        alert(err)
        setErrorMessage(err)
      })
  }, [])

  return (
    <View style={Styles.paddedContainer}>
      <StatusBar barStyle='dark-content' />
      <ScrollView>
        {
          errorMessage == '' ? (
            !productInfoReady ? <ActivityIndicator /> : (
              <View>
                <Text style={Styles.subtitle}>Part Number</Text>
                <Text style={{...Styles.title, ...Styles.code}}>{ data }</Text>

                <Text style={Styles.subtitle}>Title</Text>
                <Text style={Styles.title}>{ productInfo.desc_line_1 }</Text>

                <Text style={Styles.subtitle}>Supplier</Text>
                <Text style={Styles.description}>{ productInfo.supplier_name }</Text>
                <View style={{height:50}}></View>
                <TouchableOpacity style={{...Styles.button, ...{width:'100%'}}} onPress={() => props.nav.replace('Cart', {
                  predefined_sku:data,
                  openQtyInput:true
                })}>
                  <Text style={Styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            )
          ) : <Text style={Styles.errorMessage}>Something went terribly wrong: {errorMessage}{'\n\n'}Product Code: {data}</Text>
        }
      </ScrollView>
    </View>
  )
}

export default Info;


      
