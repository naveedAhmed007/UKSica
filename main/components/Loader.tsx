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
          height:moderateScale(150),
          width:moderateScale(150)
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