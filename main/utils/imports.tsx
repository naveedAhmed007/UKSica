import {
    Text, View, StyleSheet,
    TextInput, TextStyle, ViewStyle, TextInputProps,
    DimensionValue,TouchableOpacity,FlatList,Image
} from "react-native"
import { moderateScale } from "react-native-size-matters";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { headings,placeholders } from "../constants";
import { colors } from "../utils/Colors";
import fonts from "../utils/fonts";
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';


export {
    Text, View, moderateScale, StyleSheet, TextInput,
    TouchableOpacity, FlatList, KeyboardAwareScrollView,
    headings, colors, fonts, placeholders,
    uuid, Image, Icon, AntDesign, launchCamera,
    launchImageLibrary
};
export type { ViewStyle, TextInputProps, DimensionValue, TextStyle,ImagePickerResponse };