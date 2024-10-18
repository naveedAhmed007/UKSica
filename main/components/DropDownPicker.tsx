import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Picker } from 'react-native-wheel-pick';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing MaterialIcons

interface PickerComponentProps {
  visible: boolean;
  onClose: () => void;
  done: (value: string) => void;
  selectedValue: string;
  items: string[];
  text: string,
}

const PickerComponent: React.FC<PickerComponentProps> = ({
  visible,
  onClose,
  done,
  selectedValue,
  items,
  text
}) => {
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const [value, setValue] = useState<string>(selectedValue);

  useEffect(() => {

    setValue(selectedValue);
  }, [visible]);


  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.pickerContainer, {
          transform: [{
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [300, 0],
            })
          }]
        }]}>

          {/* Heading Text with Close Icon */}
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>{text}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={25} color="white" />
            </TouchableOpacity>
          </View>

          {/* Picker Component */}
          <Picker
            style={styles.picker}
            selectedValue={value}
            pickerData={items}
            onValueChange={setValue}
          />



          <TouchableOpacity style={[styles.doneButton, {
            backgroundColor: value == "" || value == "Select a value" ? 'rgba(0, 0, 128, 0.5)'

              : 'rgba(0, 0, 128, 1)'

            ,
          }]} onPress={done.bind(null, value)}
            disabled={value == "" || value == "Select a value" ? true : false}
            activeOpacity={1}

          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>

        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker translucent background
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(10),
    elevation: 10,
    alignItems: 'center',
  },
  picker: {
    height: moderateScale(200),
    width: '100%',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: moderateScale(15),
    alignItems: 'center',
    paddingVertical: moderateScale(5),
  },
  headingText: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#000', // Dark blue color
    textAlign: "left",
    alignSelf: 'flex-start',
  },
  closeButton: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.07,
    height: Dimensions.get('window').width * 0.07,
    backgroundColor: '#000080',
    alignItems: "center",
    justifyContent: 'center',
  },
  doneButton: {
    backgroundColor: '#000080', // Dark blue button background
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(25),
    marginTop: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    width: '95%',
    alignItems: 'center',
    marginHorizontal: moderateScale(20),
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PickerComponent;
