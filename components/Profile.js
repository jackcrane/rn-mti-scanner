import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Touchable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message';
import Styles from "./Style";

const Profiles = (props) => {

  const pre_prof = props.route.params?.pre_prof;
  const prof_iterator = props.route.params?.iterator;

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

  useEffect(() => {
    if(typeof(pre_prof) !== 'undefined') {
      setInput__cname(pre_prof.customer_name);
      setInput__ccompany(pre_prof.customer_company);
      setInput__cemail(pre_prof.customer_email);
      setInput__cnumber(pre_prof.customer_number);
      setInput__cphonenum(pre_prof.customer_phonenum);
      setInput__remail(pre_prof.rep_email);
    }
  }, [pre_prof])

  let [ companyRequestTimeout, setCompanyRequestTimeout ] = useState();
  const requestCompanyFromMTS = async (customer_number) => {
    Toast.hide();
    clearTimeout(companyRequestTimeout);
    setCompanyRequestTimeout(
      setTimeout(async () => {
        try {
          dataApiResponse = await fetch(`https://mts-api-2a3on.ondigitalocean.app/v1/cus/${typeof(customer_number) == 'undefined' ? 'NO_PROD' : customer_number}`);
          dataApiJSON = await dataApiResponse.json();
        } catch (error) {
          // Ignore
        }
        if(dataApiJSON.error && dataApiJSON.error === 'No customer found with matching customer number') {
          Toast.show({
            text1: 'Customer not in database',
            text2: 'You can still continue, but autofill is unavailible',
            position: 'bottom',
            type: 'error'
          })
        } else {
          Toast.hide();
          Toast.show({
            text1: 'Customer found',
            position: 'bottom'
          })
          // console.log(dataApiJSON)
          console.log(dataApiJSON[0].customer_name)
          setInput__ccompany(dataApiJSON[0].customer_name)
        }
      }, 500)
    )
  }

  const saveProf = async (message = 'Customer added', profiles = profiles) => {
    if([
      input__cname == '',
      input__cnumber == '',
      input__ccompany == '',
      input__cphonenum == '',
      input__cemail == '',
      input__remail == '',
    ].some((e) => {return e})) {
      Toast.show({
        text1: 'There are missing fields',
        text2: 'Each field must be filled.',
        position: 'bottom',
        type: 'error'
      })
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

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: message,
      });
      props.nav.goBack()

    }
  }

  const removeProfile = async (idx) => {
    // props.route.params?.removeProfile(idx);
    
    let newprofiles = []
    profiles.forEach((e, i) => {
      if(i != idx) {
        newprofiles.push(e);
      }
    })
    await AsyncStorage.setItem('@profiles', JSON.stringify(newprofiles))
    setProfiles(newprofiles)
    saveProf('Customer updated', newprofiles)
  }

  return (
    <View>
      <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View>
            <View style={Styles.fieldset}>
              <Text style={{...Styles.fieldlabel, marginBottom:0}}>Customer Number</Text>
              <TextInput keyboardType="numbers-and-punctuation" style={Styles.input} value={input__cnumber} placeholder='Customer Number' onChangeText={(e) => {setInput__cnumber(e); requestCompanyFromMTS(e)}} />
            </View>
            <View style={Styles.fieldset}>
              <Text style={{...Styles.fieldlabel, marginBottom:0}}>Customer Company</Text>
              <TextInput style={Styles.input} value={input__ccompany} placeholder='Customer Company' onChangeText={(e) => setInput__ccompany(e)} />
            </View>
            <View style={Styles.fieldset}>
              <Text style={{...Styles.fieldlabel, marginBottom:0}}>Contact Name</Text>
              <TextInput style={Styles.input} value={input__cname} placeholder='Customer Name' onChangeText={(e) => setInput__cname(e)} />
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
              <Text style={{...Styles.fieldlabel, marginBottom:0}}>Send order to email</Text>
              <TextInput keyboardType='email-address' style={Styles.input} value={input__remail} placeholder='Send order to email' onChangeText={(e) => setInput__remail(e)} />
            </View>

            <View style={{margin:10}}>
              {typeof(pre_prof) === 'undefined' ? (
                <TouchableOpacity onPress={() => {saveProf('Profile Saved', profiles)}} style={{...Styles.button, ...{width:'100%'}}}>
                  <Text style={Styles.buttonText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={async () => {removeProfile(prof_iterator);}} style={{...Styles.button, ...{width:'100%'}}}>
                  <Text style={Styles.buttonText}>Update</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          
        </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    </View>
  )
}

export default Profiles;