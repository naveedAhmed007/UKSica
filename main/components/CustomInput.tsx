import { FC } from "react";
import { moderateScale, TextInput } from "../utils/imports";
import { colors } from "../utils/Colors";
type FontWeight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

type PointerEvents = "auto" | "box-none" | "none" | "box-only";
interface props {
    placeholder: string,
    onChangeText: (text:string) => void,
    value: string,
    fontSize?: number;
    fontWeight?: FontWeight;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    marginHorizontal?: number;
    marginVertical?: number;

    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingHorizontal?: number;
    paddingVertical?: number;

    borderRadius?: number;
    borderColor?: string;
    borderWidth?: number;
    backgroundColor?: string;
    error:boolean,
    pointerEvents?:PointerEvents,
    editable?:boolean,
    color?:string,





}
const CustomTextInput: FC<props> = ({ placeholder,
    onChangeText,
    value,
    fontSize = 16,
  fontWeight = 'normal',
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  paddingTop = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
  borderRadius = 5,
  borderColor = '#ccc',
  borderWidth = 1,
  backgroundColor = '#fff',
  pointerEvents="auto",
  error,
  editable=true,
  color=colors.black
  
  


}) => {
    return (
        <TextInput style={{
    borderRadius,
    borderColor,
    borderWidth,
    backgroundColor,
    fontSize: moderateScale(fontSize),
    fontWeight,
    marginTop: moderateScale(marginTop),
    marginBottom: moderateScale(marginBottom),
    marginLeft: moderateScale(marginLeft),
    marginRight: moderateScale(marginRight),
    paddingLeft: moderateScale(paddingLeft),
    paddingRight: moderateScale(paddingRight),
    paddingTop: moderateScale(paddingTop),
    paddingBottom: moderateScale(paddingBottom),
    pointerEvents:pointerEvents,
    color:color,
    
    
    

    
        }}        
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
        />
    );
};


export default CustomTextInput;