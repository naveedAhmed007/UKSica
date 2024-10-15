import { moderateScale, StyleSheet, Text, TouchableOpacity, View } from "../utils/imports";


interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, selectedValue, onValueChange }) => {
  return (
    <View style={[styles.radioGroup,{justifyContent:options.length>2?"space-between":"flex-start"}]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[styles.radioButton,{marginRight:options.length>2?moderateScale(0):moderateScale(50)}]}
          onPress={() => onValueChange(option.value)}
        >
          <View style={styles.outerCircle}>
            {selectedValue === option.value && <View style={styles.innerCircle} />}
          </View>
          <Text style={styles.label}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(20),
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000080',
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default RadioGroup;
