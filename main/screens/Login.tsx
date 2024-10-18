import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../components/CustomInput';
import validator from 'validator';
import CustomText from '../components/CustomText';
import { postData } from '../apis/ApiServices';
import { endpoints } from '../apis/endPoints';
import Loader from '../components/Loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../utils/fonts';
import { showToast } from '../components/ShowToast';
import { headings } from '../constants';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailText, setEmailText] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigation: any = useNavigation();

  const goToSurvey = async () => {
    try {
      if (email.trim().length <= 0) {
        setEmailError(true);
        setPasswordError(false);
        setEmailText('Enter email');
      } else if (!validator.isEmail(email)) {
        setEmailError(true);
        setPasswordError(false);
        setEmailText('Invalid email');
      } else if (password.trim().length <= 0) {
        setEmailError(false);
        setPasswordError(true);
      } else {
        setShowLoader(true)
        let data = {
          Email: email.trim(),
          password: password.trim(),
          role: 'user',
        };
        setEmailError(false);
        setPasswordError(false);
        const result: any = await postData(endpoints.login, data);
        console.log("result===========",result)
        if (result.success == true) {
          navigation.navigate("UserTypeScreens")

        }
        else {
          showToast({
            text1: result.message,
            type: "error"
          })
        }
      }
    } catch (error) {
      showToast({
        text1: headings.errorMessage,
        type: "error"
      })
    }
    finally {
      setShowLoader(false)
    }
  };

  const onChangeEmail = useCallback(
    (newText: string) => {
      if (newText.trim().length <= 0) {
        setEmailError(true);
        setEmailText('Enter email');
      } else if (!validator.isEmail(newText)) {
        setEmailError(true);
        setEmailText('Invalid email');
      } else {
        setEmailError(false);
      }
      setEmail(newText);
    },
    [email, emailError]
  );

  const onChangePassword = useCallback(
    (newText: string) => {
      if (newText.trim().length <= 0) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      setPassword(newText);
    },
    [password, passwordError]
  );

  return (
    <LinearGradient colors={['#808080', '#f0f8ff']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={[styles.logoText, { color: '#E52553' }]}>UK</Text>
        <Text style={[styles.logoText, { color: '#fff' }]}> SICA</Text>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.avoidingContainer}
        extraHeight={Platform.OS === 'ios' ? 100 : 150}
      >
        <View style={styles.inputWrapper}>
          <View
            style={[
              styles.inputContainer,
              { borderColor: emailError === true ? colors.errorColorCode : '#ccc' },
            ]}
          >
            <Icon name="email" size={24} color="#000" style={styles.iconStyle} />
            <CustomTextInput
              placeholder={'Email'}
              onChangeText={onChangeEmail}
              value={email}
              error={false}
              color="000"
              backgroundColor="transparent"
              borderWidth={0}
              placeholderTextColor={colors.black}
            />
          </View>
          {emailError === true && (
            <CustomText
              title={emailText}
              color={colors.errorColorCode}
              fontSize={fonts.p}
              fontWeight="400"
              marginLeft={5}
              marginTop={-10}
              marginBottom={5}
            />
          )}

          <View
            style={[
              styles.inputContainer,
              { borderColor: passwordError === true ? colors.errorColorCode : '#ccc' },
            ]}
          >
            <Icon name="lock" size={24} color="#000" style={styles.iconStyle} />
            <CustomTextInput
              placeholder={'Password'}
              onChangeText={onChangePassword}
              value={password}
              error={false}
              secureTextEntry={!showPassword}
              color="000"
              backgroundColor="transparent"
              borderWidth={0}
              placeholderTextColor={colors.black}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="#000" />
            </TouchableOpacity>
          </View>
          {passwordError === true && (
            <CustomText
              title={'Enter password'}
              color={colors.errorColorCode}
              fontSize={fonts.p}
              fontWeight="400"
              marginLeft={5}
              marginTop={-10}
              marginBottom={5}
            />
          )}

          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={() => { }}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={goToSurvey}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {showLoader && <Loader />}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  avoidingContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  inputWrapper: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 15,
    width: '100%',
  },
  iconStyle: {
    marginRight: 10,
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  forgotText: {
    color: '#000',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: colors.headerColor,
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    elevation: 3,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoContainer: {
    backgroundColor: colors.headerColor,
    paddingVertical: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default LoginScreen;
