import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import Styles from "../components/Style";

const Info = (props) => {
  const { type, data } = props.route.params;

  return (
    <View style={Styles.paddedContainer}>
      <StatusBar barStyle='dark-content' />
      <ScrollView>
        <Text style={Styles.subtitle}>UPC</Text>
        <Text style={{...Styles.title, ...Styles.code}}>{ data }</Text>

        <Text style={Styles.subtitle}>Title</Text>
        <Text style={Styles.title}>{ data }</Text>

        <Text style={Styles.subtitle}>Description</Text>
        <Text style={Styles.description}>{ data }</Text>
        <View style={{height:50}}></View>
        <TouchableOpacity style={{...Styles.button, ...{width:'100%'}}} onPress={() => props.nav.replace('Cart', {
          predefined_sku:data,
          openQtyInput:true
        })}>
          <Text style={Styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Info;


      
