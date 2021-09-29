import React, { useState } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator, Platform } from 'react-native';
import Styles from "./Style";
import * as Application from 'expo-application';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

const Info = (props) => {
  const [ installationTimeReady, setInstallationTimeReady ] = useState(false);
  const [ installationTime, setInstallationTime ] = useState('');

  const [ iosIdForVendorReady, setIosIdForVendorReady ] = useState(false);
  const [ iosIdForVendor, setIosIdForVendor ] = useState('');

  const [ uptimeReady, setUptimeReady ] = useState(false);
  const [ uptime, setUptime ] = useState('');

  useState(async () => {
    let installTime = await Application.getInstallationTimeAsync();
    setInstallationTime(installTime.toISOString());
    setInstallationTimeReady(true);
  }, [props.nav])

  useState(async () => {
    let id = await Application.getIosIdForVendorAsync();
    setIosIdForVendor(id);
    setIosIdForVendorReady(true);
  }, [props.nav])

  useState(async () => {
    let uptime = await Device.getUptimeAsync();
    setUptime(id);
    setUptimeReady(true);
  }, [props.nav])

  useState(() => {
    console.log(Platform)
  }, [])

  return (
    <View style={Styles.paddedContainer}>
      <StatusBar barStyle='dark-content' />
      <ScrollView>
        <Text>Application ID: { Application.applicationId }</Text>
        <Text>Application Name: { Application.applicationName }</Text>
        <Text>Native App Version: { Application.nativeApplicationVersion }</Text>
        <Text>Native Build Version: { Application.nativeBuildVersion }</Text>
        <Text>Installation time: {installationTimeReady ? installationTime : <ActivityIndicator />}</Text>
        <Text>IOS UUID: {iosIdForVendorReady ? iosIdForVendor : <ActivityIndicator />}</Text>
        <Text>App Build Type: {Constants.appOwnership}</Text>
        <Text>Device Type: {Device.brand} {Constants.deviceYearClass} {Constants.platform[Platform.OS].model}</Text>
        <Text>Platform: {Platform.OS.toUpperCase()} {Constants.platform[Platform.OS].systemVersion} | {Device.osBuildId}</Text>
        <Text>Device memory: {Device.totalMemory} bytes</Text>
        <Text>CPU Type: {Device.supportedCpuArchitectures}</Text>
        <Text>Device Uptime: {uptimeReady ? uptime : <ActivityIndicator />}</Text>
      </ScrollView>
    </View>
  )
}

export default Info;


      
