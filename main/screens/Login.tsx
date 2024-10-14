import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import { colors } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigation:any=useNavigation();

  const goToSurvey=()=>{
    navigation.navigate("UserTypeScreens")

  }



  return (
    <LinearGradient colors={['#808080', '#f0f8ff']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={[styles.logoText, { color: "#E52553" }]}>UK</Text>
        <Text style={[styles.logoText, { color: "#fff" }]}> SICA</Text>
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        keyboardVerticalOffset={100}
        style={styles.avoidingContainer}
      >
        {/* Input Container */}
        <View style={styles.inputWrapper}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Icon name="email" size={24} color="#000" style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#000"
              selectionColor="#ff4500"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={24} color="#000" style={styles.iconStyle} />
            <TextInput
              ref={passwordInputRef}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#000"
              secureTextEntry={!showPassword} // Toggle password visibility
              selectionColor="#ff4500" // Cursor color
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {/* Show/Hide Password Button */}
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)} // Toggle show/hide password
            >
              <Icon name={showPassword ? "visibility" : "visibility-off"} size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton} onPress={goToSurvey}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    width: '100%', // Full width for the avoiding container
    paddingHorizontal: 20, // Add horizontal padding
  },
  inputWrapper: {
    backgroundColor: '#fff', // White background for the input wrapper
    borderTopLeftRadius: 30, // Rounded corners on the top left
    borderTopRightRadius: 30, // Rounded corners on the top right
    padding: 20, // Add padding for spacing
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 2, // Shadow radius for iOS
    marginTop: 20, // Space from the logo
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light Gray color for input containers
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
  input: {
    flex: 1,
    color: '#000', // Change input text color to black for contrast
  },
  forgotPasswordContainer: {
    width: '100%', // Full width to allow right alignment
    alignItems: 'flex-end', // Aligns child to the right
    marginTop: 10, // Add some space above the text
  },
  forgotText: {
    color: '#000',
    fontWeight: 'bold', // Make the text bold
  },
  loginButton: {
    backgroundColor: colors.headerColor,
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    elevation: 3, // Add shadow for the button
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoContainer: {
    backgroundColor: colors.headerColor, // Navy Blue color for the header
    paddingVertical: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  }
});

export default LoginScreen;
