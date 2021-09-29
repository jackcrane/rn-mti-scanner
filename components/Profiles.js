import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Touchable, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Styles from "../components/Style";
import { useFocusEffect } from '@react-navigation/native';

const Profiles = (props) => {

  const [ profiles, setProfiles ] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        let profs = await AsyncStorage.getItem('@profiles');
        if(profs == null) {
          AsyncStorage.setItem('@profiles', JSON.stringify([]));
          setProfiles([]);
        } else {
          setProfiles(JSON.parse(profs));
        }
      })()
    }, [])
  );

  useEffect(() => {
    (async () => {
      let profs = await AsyncStorage.getItem('@profiles');
      if(profs == null) {
        AsyncStorage.setItem('@profiles', JSON.stringify([]));
        setProfiles([]);
      } else {
        setProfiles(JSON.parse(profs));
      }
    })()
  }, []);

  const removeProfile = (idx) => {
    Alert.alert(
      "Are you sure?", 
      'You are about to delete this profile. This cannot be undone',
      [
        {
          text: 'No I want to keep this profile.',
          onPress: () => {}
        },
        {
          text: 'I\'m sure. Delete it!',
          onPress: () => {
            let newprofiles = []
            profiles.forEach((e, i) => {
              if(i != idx) {
                newprofiles.push(e);
              }
            })
            setProfiles(newprofiles)
            AsyncStorage.setItem('@profiles', JSON.stringify(newprofiles))
          },
          style:'destructive'
        },
      ]
    )
    // This is the worst imaginable way to do this but i cant think of array functions rn
    
  }

  return (
    <View>
      <KeyboardAwareScrollView style={{...Styles.cartSV, minHeight:'85%'}}>
        {
          profiles.length == 0 ? <Text style={{...Styles.tr, ...Styles.td, ...{width:'100%'}}}>You do not have any profiles</Text> : (
            profiles.map((data, iterator) => (
              <TouchableWithoutFeedback key={iterator} onPress={() => {}}>
                <View key={iterator} style={Styles.tr}>
                  <Text style={{...Styles.code, ...Styles.td}}>{data.customer_name || 'Unknown'}</Text>
                  <Text style={{...Styles.code, ...Styles.td}}>{data.customer_company || 'Unknown'}</Text>
                  <Text style={{...Styles.code, ...Styles.td}}>{data.customer_email || 'Unknown'}</Text>

                  <TouchableOpacity onPress={() => {removeProfile(iterator)}} style={{...Styles.td, ...{textAlign:'right'}}}>
                    <Text style={{...Styles.td, ...{textAlign:'right'}}}>❌</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {removeProfile(iterator)}} style={{...Styles.td, ...{textAlign:'right'}}}>
                    <Text style={{...Styles.td, ...{textAlign:'right'}}}>✎</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            ))
          )
        }
        </KeyboardAwareScrollView>
        <View style={{margin:10}}>
          <TouchableOpacity onPress={() => {props.nav.navigate('Profile')}} style={{...Styles.button, ...{width:'100%'}}}>
            <Text style={Styles.buttonText}>Create a new profile</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default Profiles;