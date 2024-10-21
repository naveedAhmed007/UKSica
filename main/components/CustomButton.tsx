import { FC } from "react";
import {
  colors,
  fonts,
  moderateScale,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "../utils/imports";

interface Props {
  title: string;
  onPress: () => void;
  activityOpacity?:number,
  style?: StyleProp<ViewStyle>;
  disabled?:boolean,
}

const CustomButton: FC<Props> = ({ title, onPress, style,
  activityOpacity=0,
  disabled=false}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={activityOpacity} 
      accessibilityRole="button" 
    accessibilityLabel={title}
    disabled={disabled} 
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.headerColor,
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(25),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: moderateScale(20),
    elevation: moderateScale(3),
  },
  buttonText: {
    color: colors.white,
    fontSize: fonts.p,
    fontWeight: "bold",
  },
});

export default CustomButton;
