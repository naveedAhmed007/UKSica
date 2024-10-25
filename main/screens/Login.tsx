import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import validator from "validator";
import { postData } from "../apis/ApiServices";
import { endpoints } from "../apis/endPoints";
import { showToast } from "../components/ShowToast";
import {
  colors, fonts, headings, KeyboardAwareScrollView, LinearGradient,
  MaterialIcons, moderateScale, Platform, StyleSheet,
  Text, TouchableOpacity, View, SafeAreaView,
  StatusBar
} from "../utils/imports";
import CustomTextInput from "../components/CustomInput";
import CustomText from "../components/CustomText";
import Loader from "../components/Loader";
import CustomButton from "../components/CustomButton";
import { loginErrorsInterface } from "../utils/interfaces";
import { screenNames } from "../navigation/screenNames";
const LoginScreen = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<loginErrorsInterface>(
    { email: null, password: null }
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const navigation: any = useNavigation();

  const validateInputs = () => {
    const emailError = !validator.isEmail(email) ? 'Invalid email' : null;
    const passwordError = password.trim().length === 0 ? 'Enter password' : null;

    setErrors({ email: emailError, password: passwordError });

    return !emailError && !passwordError;
  };

  const goToSurvey = async () => {
    if (!validateInputs()) return;

    setShowLoader(true);
    try {
      const data = {
        Email: email.trim(),
        password: password.trim(),
        role: 'user'
      };
      const result: any = await postData(endpoints.login, data);

      if (result.success) {
        navigation.navigate(screenNames.userType);
      } else {
        showToast({ text1: result.message, type: "error" });
      }
    } catch (error) {
      showToast({ text1: headings.errorMessage, type: "error" });
    } finally {
      setShowLoader(false);
    }
  };

  const onChangeEmail = useCallback((newText: string) => {
    setEmail(newText);
    if (newText.trim().length === 0) {
      setErrors(prev => ({ ...prev, email: 'Enter email' }));
    } else if (!validator.isEmail(newText)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email' }));
    } else {
      setErrors(prev => ({ ...prev, email: null }));
    }
  }, []);

  const onChangePassword = useCallback((newText: string) => {
    setPassword(newText);
    setErrors(prev => ({ ...prev, password: newText.trim().length === 0 ? 'Enter password' : null }));
  }, []);

  return (
    <SafeAreaView style={{flex:1}}
    edges={["top"]}
    >
      
      <LinearGradient colors={[colors.gradientColor1, colors.gradientColor2]} style={styles.container}>
        <View style={styles.logoContainer}>
          <CustomText title={headings.UK} color={colors.loginText1Color} fontSize={40} fontWeight="bold" />
          <CustomText title={headings.SICA} color={colors.white} fontSize={40} fontWeight="bold" />
        </View>

        <KeyboardAwareScrollView
          contentContainerStyle={styles.avoidingContainer}
          extraHeight={Platform.OS === 'ios' ? moderateScale(100) : moderateScale(150)}
        >
          <View style={styles.inputWrapper}>
            <View style={[styles.inputContainer, { borderColor: errors.email ? colors.errorColorCode : colors.borderColor }]}>
              <MaterialIcons name="email" size={fonts.logoH1} color={colors.black} style={styles.iconStyle} />
              <CustomTextInput
                placeholder='Email'
                onChangeText={onChangeEmail}
                value={email}
                color={colors.black}
                backgroundColor="transparent"
                borderWidth={0}
                placeholderTextColor={colors.black}
                error={false}
              />
            </View>
            {errors.email && (
              <CustomText title={errors.email} color={colors.errorColorCode} fontSize={fonts.p} fontWeight="400" marginLeft={5} marginTop={-10} marginBottom={5} />
            )}

            <View style={[styles.inputContainer, { borderColor: errors.password ? colors.errorColorCode : colors.borderColor }]}>
              <MaterialIcons name="lock" size={24} color={colors.black} style={styles.iconStyle} />
              <CustomTextInput
                placeholder='Password'
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={!showPassword}
                color={colors.black}
                backgroundColor="transparent"
                borderWidth={0}
                placeholderTextColor={colors.black}
                error={false}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <CustomText title={errors.password} color={colors.errorColorCode} fontSize={fonts.p} fontWeight="400" marginLeft={5} marginTop={-10} marginBottom={5} />
            )}

            <CustomButton
              title={headings.login}
              onPress={goToSurvey}
              disabled={showLoader}

            />
          </View>
        </KeyboardAwareScrollView>
        {showLoader && <Loader />}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    backgroundColor: colors.headerColor,
    paddingVertical: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
    marginRight: moderateScale(10),
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
});

export default LoginScreen;
