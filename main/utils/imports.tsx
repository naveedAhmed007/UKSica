import {
    Text, View, StyleSheet,
    TextInput, TextStyle, ViewStyle, TextInputProps,
    DimensionValue,TouchableOpacity,FlatList,Image,
    Modal,StyleProp,LogBox,BackHandler,
    Dimensions, findNodeHandle,
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
import SignatureScreen from 'react-native-signature-canvas';
import validator from 'validator';
import { endpoints } from "../apis/endPoints";
import LinearGradient from "react-native-linear-gradient";
import { Platform } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';




export {
    Text, View, moderateScale, StyleSheet, TextInput,
    TouchableOpacity, FlatList, KeyboardAwareScrollView,
    headings, colors, fonts, placeholders,
    uuid, Image, Icon, AntDesign, launchCamera,
    launchImageLibrary, Modal, SignatureScreen, Dimensions,
    validator, endpoints, LinearGradient, 
    Platform, MaterialIcons,LogBox,BackHandler,
    findNodeHandle,moment
};
    
export type { ViewStyle, TextInputProps, DimensionValue, 
    TextStyle,ImagePickerResponse,StyleProp };