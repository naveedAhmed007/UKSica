import React, { FC } from 'react'
import CustomText from './CustomText'
import { moderateScale, StyleSheet, View } from '../utils/imports'
import { headings } from '../constants'
import fonts from '../utils/fonts'
interface props{
title:string,

}

const Header:FC<props> = ({title}) => {
  return (
    <View style={styles.headerContainer}>
    <CustomText 
    title={title} 
    color={'#fff'}
    fontSize={fonts.h1}
    fontWeight={'bold'}
    alignSelf="center"

    />
  </View>
  
  )
}
const styles = StyleSheet.create({
  
    headerContainer: {
        backgroundColor: '#000080',
        paddingVertical: moderateScale(20),
        alignItems: 'center',
      },
})


export default Header

