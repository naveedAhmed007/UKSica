import React, { FC } from 'react';
import CustomText from './CustomText';
import { moderateScale, StyleSheet, View,AntDesign, TouchableOpacity } from '../utils/imports';
import { headings } from '../constants';
import fonts from '../utils/fonts';

interface Props {
  title: string;
  onBackPress: () => void; // Add an onBackPress prop for the back button functionality
}

const Header: FC<Props> = ({ title, onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
        <AntDesign name="arrowleft" size={moderateScale(30)} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <CustomText
        title={title}
        color="#fff"
        fontSize={fonts.h2}
        fontWeight="bold"
        alignSelf="center"
        marginTop={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#000080',
    paddingVertical: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginHorizontal: moderateScale(-20),

  },
  backButton: {
    position: 'absolute',
    left: moderateScale(5), // Adjust the position to your preference
    top: moderateScale(12),
    padding: moderateScale(10),
  },
});

export default Header;
