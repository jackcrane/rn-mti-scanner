import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Image, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import Styles from "../components/Style";

const HomeScreen = (props) => {

  (async() => {
    let lcart = await AsyncStorage.getItem('@cart');
    if(lcart == null) {
      AsyncStorage.setItem('@cart', JSON.stringify([]));
    }

    let lprofs = await AsyncStorage.getItem('@profiles');
    if(lprofs == null) {
      AsyncStorage.setItem('@profiles', JSON.stringify([]));
    }
    
  })();

  let pressCount = 0;
  let cto = null;
  const handleImagePress = () => {
    if(cto) clearTimeout(cto);
    if(pressCount == 6) {
      pressCount = 0;
      props.nav.navigate('Spec')
    } else {
      pressCount++;
      console.log(pressCount)
      cto = setTimeout(() => {
        pressCount = 0;
      }, 600)
    }
  }
    

  return (
    <View style={Styles.container}>
      <StatusBar barStyle='dark-content' />
      <TouchableWithoutFeedback onPress={() => handleImagePress()}>
        <Image
          style={Styles.homeLogo}
          source={{
            uri: 'https://www.myerstiresupply.com/App_Themes/myers/images/logo-myers.png',
          }}
        />
      </TouchableWithoutFeedback>
      <View style={Styles.spacer}></View>
      <Text style={Styles.welcomeTo}>Welcome to</Text>
      <Text style={Styles.MTSE}>MTS<Text style={Styles.mtsEXPRESS}>Express</Text></Text>
      <View style={Styles.spacer}></View>
      <TouchableOpacity style={Styles.button} onPress={() => props.nav.navigate('Enter Order')}>
        <Text style={Styles.buttonText}>Enter Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={Styles.button} onPress={() => props.nav.navigate('Cart')}>
        <Text style={Styles.buttonText}>View Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={Styles.button} onPress={() => props.nav.navigate('Profiles')}>
        <Text style={Styles.buttonText}>View & Edit Profiles</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen;


      
