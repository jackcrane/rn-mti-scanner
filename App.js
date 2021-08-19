import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Scanner from './components/Scanner';
import Info from './components/Info';
import Home from './components/HomeScreen';
import OrderOptions_ from './components/OrderOptions';
import Cart_ from './components/Cart';
import KeyboardAvoidingCart from './components/Cart_kav';

import { useState } from 'react';
import { useEffect } from 'react';

function ScannerScreen({ navigation }) {
  return (
    <Scanner nav={navigation} />
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

function Cart({ route, navigation }) {
  const { cart, setPCart, openInput } = route.params;

  const setParentCart = (items) => {
    setPCart(items);
  }

  return (
    <Cart_ nav={navigation} cart={cart} setCart={setPCart} openInput={openInput ? openInput : false} route={route.params} />
  )
}

const Stack = createStackNavigator();

function App() {
  const [cart, setCart] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown:false }} />
        <Stack.Screen name="Scanner" component={ScannerScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Info Screen" component={InfoScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Enter Order" component={OrderOptions} options={{ headerShown: true }} />
        <Stack.Screen name="Cart" component={Cart} initialParams={{cart:cart, setPCart:setCart}} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;