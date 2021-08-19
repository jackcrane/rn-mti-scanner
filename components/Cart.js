import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Touchable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, LogBox } from 'react-native';
import Styles from "../components/Style";
import SubmitBtn from './SubmitBtn';
import * as FileSystem from 'expo-file-system';

const Cart = (props) => {

  const [cart, setCart] = useState(props.cart);

  const [input__upc, setInput__upc] = useState(props.route.predefined_sku ? props.route.predefined_sku : '');
  const [input__qty, setInput__qty] = useState();

  const [ServiceRep, setServiceRep] = useState({email:'mcrane@myerstiresupply.com'})

  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']);
  });

  const removeItemFromCart = (idx) => {
    Alert.alert(
      "Are you sure?", 
      'You are about to delete this entry. This cannot be undone',
      [
        {
          text: 'No I want to keep this item.',
          onPress: () => {}
        },
        {
          text: 'I\'m sure. Delete it!',
          onPress: () => {
            let newcart = []
            cart.forEach((e, i) => {
              if(i != idx) {
                newcart.push(e);
              }
            })
            setCart(newcart)
            props.setCart(newcart)
          },
          style:'destructive'
        },
      ]
    )
    // This is the worst imaginable way to do this but i cant think of array functions rn
    
  }

  const addItemToCart = (upc, title, qty) => {
    setCart(cart.concat({
      upc:upc,
      title:title,
      qty:qty
    }));
    props.setCart(cart.concat({
      upc:upc,
      title:title,
      qty,qty
    }));
  }

  return (
    <View>
      <View style={Styles.addSheet}>
        <TextInput
          style={{...Styles.input, ...Styles.code, ...{width:'50%',marginRight:2.5, paddingRight:2.5}}}
          placeholder="Enter a UPC"
          keyboardType="number-pad"
          autoFocus={props.openInput ? true : false}
          onChangeText={(e) => setInput__upc(e)}
          clearButtonMode="while-editing"
          defaultValue={props.route.predefined_sku ? props.route.predefined_sku : ''}
        />
        <TextInput
          style={{...Styles.input, ...Styles.code, ...{width:'20%',marginRight:2.5, paddingRight:2.5}}}
          placeholder="Qty"
          keyboardType="number-pad"
          autoFocus={props.route.openQtyInput ? true : false}
          clearButtonMode="while-editing"
          onChangeText={(e) => setInput__qty(e)}
        />
        <TouchableOpacity 
          style={{...Styles.addBtn, ...{marginLeft:2.5, paddingLeft:2.5}}}
          onPress={() => addItemToCart(input__upc, '', input__qty)}
        >
          <Text style={Styles.addBtn__text}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={{...Styles.tr, ...{flex:0,borderBottomWidth:4}}}>
        <Text style={Styles.td}>UPC</Text>
        <Text style={Styles.td}>Title</Text>
        <Text style={Styles.td}>Qty</Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={Styles.cartSV}>
          {
            cart.length == 0 ? <Text style={{...Styles.tr, ...Styles.td, ...{width:'100%'}}}>Your cart is empty</Text> : (
              cart.map((data, iterator) => (
                <TouchableWithoutFeedback key={iterator} onPress={() => {}}>
                  <View key={iterator} style={Styles.tr}>
                    <Text style={{...Styles.code, ...Styles.td}}>{data.upc ? data.upc : 'No UPC'}</Text>
                    <Text style={{...Styles.td}}>{data.title ? data.title : 'No Title'}</Text>
                    <Text style={{...Styles.code, ...Styles.td}}>{data.qty ? data.qty : 'No Qty'}</Text>
                    <TouchableOpacity onPress={() => {removeItemFromCart(iterator)}} style={{...Styles.td, ...{textAlign:'right'}}}>
                      <Text style={{...Styles.td, ...{textAlign:'right'}}}>❌</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              ))
            )
          }
        </ScrollView>
      </TouchableWithoutFeedback>
      <View style={{margin:10}}>
        {/* <TouchableOpacity onPress={() => {Linking.openURL(`mailto:${ServiceRep.Email}`)}} style={{...Styles.button, ...{width:'100%'}}}>
          <Text style={Styles.buttonText}>Submit Order</Text>
        </TouchableOpacity> */}
        <SubmitBtn cart={cart} />
      </View>
    </View>
  )
}

export default Cart;