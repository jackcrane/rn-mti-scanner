import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Touchable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Styles from "./Style";

const Profiles = (props) => {

  const { pre_prof } = props.route.params;

  const [ profiles, setProfiles ] = useState([]);

  const [ input__cname, setInput__cname ] = useState('');
  const [ input__cnumber, setInput__cnumber ] = useState();
  const [ input__ccompany, setInput__ccompany ] = useState('');
  const [ input__cphonenum, setInput__cphonenum ] = useState('');
  const [ input__cemail, setInput__cemail ] = useState('');
  const [ input__remail, setInput__remail ] = useState('');

  useEffect(() => {
    (async () => {
      let profiles = await AsyncStorage.getItem('@profiles');
      setProfiles(JSON.parse(profiles));
    })();
  }, [])

  const saveProf = async () => {
    if([
      input__cname == '',
      input__cnumber == '',
      input__ccompany == '',
      input__cphonenum == '',
      input__cemail == '',
      input__remail == '',
    ].some((e) => {return e})) {
      alert('There are missing fields. Each field must be filled').
      return;
    } else {

      setProfiles(profiles.concat({
        customer_name:input__cname,
        customer_number:input__cnumber,
        customer_company:input__ccompany,
        customer_phonenum:input__cphonenum,
        customer_email:input__cemail,
        rep_email:input__remail
      }));
      
      await AsyncStorage.setItem('@profiles', JSON.stringify(
        profiles.concat({
          customer_name:input__cname,
          customer_number:input__cnumber,
          customer_company:input__ccompany,
          customer_phonenum:input__cphonenum,
          customer_email:input__cemail,
          rep_email:input__remail
        })
      ))

      Alert.alert(
        'Customer added',
        '',
        [{
          text:"OK",
          onPress: () => props.nav.goBack()
        }]
      )
    }
  }

  return (
    <View>
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View>
            <Text>
              {pre_prof}
            </Text>
            <View style={Styles.fieldset}>
              <Text style={{...Styles.fieldlabel, marginBottom:0}}>Customer Name</Text>
              <TextInput style={Styles.input} value={input__cname} placeholder='Customer Name' onChangeText={(e) => setInput__cname(e)} />
            </View>
            <View style={Styles.fieldset}>
              <Text style={{...Styles.fieldlabel, marginBottom:0}}>Customer Number</Text>
              <TextInput keyboardType='number-pad' style={Styles.input} value={input__cnumber} placeholder='Customer Number' onChangeText={(e) => setInput__cnumber(e)} />
            </View>
            <View style={Styles.fieldset}>
              <Text style={{...Styles.fieldlabel, marginBottom:0}}>Customer Company</Text>
              <TextInput style={Styles.input} value={input__ccompany} placeholder='Customer Company' onChangeText={(e) => setInput__ccompany(e)} />
            </View>
            <View style={Styles.fieldset}>
              <Text style={{...Styles.fieldlabel, marginBottom:0}}>Customer Phone Number</Text>
              <TextInput keyboardType='phone-pad' style={Styles.input} value={input__cphonenum} placeholder='Customer Phone Number' onChangeText={(e) => setInput__cphonenum(e)} />
            </View>
            <View style={Styles.fieldset}>
              <Text style={{...Styles.fieldlabel, marginBottom:0}}>Customer Email</Text>
              <TextInput keyboardType='email-address' style={Styles.input} value={input__cemail} placeholder='Customer Email' onChangeText={(e) => setInput__cemail(e)} />
            </View>
            <View style={Styles.fieldset}>
              <Text style={{...Styles.fieldlabel, marginBottom:0}}>MTS Rep Email</Text>
              <TextInput keyboardType='email-address' style={Styles.input} value={input__remail} placeholder='MTS Rep Email' onChangeText={(e) => setInput__remail(e)} />
            </View>

            <View style={{margin:10}}>
              <TouchableOpacity onPress={() => {saveProf()}} style={{...Styles.button, ...{width:'100%'}}}>
                <Text style={Styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
        
    </View>
  )
}

export default Profiles;