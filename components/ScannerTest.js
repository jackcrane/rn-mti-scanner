import { Camera } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Styles from '../components/Style';



const Scanner = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [scanned, setScanned] = useState(false);

  const [flashMode, setFlashMode] = useState('off');

  useEffect(() => setFlashMode(props.nav.isFocused ? 'torch' : 'off'))

  useEffect(() => {
    const unsubscribe = props.nav.addListener('focus', () => {
      // The screen is focused
      console.log('Focused')
      setScanned(false);
      // Call any action
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.nav]);

  useEffect(() => {
    setScanned(false)
  }, [])

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(scanned)
    if(!scanned) {
      Haptics.impactAsync('heavy');
      setScanned(true);
      setFlashMode('off');
      props.nav.navigate('Info Screen', {
        type:type,
        data:data
      });
      setFlashMode('off');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={Styles.container}>
      <Camera 
        style={StyleSheet.absoluteFillObject} 
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} 
        type={Camera.Constants.Type.back} 
        flashMode={scanned ? 'off' : 'torch'}
        whiteBalance={'cloudy'}
      >
      </Camera>
      <View style={Styles.scannerTarget}>
        <Text>{}</Text>
      </View>
    </View>
  );
}

export default Scanner;