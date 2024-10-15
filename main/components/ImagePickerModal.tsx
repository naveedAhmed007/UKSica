import React, { useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../utils/Colors';
import { moderateScale } from '../utils/imports';
import fonts from '../utils/fonts';

interface ImagePickerModalProps {
    isVisible: boolean;
    onClose: () => void;
    openCamera:()=>void;
    openGallery:()=>void;
}

const { width } = Dimensions.get('window');

const ImagePickerModal: React.FC<ImagePickerModalProps> = ({ isVisible, onClose,openCamera,openGallery }) => {
    

    
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={[styles.selectOptionText,{flex:1}]}>Choose an option</Text>

                        <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
                            <Icon name="times" size={20} color={colors.white} />
                        </TouchableOpacity>
                    </View>


                    <View style={styles.optionCards}>
                        {/* Camera Card */}
                        <TouchableOpacity style={styles.optionCard} onPress={openCamera}>
                            <Icon name="camera" size={30} color={colors.headerColor} />
                            <Text style={styles.cardText}>Camera</Text>
                        </TouchableOpacity>

                        {/* Gallery Card */}
                        <TouchableOpacity style={[styles.optionCard,{marginLeft:moderateScale(20)}]} onPress={openGallery}>
                            <Icon name="image" size={30} color={colors.headerColor} />
                            <Text style={styles.cardText}>Gallery</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: moderateScale(10),
        paddingHorizontal:moderateScale(20),
        paddingVertical:moderateScale(20),
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.85,
    },
    closeModalButton: {

        backgroundColor: colors.headerColor,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.07,
        height: Dimensions.get('window').width * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
    },
  
    selectOptionText: {
        fontSize: fonts.h2,
        color: colors.gray,
        marginBottom:moderateScale(10), 
    },
    optionCards: {
        flexDirection: 'row',
        justifyContent: "center",
        marginVertical: moderateScale(30),
    },
    optionCard: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: moderateScale(10),
        width:moderateScale(120),
        height:moderateScale(100),
        elevation: 5, 
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: moderateScale(5),
    },
    cardText: {
        marginTop: moderateScale(5),
        fontSize: fonts.p,
        color: colors.black,
    },
    header:
    {
        flexDirection:'row',
        
    }

});

export default ImagePickerModal;
