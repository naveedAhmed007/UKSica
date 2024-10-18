import React, { useState, useRef, FC } from 'react';
import {
  Modal, SignatureScreen, Text, View, StyleSheet, moderateScale,
  TouchableOpacity, colors, Icon, fonts, Dimensions
} from '../utils/imports';

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
    setSignature(signature);
  };

  const handleEmpty = () => {

  };
  const handleClear = () => {
    ref.current?.clearSignature();
    setSignature(signature)
  };


  const handleEnd = () => {
    ref.current.readSignature();
  };

  const handleData = (data: any) => { };


  const webStyle = `
  .m-signature-pad--footer {
    display: none;
    margin: 0;
    padding :0;
  }



  
  .m-signature-pad {
      width: 100%; 
      height: 100vh; 
      border: 0px solid #ddd;
      align-self: center;
      margin: 0 auto; 
      box-shadow: none; 
       background-color: "#00ffee";
    }
    .m-signature-pad--body {
  height: 100%; 
  background-color: #C0C0C0;
}
 

   
`;

  // .m-signature-pad--footer .button:not(.clear) {
  //   display: none;
  // }

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Your Signature</Text>
            <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
              <Icon name="times" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.signatureView}>
            <SignatureScreen
              ref={ref}
              onEnd={handleEnd}
              onOK={handleOK}
              onEmpty={handleEmpty}
              onGetData={handleData}
              autoClear={false}
              descriptionText=""
              style={styles.signatureScreen}
              webStyle={webStyle}
            />
          </View>

          <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={onSaveSignature.bind(null, signature)}
            >
            <Text style={styles.submitButtonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitButton,{marginLeft:moderateScale(20),
              backgroundColor:"#ddd",
              
            }]}
            onPress={handleClear}
          >
            <Text style={[styles.submitButtonText,{color:"red"}]}>Clear</Text>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContainer: {
    backgroundColor: 'white',
    marginHorizontal: moderateScale(20),
    borderRadius: moderateScale(15),
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
  signatureScreen: {
    width: moderateScale(280),
    height: moderateScale(150),
    borderWidth: moderateScale(1),
    borderColor: '#ddd',
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(15),
  },
  submitButton: {
    backgroundColor: '#000080',
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(10),
    alignItems: 'center',
   width:moderateScale(100),
    marginBottom:moderateScale(10)


  },
  submitButtonText: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  signatureView: {
    height: moderateScale(300)
  },
  buttons: {
    flexDirection: "row", 
    alignItems: 'center',
    justifyContent: "center",
    marginBottom:moderateScale(10)
    
    

  }


  
});

export default SignatureModal;
