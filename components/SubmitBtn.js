import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import Styles from "../components/Style";
import uuid from 'react-native-uuid';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';

const SubmitBtn = (props) => {
  const convertToCSV = (arr) => {
    const array = [Object.keys(arr[0])].concat(arr)

    return array.map(it => {
      return Object.values(it).toString()
    }).join('\n')
  }

  const processData = () => {
    // Create a CSV File:
    console.log(FileSystem.writeAsStringAsync('order.csv', convertToCSV(props.cart)))

    MailComposer.composeAsync({
      recipients:['3jbc22@gmail.com'],
      subject:`Order ID ${uuid.v4()}`,
      body:`

      `,
      isHtml:false,
    })
  }

  return (
    <TouchableOpacity onPress={() => {processData()}} style={{...Styles.button, ...{width:'100%'}}}>
      <Text style={Styles.buttonText}>{JSON.stringify(props.cart)}</Text>
    </TouchableOpacity>
  )
}

export default SubmitBtn;