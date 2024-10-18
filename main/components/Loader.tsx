import React from 'react'
import LottieView from "lottie-react-native";
import { colors, moderateScale, StyleSheet, View } from '../utils/imports';

export const Loader = () => {

  return (
    <View style={styles.main}>
    
      <LottieView 
      source={require("../json/loaderJson.json")} 
        autoPlay 
        loop 
        style={{
          height:moderateScale(300),
          width:moderateScale(300)
        }}  
      />

    </View>
    
  )
}

const styles = StyleSheet.create({
  main:{
    ...StyleSheet.absoluteFillObject,
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    backgroundColor: colors.loaderBackDropColor,
  }
})
export default Loader