import { Platform, StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddedContainer:{
    padding:10
  },
  code:{
    fontFamily:Platform.os === 'android' ? 'monospace' : 'Arial',
  },
  scannerTarget:{
    width:250,
    height:125,
    borderColor:'red',
    borderStyle:'solid',
    borderWidth:5,
    borderRadius:25,
  },
  homeLogo:{
    width: 366/1.5,
    height: 179/1.5,
  },
  spacer:{
    height:'20%'
  },
  button:{
    padding:10,
    backgroundColor:'red',
    marginBottom:10,
    width:'90%',
  },
  buttonText:{
    color:'white',
    fontSize:24,
    textAlign:'center',
    fontWeight:'500'
  },
  buttonLarge:{
    padding:30,
    backgroundColor:'red',
    marginBottom:10,
    width:'90%',
  },
  buttonTextLarge:{
    color:'white',
    fontSize:24,
    textAlign:'center',
    fontWeight:'500'
  },
  MTSE:{
    fontSize:48,
    fontWeight:'bold',
  },
  mtsEXPRESS:{
    fontStyle:'italic'
  },
  tr:{
    flex:1,
    flexDirection:'row',
    margin:10,
    marginBottom:0,
    borderBottomColor:'black',
    borderStyle:'solid',
    borderBottomWidth:2
  },
  td:{
    fontSize:24,
    width:'30%',
    borderStyle:'solid'
  },
  input:{
    margin:10,
    borderWidth:2,
    borderColor:'black',
    borderStyle:'solid',
    borderRadius:10,
    padding:10,
    fontSize:24,
    color:'black',
  },
  kavContainer:{
    flex:1
  },
  addBtn:{
    margin:10,
    borderWidth:2,
    borderColor:'black',
    borderStyle:'solid',
    borderRadius:10,
    padding:10,
    alignSelf:"stretch"
  },
  addBtn__text:{
    fontSize:24,
    color:'black'
  },
  addSheet:{
    // flex:1,
    flexDirection:"row"
  },
  title:{
    fontSize:42,
    fontWeight:"bold"
  },
  subtitle:{
    fontSize:24
  },
  description:{
    fontSize:28
  },
  cartSV:{
    maxHeight:'65%'
  },
  errorMessage:{
    fontSize:24,
    color:'red'
  },
  fieldset:{

  },
  fieldlabel:{
    fontSize:24,
    margin:10,
  }
})
