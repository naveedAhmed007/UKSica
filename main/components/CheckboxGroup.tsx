import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { fonts, moderateScale } from "../utils/imports"; // Import your scale utility if needed

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues: string[];
  onValueChange: (values: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = 
({ options, selectedValues, onValueChange }) => {
  const handlePress = (value: string) => {
    let updatedValues = [...selectedValues];

    if (updatedValues.includes(value)) {
      updatedValues = updatedValues.filter((v) => v !== value); 
    } else {
      updatedValues.push(value);
    }

    onValueChange(updatedValues);
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity key={option.value} 
        style={styles.checkboxButton} 
        onPress={() => handlePress(option.value)}>
          <View style={[styles.checkbox, 
            selectedValues.includes(option.value) && styles.checkboxSelected]} />
          <Text style={styles.label}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginHorizontal: moderateScale(20),
  },
  checkboxButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(10),
  },
  checkbox: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(2),
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#000080", // Dark blue when selected
  },
  label: {
    marginLeft: moderateScale(10),
    fontSize: fonts.p,
  },
});

export default CheckboxGroup;
