import React, { useCallback, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AntDesign, BackHandler, colors, fonts, headings, LinearGradient, moderateScale, StyleSheet, TouchableOpacity, View } from '../utils/imports';
import CustomText from '../components/CustomText';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { screenNames } from '../navigation/screenNames';

const UserTypesScreen = () => {
  const focused: any = useIsFocused();
  const navigation: any = useNavigation();
  const goToSurvey=useCallback(()=>{
    navigation.navigate(screenNames.form1)
  },
  [navigation])
  useEffect(() => {
    if (focused) {
      navigation.setOptions({
        gestureEnabled: false,
      });
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => backHandler.remove()
    }
  }, [focused])

  return (
    <LinearGradient colors={['#000080', '#87CEEB']} style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <CustomText title={headings.select} color={Colors.white}
          fontSize={fonts.h1}
          fontWeight='bold'
          alignSelf='center'
        />
      </View>


      {/* Buttons Row */}
      <View style={styles.buttonRow}>
        {/* Button 1 */}
        <TouchableOpacity style={styles.userButton} onPress={goToSurvey}>
          <AntDesign name="form" size={fonts.logoHh1} color={colors.white} />
          <CustomText title={headings.form1} color={colors.white}
            fontSize={fonts.h3}
            fontWeight={'bold'}
            marginTop={10}
            alignSelf='center'
          />

        </TouchableOpacity>

        {/* Button 2 */}
        <TouchableOpacity style={styles.userButton} onPress={goToSurvey}>
        <AntDesign name="form" size={fonts.logoHh1} color={colors.white} />
          <CustomText title={headings.form2} color={colors.white}
            fontSize={fonts.h3}
            fontWeight={'bold'}
            marginTop={10}
            alignSelf='center'
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: colors.headerColor,
    width: '100%',
    paddingVertical: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(40),
  },

  buttonRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width: '80%',
  },
  userButton: {
    backgroundColor: colors.userButtonColors, 
    borderRadius: moderateScale(20),
    width: '45%',
    paddingVertical: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, 
    shadowRadius: moderateScale(5),
  },

});

export default UserTypesScreen;
