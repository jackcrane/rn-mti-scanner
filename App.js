import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import Scanner from './components/Scanner';
import Info from './components/Info';
import Home from './components/HomeScreen';
import OrderOptions_ from './components/OrderOptions';
import Cart_ from './components/Cart';
import ScannerTest from './components/ScannerTest';
import Profiles_ from './components/Profiles';
import Profile_ from './components/Profile';
import Spec_ from './components/Spec';

import { useState } from 'react';
import { useEffect } from 'react';

function ScannerScreen({ navigation }) {
  return (
    // <Scanner nav={navigation} />
    <ScannerTest nav={navigation} />
  );
}

function InfoScreen({ route, navigation }) {
  return (
    <Info nav={navigation} route={route} />
  )
}

function HomeScreen({ navigation }) {
  return (
    <Home nav={navigation} />
  )
}

function OrderOptions({ navigation }) {
  return (
    <OrderOptions_ nav={navigation} />
  )
}

function Profiles({ navigation }) {
  return (
    <Profiles_ nav={navigation} />
  )
}

function Profile({ route, navigation }) {
  return (
    <Profile_ nav={navigation} route={route} />
  )
}

function Cart({ route, navigation }) {
  const { cart, setPCart, openInput } = route.params;

  return (
    <Cart_ nav={navigation} cart={cart} openInput={openInput ? openInput : false} route={route.params} />
  )
}

function Spec({ route, navigation }) {
  return (
    <Spec_ nav={navigation} />
  )
}

const Stack = createStackNavigator();

function App() {
  const [cart, setCart] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown:false }} />
        <Stack.Screen name="Spec" component={Spec} options={{ headerShown:true }} />
        <Stack.Screen name="Scanner" component={ScannerScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Info Screen" component={InfoScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Enter Order" component={OrderOptions} options={{ headerShown: true }} />
        <Stack.Screen name="Profiles" component={Profiles} options={{ headerShown: true }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
        <Stack.Screen name="Cart" component={Cart} initialParams={{cart:cart}} options={{ headerShown: true }} />
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}

export default App;