import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const UserTypesScreen = () => {
    const navigation:any=useNavigation();
    const goToSurvey=()=>{
        navigation.navigate("Form")
    
      }
    
    return (
    <LinearGradient colors={['#000080', '#87CEEB']} style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Select User Type</Text>
      </View>

      {/* Buttons Row */}
      <View style={styles.buttonRow}>
        {/* Button 1 */}
        <TouchableOpacity style={styles.userButton} onPress={goToSurvey}>
          <AntDesign name="form" size={40} color="#fff" />
          <Text style={styles.buttonText}>Form 1</Text>
        </TouchableOpacity>

        {/* Button 2 */}
        <TouchableOpacity style={styles.userButton} onPress={goToSurvey}>
          <AntDesign name="form" size={40} color="#fff" />
          <Text style={styles.buttonText}>Form 2</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#000080', // Navy Blue header color
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40, // Space between header and buttons
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row', // Row layout for buttons
    justifyContent: 'space-between',
    width: '80%',
  },
  userButton: {
    backgroundColor: '#ff4500', // Orange background to match header gradient
    borderRadius: 20,
    width: '45%',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default UserTypesScreen;
