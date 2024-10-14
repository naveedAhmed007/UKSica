import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface RadioButtonProps {
  label: string;
  value: string;
  selectedValue: string;
  onPress: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, selectedValue, onPress }) => {
  const isSelected = selectedValue === value;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(value)}>
      <View style={[styles.radioCircle, isSelected && styles.selectedCircle]}>
        {isSelected ? (
          <Icon name="radio-button-checked" size={24} color="#000080" />
        ) : (
          <Icon name="radio-button-unchecked" size={24} color="#ccc" />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
  },
  radioCircle: {
    marginRight: 10,
  },
  selectedCircle: {
    borderColor: '#4CAF50',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});

export default RadioButton;
