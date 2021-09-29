import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, StatusBar, ScrollView, Touchable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, LogBox } from 'react-native';
import Styles from "../components/Style";
import SubmitBtn from './SubmitBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as FileSystem from 'expo-file-system';

const Cart = (props) => {

  const [cart, setCart] = useState([]);

  const refreshCartFromAsyncStorage = async () => {
    let lcart = await AsyncStorage.getItem('@cart');
    if(lcart == null) {
      AsyncStorage.setItem('@cart', JSON.stringify([]))
      setCart([])
    } else {
      setCart(JSON.parse(lcart))
    }
  }

  useEffect(() => {
    refreshCartFromAsyncStorage();
    console.log(cart)
  }, [])

  const [input__upc, setInput__upc] = useState(props.route.predefined_sku ? props.route.predefined_sku : '');
  const [input__qty, setInput__qty] = useState();

  const [assignedUpcValue, setAssignedUpcValue] = useState(props.route.predefined_sku ? props.route.predefined_sku : '');
  const [assignedQtyValue, setAssignedQtyValue] = useState();

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
            AsyncStorage.setItem('@cart', JSON.stringify(newcart))
          },
          style:'destructive'
        },
      ]
    )
    refreshCartFromAsyncStorage();
    // This is the worst imaginable way to do this but i cant think of array functions rn
    
  }

  const addItemToCart = async (upc, qty) => {
    Keyboard.dismiss();
    console.log(`https://mts-api-2a3on.ondigitalocean.app/v1/num/${typeof(upc) == 'undefined' ? 'NO_PROD' : upc}`)
    const dataApiResponse = await fetch(`https://mts-api-2a3on.ondigitalocean.app/v1/num/${typeof(upc) == 'undefined' ? 'NO_PROD' : upc}`);
    const dataApiJSON = await dataApiResponse.json();
    console.log(dataApiJSON);
    if(dataApiJSON.error == undefined) {
      const title = dataApiJSON[0].desc_line_1;
      const supplier = dataApiJSON[0].supplier_name;

      setInput__qty('');
      setInput__upc('');

      setCart(cart.concat({
        upc:upc,
        title:title,
        supplier:supplier,
        qty:qty
      }));
      await AsyncStorage.setItem('@cart', JSON.stringify(cart.concat({
        upc:upc,
        title:title,
        supplier:supplier,
        qty:qty
      })));
    } else {
      Alert.alert(
        'Unrecognized product code',
        'We do not have anything matching that product code in our database. Would you like to add it to your cart anyway?',
      [
        {
          text: 'Yes, add it to my cart',
          onPress: async () => {
            AsyncStorage.setItem('@cart', JSON.stringify(cart.concat({
              upc:upc,
              qty:qty
            })));
            setCart(cart.concat({
              upc:upc,
              qty:qty
            }));
            setInput__qty('');
            setInput__upc('');
          }
        },
        {
          text: 'No, do not add it to my cart',
          onPress: () => {}
        }
      ])
    }
    refreshCartFromAsyncStorage();
  }

  return (
    <View style={{maxHeight:(useWindowDimensions().height < 680 ? '70%' : '88%')}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={Styles.addSheet}>
            <TextInput
              style={{...Styles.input, ...Styles.code, ...{width:'50%',marginRight:'1%', paddingRight:'1%'}}}
              placeholder="Enter a SKU"
              autoFocus={props.openInput ? true : false}
              onChangeText={(e) => setInput__upc(e)}
              clearButtonMode="while-editing"
              defaultValue={props.route.predefined_sku ? props.route.predefined_sku : ''}
              value={input__upc}
            />
            <TextInput
              style={{...Styles.input, ...Styles.code, ...{width:'20%',marginRight:'1%', paddingRight:'1%'}}}
              placeholder="Qty"
              keyboardType="number-pad"
              autoFocus={props.route.openQtyInput ? true : false}
              onChangeText={(e) => setInput__qty(e)}
              value={input__qty}
            />
            <TouchableOpacity 
              style={{...Styles.addBtn, ...{marginRight:'1%', paddingLeft:'1%'}}}
              onPress={() => addItemToCart(input__upc, input__qty)}
            >
              <Text style={Styles.addBtn__text}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={{...Styles.tr, ...{flex:0,borderBottomWidth:4}}}>
            <Text style={Styles.td}>UPC</Text>
            <Text style={Styles.td}>Title</Text>
            <Text style={Styles.td}>Qty</Text>
          </View>
          
          <KeyboardAwareScrollView style={Styles.cartSV}>
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
          </KeyboardAwareScrollView>
          <View style={{margin:10}}>
            <TouchableOpacity onPress={() => {props.nav.navigate('Scanner')}} style={{...Styles.button, ...{width:'100%'}}}>
              <Text style={Styles.buttonText}>Back to scanner</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              Alert.alert(
                'Empty Cart',
                'Do you want to empty your cart?',
                [
                  {
                    text: 'Yep! I\'m done with this cart',
                    onPress: async () => {
                      await AsyncStorage.setItem('@cart', JSON.stringify([]));
                      refreshCartFromAsyncStorage()
                    },
                    style: 'destructive'
                  },
                  {
                    text: 'I want to keep this cart',
                    onPress: () => {},
                    style: 'default'
                  },
                ],
                { cancelable: false }
              );
            }} style={{...Styles.button, ...{width:'100%'}}}>
              <Text style={Styles.buttonText}>Empty cart</Text>
            </TouchableOpacity>
            <SubmitBtn cart={cart} nav={props.nav} triggerNewCart={() => refreshCartFromAsyncStorage()} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Cart;