import React, { FC } from "react";
import { Text, TextStyle, moderateScale } from "../utils/imports";
import { colors } from "../utils/Colors";

// Define possible font weights
type FontWeight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

interface Props {
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

  title: string;  
  textAlign?: "left" | "center" | "right" | "justify";  
  alignSelf?: "flex-start" | "center" | "flex-end" | "stretch"; 
  color:string,
}

const CustomText: FC<Props> = ({
  fontSize = 16, 
  fontWeight = "500",
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  marginHorizontal = 0,
  marginVertical = 0,
  paddingTop = 0,
  paddingBottom = 0,
  paddingLeft = 0,
  paddingRight = 0,
  paddingHorizontal = 0,
  paddingVertical = 0,
  title,
  alignSelf = "flex-start",
  textAlign = "left",
  color=colors.black
}) => {
  const customStyles: TextStyle = {
    fontSize: moderateScale(fontSize),
    fontWeight,
    marginTop: moderateScale(marginTop),
    marginBottom: moderateScale(marginBottom),
    marginLeft: moderateScale(marginLeft),
    marginRight: moderateScale(marginRight),
    marginHorizontal: moderateScale(marginHorizontal),
    marginVertical: moderateScale(marginVertical),
    paddingTop: moderateScale(paddingTop),
    paddingBottom: moderateScale(paddingBottom),
    paddingLeft: moderateScale(paddingLeft),
    paddingRight: moderateScale(paddingRight),
    paddingHorizontal: moderateScale(paddingHorizontal),
    paddingVertical: moderateScale(paddingVertical),
    textAlign,  
    alignSelf,
    color
  };

  return (
    <Text style={customStyles}>
      {title}
    </Text>
  );
};

export default CustomText;
