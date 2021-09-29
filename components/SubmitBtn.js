import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Alert } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import Styles from "../components/Style";
import uuid from 'react-native-uuid';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageAccessFramework } from 'expo-file-system';

const SubmitBtn = (props) => {

  let orderuuid = uuid.v4();
  let po;

  const convertToCSV = (arr, customer) => {
    let dtr = 'qty, sku, title, supplier,,,customer information, customer information';
    arr.forEach((row, iterator) => {
      if(iterator == 0) {
        dtr += `\n${row.qty.split(',').join("~")}, ${row.upc.split(',').join("~")}, ${row.title?.split(',').join("~")}, ${row.supplier?.split(',').join("~")},,,Customer Name, ${customer.customer_name.split(',').join("~")}`;
      } else if(iterator == 1) {
        dtr += `\n${row.qty.split(',').join("~")}, ${row.upc.split(',').join("~")}, ${row.title?.split(',').join("~")}, ${row.supplier?.split(',').join("~")},,,Customer Company, ${customer.customer_company.split(',').join("~")}`;
      } else if(iterator == 2) {
        dtr += `\n${row.qty.split(',').join("~")}, ${row.upc.split(',').join("~")}, ${row.title?.split(',').join("~")}, ${row.supplier?.split(',').join("~")},,,Customer Phone Number, ${customer.customer_phonenum.split(',').join("~")}`;
      } else if(iterator == 3) {
        dtr += `\n${row.qty.split(',').join("~")}, ${row.upc.split(',').join("~")}, ${row.title?.split(',').join("~")}, ${row.supplier?.split(',').join("~")},,,Customer Email, ${customer.customer_email.split(',').join("~")}`;
      } else if(iterator == 4) {
        dtr += `\n${row.qty.split(',').join("~")}, ${row.upc.split(',').join("~")}, ${row.title?.split(',').join("~")}, ${row.supplier?.split(',').join("~")},,,Customer Number, ${customer.customer_number.split(',').join("~")}`;
      } else if(iterator == 5) {
        dtr += `\n${row.qty.split(',').join("~")}, ${row.upc.split(',').join("~")}, ${row.title?.split(',').join("~")}, ${row.supplier?.split(',').join("~")},,,Order UUID, ${orderuuid.split(',').join("~")}`;
      } else if(iterator == 6) {
        dtr += `\n${row.qty.split(',').join("~")}, ${row.upc.split(',').join("~")}, ${row.title?.split(',').join("~")}, ${row.supplier?.split(',').join("~")},,,Purchase Order, ${po || 'No PO supplied'}`;
      } else {
        dtr += `\n${row.qty.split(',').join("~")}, ${row.upc.split(',').join("~")}, ${row.title?.split(',').join("~")}, ${row.supplier?.split(',').join("~")}`;
      }
    })

    return dtr;
  }

  const processData = async () => {

    po = await (() => {
      return new Promise((resolve, reject) => {
        if(props.requestPO) {
          Alert.prompt(
            'Purchase Order',
            '',
            [
              {
                text: "No PO",
                onPress: () => {resolve()},
                style: "destructive",
              },
              {
                text: "OK",
                onPress: (text) => {resolve(text); console.log(text)},
                style: "default",
              },
            ]
          )
        }
      })
    })()

    const profiles = JSON.parse(await AsyncStorage.getItem('@profiles'));
    let profOptions = [{
      text: 'Create a new customer',
      onPress: () => {props.nav.navigate('Profile')}
    }];
    profiles.forEach((e, i) => {
      profOptions.push({
        text: e.customer_name,
        onPress: () => {handleAlertPressed(i)},
      })
    })

    const handleAlertPressed = async (idx) => {
      console.log(profiles[idx]);
      // Create a CSV File:
      let cart_ = props.cart;
      while(cart_.length < 7) {
        cart_.push({
          upc:'',
          qty:'',
          title:'',
          supplier:''
        })
      }
      FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'order.csv', convertToCSV(cart_, profiles[idx]))
        .then(e => {
          console.log(e)
        })

      let email = await MailComposer.composeAsync({
        recipients:[profiles[idx].rep_email],
        subject:`MTS Order ID ${orderuuid}`,
        body:`
          Order number ${orderuuid}
          <br><br>
          ${typeof(po) === 'string' ? 'Purchase Order: ' + po : ''}
        `,
        attachments:[FileSystem.documentDirectory + 'order.csv'],
        isHtml:false,
      })

      if(email.status == 'sent') {
        // Alert.alert('You have sent an email to your MTS rep with your order. Would you like to empty your cart?',
        // [{
        //   text: 'Yep! I\'m done with this cart',
        //   onPress: () => {
        //     AsyncStorage.setItem('@cart', JSON.stringify([]))
        //   }
        // }]
        // )
        Alert.alert(
          'Cart sent to MTS',
          'Do you want to empty your cart?',
          [
            {
              text: 'Yep! I\'m done with this cart',
              onPress: async () => {
                await AsyncStorage.setItem('@cart', JSON.stringify([]));
                props.triggerNewCart()
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
      }

      console.log(email.status)
    }

    Alert.alert('Pick a customer', 'Who\'s profile should be used for this order?', [
      ...profOptions,
      { text: "Cancel", onPress: () => {}, style:"destructive" }
    ], { cancelable: true })
  }

  return (
    <TouchableOpacity onPress={() => {processData()}} style={{...Styles.button, ...{width:'100%'}}}>
      <Text style={Styles.buttonText}>Send to MTS</Text>
    </TouchableOpacity>
  )
}

export default SubmitBtn;