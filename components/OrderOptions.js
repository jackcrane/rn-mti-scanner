import React from 'react';
import {
  StatusBar, Text, TouchableOpacity, View
} from 'react-native';
import Styles from "../components/Style";

const OrderOptions = (props) => {

  return (
    <View style={Styles.container}>
      <StatusBar barStyle='dark-content' />
      <TouchableOpacity style={Styles.buttonLarge} onPress={() => props.nav.navigate('Cart', {openInput:true})}>
        <Text style={Styles.buttonTextLarge}>Manually Enter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={Styles.buttonLarge} onPress={() => props.nav.navigate('Scanner')}>
        <Text style={Styles.buttonTextLarge}>Scan</Text>
      </TouchableOpacity>
    </View>
  )
}

export default OrderOptions;


      
