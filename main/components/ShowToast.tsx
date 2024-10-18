import { FC } from "react";
import Toast from "react-native-toast-message";
interface props {
    text1: string;
    text2?: string;
    type?: 'success' | 'error' | 'info';  
  }

export const showToast = ({text1,text2="",type="success"}:props) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2
    });
  }
