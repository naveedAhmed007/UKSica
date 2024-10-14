import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // Import KeyboardAwareScrollView
import CustomText from "../components/CustomText";
import Header from "../components/Header";
import CustomInput from "../components/CustomInput";
import CustomNumberPicker from "../components/CustomNumberPicker";
import PickerComponent from "../components/DropDownPicker";
import { headings } from "../constants";
import { colors } from "../utils/Colors";
import fonts from "../utils/fonts";
import { moderateScale } from "../utils/imports";
import placeholders from "../constants/placeHolders";
import RadioButton from "../components/RadioButton";

const SurveyForm = () => {
  const [value, setValue] = useState<string>("");
  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorNameText, setErrorNameText] = useState<string>("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedPickerValue, setSelectedPickerValue] = useState<string>("1");
  const [selectedValue, setSelectedValue] = useState<string>("Yes");
  const [selectedLogo, setSelectedLogo] = useState<string>('Yes');


  const handlePress = useCallback((value: string) => {
    setSelectedValue(value)
  }, [selectedValue])
  const handleLogo = useCallback((value: string) => {
    setSelectedLogo(value)
  }, [selectedLogo])


  const onChangeText = useCallback((newText: string) => {
    setValue(newText);
  }, [value]);

  const items: string[] = Array.from({ length: 100 }, (_, index) => (index + 1).toString());

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const done = useCallback((value: string) => {
    setSelectedPickerValue(value);
    setShowPicker(!showPicker);
  }, [selectedPickerValue, showPicker, setSelectedPickerValue]);

  return (
    <View style={styles.container}>
      <Header title={headings.UKSICAForm} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        extraHeight={100}
      >
        {/* Category: Store Information */}
        <View>
          <CustomText
            title={headings.StoreInformation}
            color={colors.headerColor}
            fontSize={fonts.h2}
            marginBottom={20}
            fontWeight="bold"
            marginTop={10}
          />

          <View style={styles.formGroup}>
            <CustomText
              title={headings.StoreName}
              color={colors.gray}
              fontSize={fonts.p}
              fontWeight="400"
              marginBottom={5}
            />

            <CustomInput
              placeholder={placeholders.EnterStoreName}
              backgroundColor={colors.white}
              borderRadius={10}
              paddingLeft={10}
              paddingRight={10}
              paddingTop={10}
              paddingBottom={10}
              borderColor={colors.TextInputBorderColor}
              borderWidth={1}
              onChangeText={onChangeText}
              value={value}
              error={errorName}
            />
          </View>

          <View style={styles.formGroup}>
            <CustomText
              title={headings.StoreAddress}
              color={colors.gray}
              fontSize={fonts.p}
              fontWeight="400"
              marginBottom={5}
            />

            <CustomInput
              placeholder={placeholders.EnterStoreAddress}
              backgroundColor={colors.white}
              borderRadius={10}
              paddingLeft={10}
              paddingRight={10}
              paddingTop={10}
              paddingBottom={10}
              borderColor={colors.TextInputBorderColor}
              borderWidth={1}
              onChangeText={onChangeText}
              value={value}
              error={errorName}
            />
          </View>

          <View style={styles.formGroup}>
            <CustomText
              title={headings.NumberofAisles}
              color={colors.gray}
              fontSize={fonts.p}
              fontWeight="400"
              marginBottom={5}
            />

            <CustomNumberPicker
              onPress={togglePicker}
              value={selectedPickerValue}
              text={placeholders.EnterNumberOfAisles}
            />
          </View>
          {/* Category: Security Guard Details */}
          <View>
            <CustomText
              title={headings.SecurityGuardDetails}
              color={colors.headerColor}
              fontSize={fonts.h2}
              marginBottom={20}
              fontWeight="bold"
              marginTop={10}
            />

            <View style={styles.formGroup}>
              <CustomText
                title={headings.NumberOfSecurityGuards}
                color={colors.gray}
                fontSize={fonts.p}
                fontWeight="400"
                marginBottom={5}
              />
              <CustomNumberPicker
                onPress={togglePicker}
                value={selectedPickerValue}
                text={placeholders.EnterNumberOfAisles}
              />

            </View>
            <View style={styles.formGroup}>

              <CustomText
                title={headings.SIABadgeVisible}
                color={colors.gray}
                fontSize={fonts.p}
                fontWeight="400"
                marginBottom={5}
              />

              <View style={styles.radioGroup}>
                <RadioButton
                  label="Yes"
                  value="Yes"
                  selectedValue={selectedValue}
                  onPress={handlePress}
                />
                <RadioButton
                  label="No"
                  value="No"
                  selectedValue={selectedValue}
                  onPress={handlePress}
                />
                <RadioButton
                  label="Partially"
                  value="Partially"
                  selectedValue={selectedValue}
                  onPress={handlePress}
                />
              </View>
            </View>

            <View style={[styles.formGroup, { marginTop: moderateScale(-10) }]}>
              <CustomText
                title={headings.CompanyLogoVisible}
                color={colors.gray}
                fontSize={fonts.p}
                fontWeight="400"
                marginBottom={5}
              />

              <View style={styles.radioGroup}>


                <RadioButton
                  label="Yes"
                  value="Yes"
                  selectedValue={selectedLogo}
                  onPress={handleLogo}
                />
                <RadioButton
                  label="No"
                  value="No"
                  selectedValue={selectedLogo}
                  onPress={handleLogo}
                />
                <RadioButton
                  label="Not Clear"
                  value="NotClear"
                  selectedValue={selectedLogo}
                  onPress={handleLogo}
                />
              </View>

            </View>



            {/* Category: Manager Details */}
            <View>
              <CustomText
                title={headings.ManagerDetails}
                color={colors.headerColor}
                fontSize={fonts.h2}
                marginBottom={20}
                fontWeight="bold"
                marginTop={10}
              />


              <View style={styles.formGroup}>
                <CustomText
                  title={headings.ManagerName}
                  color={colors.gray}
                  fontSize={fonts.p}
                  fontWeight="400"
                  marginBottom={5}
                />

                <CustomInput
                  placeholder={placeholders.EnterManagerName}
                  backgroundColor={colors.white}
                  borderRadius={10}
                  paddingLeft={10}
                  paddingRight={10}
                  paddingTop={10}
                  paddingBottom={10}
                  borderColor={colors.TextInputBorderColor}
                  borderWidth={1}
                  onChangeText={onChangeText}
                  value={value}
                  error={errorName}
                />




              </View>

              <View style={styles.formGroup}>
                <CustomText
                  title={headings.position}
                  color={colors.gray}
                  fontSize={fonts.p}
                  fontWeight="400"
                  marginBottom={5}
                />

                <CustomInput
                  placeholder={placeholders.EnterPosition}
                  backgroundColor={colors.white}
                  borderRadius={10}
                  paddingLeft={10}
                  paddingRight={10}
                  paddingTop={10}
                  paddingBottom={10}
                  borderColor={colors.TextInputBorderColor}
                  borderWidth={1}
                  onChangeText={onChangeText}
                  value={value}
                  error={errorName}
                />


              </View>
              <View style={styles.formGroup}>
            <CustomText
                title={headings.awareOf}
                color={colors.gray}
                fontSize={fonts.p}
                fontWeight="400"
                marginBottom={5}
              />

          <View style={styles.radioGroup}>
          
            
            <RadioButton
              label="Yes"
              value="Yes"
              selectedValue={selectedLogo}
              onPress={handleLogo}
            />
            <RadioButton
              label="No"
              value="No"
              selectedValue={selectedLogo}
              onPress={handleLogo}
            />
            <RadioButton
              label="Partially"
              value="Partially"
              selectedValue={selectedLogo}
              onPress={handleLogo}
            />
          </View>
          </View>





            </View>





          </View>



        </View>
      </KeyboardAwareScrollView>

      <PickerComponent
        visible={showPicker}
        selectedValue={selectedPickerValue}
        onClose={togglePicker}
        done={done}
        text={"Number of Aisles"}
        items={items}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surveyFormBackground,
    paddingHorizontal: moderateScale(20),
  },
  scrollView: {
    flexGrow: 1, // Ensure the content is scrollable
  },
  formGroup: {
    marginBottom: moderateScale(15),
  },
  radioGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(20),
  }
});

export default SurveyForm;
