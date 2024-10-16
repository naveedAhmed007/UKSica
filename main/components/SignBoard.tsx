import React, { useState, useRef, FC } from 'react';
import { Modal, SignatureScreen, Text, View, StyleSheet, moderateScale, TouchableOpacity, colors, Icon, fonts } from '../utils/imports';
import { Dimensions } from 'react-native';

interface SignatureModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSaveSignature: (signature: string) => void;
}

const SignatureModal: FC<SignatureModalProps> = ({
  isVisible,
  onClose,
  onSaveSignature,
}) => {
  const [signature, setSignature] = useState<any>(null);
  const ref = useRef<any>();

  const handleOK = (signature: string) => {
    console.log('Signatur111111111111:', signature);
    setSignature(signature);
  };

  const handleEmpty = () => {
    console.log("Signature=======", signature);
  };

  const handleClear = () => {
    console.log('Signature cleared');
    setSignature(null);
  };

  const handleEnd = () => {
    ref.current.readSignature();
  };

  const handleData = (data: any) => { };


  const webStyle = `
  .m-signature-pad--footer {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    padding: 0 10px;
  }

  .m-signature-pad--footer .button.clear {
    background-color: #eee;
     color: #f44336; 
  }

  .m-signature-pad--footer .button {
    background-color: #000080; /* Confirm button color */
    margin-right: 10px;
    margin-top: 15px;
    width: 48%; /* Each button takes 48% width */
    height: 50px;
    font-size: 20px;
    font-weight: 500;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
     .m-signature-pad--footer .button:not(.clear) {
    display: none;
  }
    
`;


  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Your Signature</Text>
            <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
              <Icon name="times" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          <SignatureScreen
            ref={ref}
            onEnd={handleEnd}
            onOK={handleOK}
            onEmpty={handleEmpty}
            onClear={handleClear}
            onGetData={handleData}
            autoClear={false}
            descriptionText=""
            style={styles.signatureScreen}
            webStyle={webStyle}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={onSaveSignature.bind(null,signature)}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>


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
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(15),
    alignItems: 'center',
    height: moderateScale(460),
    elevation: 10, // Adds shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginBottom: moderateScale(15),
    color: '#333',
  },
  signatureScreen: {
    width: moderateScale(280),
    height: moderateScale(150),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(15),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: moderateScale(10),
  },
  clearButton: {
    backgroundColor: '#f44336',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    flex: 1,
    marginRight: moderateScale(10),
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },


  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginHorizontal: moderateScale(-20),
    marginBottom: moderateScale(10),
    backgroundColor: colors.headerColor,  // Set a background color for the header
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(20),
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
    elevation: 5,
  },
  headerText: {
    fontSize: fonts.h2,
    color: colors.white,
    fontWeight: 'bold',
  },
  closeModalButton: {
    backgroundColor: colors.headerColor,
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.07,
    height: Dimensions.get('window').width * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: '#000080',
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(14.5),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(10),
    alignItems: 'center',
    position:"absolute",
    bottom:moderateScale(42),
    left:moderateScale(40),

  },

});

export default SignatureModal;
