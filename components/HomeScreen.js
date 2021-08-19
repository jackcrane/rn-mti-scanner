import React from 'react';
import { 
  View,
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView, 
  Image, 
  Button 
} from 'react-native';
import Styles from "../components/Style";

const HomeScreen = (props) => {

  return (
    <View style={Styles.container}>
      <StatusBar barStyle='dark-content' />
      <Image
        style={Styles.homeLogo}
        source={{
          uri: 'https://www.myerstiresupply.com/App_Themes/myers/images/logo-myers.png',
        }}
      />
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
    </View>
  )
}

export default HomeScreen;


      
