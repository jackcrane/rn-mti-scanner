import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Touchable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, YellowBox } from 'react-native';
import Styles from "../components/Style";

const Cart = (props) => {

  const [cart, setCart] = useState(props.cart);

  // YellowBox.ignoreWarnings([
  //   'Non-serializable values were found in the navigation state',
  // ]);

  useEffect(() => {
  });

  return (
    <View>
      <TouchableOpacity onPress={() => {
        setCart(cart.concat({
          upc:'asdf',
          title:'title'
        }));
        props.setCart(cart.concat({
          upc:'asdf',
          title:'title'
        }))
      }}>
        <Text>Populate random data to cart</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          
          <ScrollView style={Styles.cartSV}>
            {
              cart.length == 0 ? <Text style={{...Styles.tr, ...Styles.td, ...{width:'100%'}}}>Your cart is empty</Text> : (
                cart.map((data, iterator) => (
                  <View key={iterator} style={Styles.tr}>
                    <Text style={{...Styles.code, ...Styles.td}}>{data.upc ? data.upc : 'No UPC Supplied'}</Text>
                    <Text style={Styles.td}>{data.title ? data.title : 'No Title Supplied'}</Text>
                  </View>
                ))
              )
            }
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Cart;