import React, { useCallback, useState } from "react";
import CustomText from "../components/CustomText";
import Header from "../components/Header";
import CustomInput from "../components/CustomInput";
import CustomNumberPicker from "../components/CustomNumberPicker";
import PickerComponent from "../components/DropDownPicker";
import RadioGroup from '../components/RadioGroup';
import ImagePickerModal from "../components/ImagePickerModal";
import {
  AntDesign, colors, FlatList, fonts, headings,
  Icon, Image, ImagePickerResponse, KeyboardAwareScrollView, launchCamera, launchImageLibrary, moderateScale,
  placeholders, StyleSheet, TextInput, TouchableOpacity,
  uuid, View
} from "../utils/imports";
import CustomTextInput from "../components/CustomInput";
import { Dimensions } from "react-native";

const SurveyForm = () => {
  const [value, setValue] = useState<string>("");
  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorNameText, setErrorNameText] = useState<string>("");
  const [showPicker, setShowPicker] = useState(false);
  const [selectedPickerValue, setSelectedPickerValue] = useState<string>("1");
  const [selectedGuardBehavior, setSelectedGuardBehavior] = useState<string>("");
  const [selectedResponse, setSelectedResponse] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [guardBehavior, setGuardBehavior] = useState<boolean>(false);
  const [showResponseOptions, setShowResponseOptions] = useState<boolean>(false);
  const [showRatingOptions, setShowRatingOptions] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("Yes");
  const [selectedLogo, setSelectedLogo] = useState<string>('Yes');
  const [selectedGDPR, setSelectedGDPR] = useState<string>('Yes');
  const [selectedCCTV, setSelectedCCTV] = useState<string>('Yes');
  const [selectedIssues, setSelectedIssues] = useState<string>('No');
  const [selectedInfo, setSelectedInfo] = useState<string>('Yes');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<any>([]);


  const openGallery = () => {
    setIsModalVisible(false)
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response: ImagePickerResponse) => {
      if (!response.didCancel && response.assets) {
        setSelectedImages((prevImages: any) => [...prevImages, { url: response?.assets[0]?.uri, id: uuid.v4() }]);


      }
    });
  };

  const openCamera = () => {
    setIsModalVisible(false)
    launchCamera({ mediaType: 'photo', quality: 1 }, (response: ImagePickerResponse) => {
      if (!response.didCancel && response.assets) {

        setSelectedImages((prevImages: any) => [...prevImages, { url: response?.assets[0]?.uri, id: uuid.v4() }]);


      }
    });
  };


  const removeImage = (id: string) => {
    setSelectedImages(selectedImages.filter((image: any) => image.id !== id));
  };

  const renderAddItem = ({ item }: { item: { id: string; url: string } }) => (

    <View style={styles.imageContainer}>
      <Image source={{ uri: item.url }} style={styles.image} />
      {/* Cross button */}
      <TouchableOpacity style={styles.crossButton} onPress={() => removeImage(item.id)}>
        <Icon name="times" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
  const addPhotos = useCallback(() => {
    setIsModalVisible(!isModalVisible)

  }, [isModalVisible])

  const renderAddImageButton = () => (
    <TouchableOpacity
      style={styles.addImageButton}
      onPress={() => setIsModalVisible(true)}
    >
      <AntDesign name="plus" size={40} color={colors.headerColor} />
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => {
    return (
      <TouchableOpacity onPress={addPhotos} style={{ flex: 1 }}>
        <CustomTextInput
          placeholder={placeholders.addPhotos}
          pointerEvents="none"
          value={value}
          onChangeText={() => { }}
          error={false}
          backgroundColor={colors.white}
          borderRadius={10}
          paddingLeft={10}
          paddingRight={10}
          paddingTop={10}
          paddingBottom={10}
          borderColor={colors.TextInputBorderColor}
          borderWidth={1}
          editable={false}
          color={colors.black}
        />
      </TouchableOpacity>

    );
  };


  const radioOptions1 = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
    { label: 'Partially', value: 'Partially' },
  ];
  const radioOptions3 = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const radioOptions2 = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
    { label: 'Not Clear', value: 'notClear' },
  ];



  const behaviourOptions = ["Excellent", "Satisfactory", "Needs Improvement"];

  const responseOptions = ["Immediate", "Delayed", "Not Applicable"];

  const ratingOptions = ["Excellent", "Good", "Satisfactory", "Needs Improvement"];




  const handlePress = useCallback((value: string) => {
    setSelectedValue(value)
  }, [selectedValue])
  const handleLogo = useCallback((value: string) => {
    setSelectedLogo(value)
  }, [selectedLogo])
  const handleGDPR = useCallback((value: string) => {
    setSelectedGDPR(value)
  }, [selectedGDPR])
  const handleCCTV = useCallback((value: string) => {
    setSelectedCCTV(value)
  }, [selectedCCTV])
  const handleIssues = useCallback((value: string) => {
    setSelectedIssues(value)
  }, [selectedIssues])
  const handleInfo = useCallback((value: string) => {
    setSelectedInfo(value)
  }, [selectedInfo])



  const onChangeText = useCallback((newText: string) => {
    setValue(newText);
  }, [value]);

  const items: string[] = Array.from({ length: 100 }, (_, index) => (index + 1).toString());

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };
  const toggleGuardBehavior = useCallback(() => {
    setGuardBehavior(!guardBehavior)

  }, [guardBehavior])
  const toggleResponseBehavior = useCallback(() => {
    setShowResponseOptions(!showResponseOptions)

  }, [showResponseOptions])

  const toggleRatingBehavior = useCallback(() => {
    setShowRatingOptions(!showRatingOptions)

  }, [showRatingOptions])


  const done = useCallback((value: string) => {
    setSelectedPickerValue(value);
    setShowPicker(!showPicker);
  }, [selectedPickerValue, showPicker, setSelectedPickerValue]);
  const doneGuardBehavior = useCallback((value: string) => {
    setSelectedGuardBehavior(value);
    setGuardBehavior(!guardBehavior);
  }, [selectedGuardBehavior, guardBehavior, setSelectedGuardBehavior]);
  const doneResponse = useCallback((value: string) => {
    setSelectedResponse(value);
    setShowResponseOptions(!showResponseOptions);
  }, [selectedResponse, showResponseOptions, setShowResponseOptions]);

  const doneRating = useCallback((value: string) => {
    setSelectedRating(value);
    setShowRatingOptions(!showResponseOptions);
  }, [selectedRating, showRatingOptions, setShowRatingOptions]);

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
                marginBottom={10}
              />

              <RadioGroup
                options={radioOptions1}
                selectedValue={selectedValue}
                onValueChange={handlePress}
              />
            </View>

            <View style={[styles.formGroup, { marginTop: moderateScale(-10) }]}>
              <CustomText
                title={headings.CompanyLogoVisible}
                color={colors.gray}
                fontSize={fonts.p}
                fontWeight="400"
                marginBottom={10}
              />

              <RadioGroup
                options={radioOptions2}
                selectedValue={selectedLogo}
                onValueChange={handleLogo}
              />


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
                  marginBottom={10}
                />



                <RadioGroup
                  options={radioOptions1}
                  selectedValue={selectedValue}
                  onValueChange={handlePress}
                />

              </View>
            </View>

            {/* Category: GDPR Compliance */}
            <View>
              <CustomText
                title={headings.GDPRCompliance}
                color={colors.headerColor}
                fontSize={fonts.h2}
                marginBottom={20}
                fontWeight="bold"
                marginTop={10}
              />


              <View style={styles.formGroup}>
                <CustomText
                  title={headings.IsGDPRController}
                  color={colors.gray}
                  fontSize={fonts.p}
                  fontWeight="400"
                  marginBottom={10}
                />

                <RadioGroup
                  options={radioOptions2}
                  selectedValue={selectedGDPR}
                  onValueChange={handleGDPR}
                />



              </View>



              <View style={styles.formGroup}>
                <CustomText
                  title={headings.IsCCTVWarning}
                  color={colors.gray}
                  fontSize={fonts.p}
                  fontWeight="400"
                  marginBottom={10}
                />

                <RadioGroup
                  options={radioOptions2}
                  selectedValue={selectedCCTV}
                  onValueChange={handleCCTV}
                />

              </View>

              <View style={styles.formGroup}>
                <CustomText
                  title={headings.Isthereinformation}
                  color={colors.gray}
                  fontSize={fonts.p}
                  fontWeight="400"
                  marginBottom={10}
                />

                <RadioGroup
                  options={radioOptions2}
                  selectedValue={selectedInfo}
                  onValueChange={handleInfo}
                />



              </View>

            </View>


            {/* Category: General Observations */}
            <View>
              <CustomText
                title={headings.GeneralObservations}
                color={colors.headerColor}
                fontSize={fonts.h2}
                marginBottom={20}
                fontWeight="bold"
                marginTop={10}
              />


              <View style={styles.formGroup}>
                <CustomText
                  title={headings.securityGraudBehavior}
                  color={colors.gray}
                  fontSize={fonts.p}
                  fontWeight="400"
                  marginBottom={10}
                />

                <CustomNumberPicker
                  onPress={toggleGuardBehavior}
                  value={selectedGuardBehavior}
                  text={placeholders.guardBehavior}
                />



              </View>


              <View style={styles.formGroup}>
                <CustomText
                  title={headings.ResponseTimeOfGuards}
                  color={colors.gray}
                  fontSize={fonts.p}
                  fontWeight="400"
                  marginBottom={10}
                />

                <CustomNumberPicker
                  onPress={toggleResponseBehavior}
                  value={selectedResponse}
                  text={placeholders.guardResponseTime}
                />




              </View>

              <View style={styles.formGroup}>
                <CustomText
                  title={headings.AdditionalObservations}
                  color={colors.gray}
                  fontSize={fonts.p}
                  fontWeight="400"
                  marginBottom={10}
                />
                <TextInput
                  style={styles.textInput}
                  multiline
                  numberOfLines={4}
                  value={additionalDetails}
                  onChangeText={setAdditionalDetails}
                  placeholder={placeholders.additionObsevation}
                />

              </View>


              <View style={styles.formGroup}>
                <CustomText
                  title={headings.addphotos}
                  color={colors.gray}
                  fontSize={fonts.p}
                  fontWeight="400"
                  marginBottom={10}
                />

                <FlatList
                  data={selectedImages.length > 0 ? [...selectedImages, "ADD_BUTTON"] : []}
                  renderItem={({ item }) =>
                    item === 'ADD_BUTTON' ? renderAddImageButton() : renderAddItem({ item })
                  }
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  // contentContainerStyle={styles.flatListContainer}
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={renderEmptyComponent}
                />



              </View>


            </View>



            {/* Category: Follow-up Required */}
            <View>
              <CustomText title={headings.FollowUpRequired}
                color={colors.headerColor}
                fontSize={fonts.h2}
                marginBottom={20}
                fontWeight="bold"
                marginTop={10} />

              <View style={styles.formGroup}>
                <CustomText title=
                  {headings.AreIssues}
                  color={colors.gray}
                  fontSize={fonts.p}
                  fontWeight="400"
                  marginBottom={10}
                />
                <RadioGroup
                  options={radioOptions3}
                  selectedValue={selectedIssues}
                  onValueChange={setSelectedIssues}
                />
              </View>
              {selectedIssues === 'Yes' && (

                <TextInput
                  style={styles.textInput}
                  multiline
                  numberOfLines={4}
                  value={additionalDetails}
                  onChangeText={setAdditionalDetails}
                  placeholder="Enter additional details"
                />

              )}

            </View>


            <View style={styles.formGroup}>
                <CustomText
                  title={headings.securityRating}
                  color={colors.gray}
                  fontSize={fonts.p}
                  fontWeight="400"
                  marginBottom={10}
                />

                <CustomNumberPicker
                  onPress={toggleRatingBehavior}
                  value={selectedRating}
                  text={placeholders.OverallSecurityRating}
                />




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
      <PickerComponent
        visible={guardBehavior}
        selectedValue={selectedGuardBehavior}
        onClose={toggleGuardBehavior}
        done={doneGuardBehavior}
        text={placeholders.guardBehavior}
        items={behaviourOptions}
      />
      <PickerComponent
        visible={showResponseOptions}
        selectedValue={selectedResponse}
        onClose={toggleResponseBehavior}
        done={doneResponse}
        text={placeholders.guardResponseTime}
        items={responseOptions}
      />
      <PickerComponent
        visible={showRatingOptions}
        selectedValue={selectedRating}
        onClose={toggleRatingBehavior}
        done={doneRating}
        text={placeholders.OverallSecurityRating}
        items={ratingOptions}
      />


      <ImagePickerModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        openCamera={openCamera}
        openGallery={openGallery}

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

  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    height: moderateScale(100),
    marginTop: moderateScale(-10),
    padding: 10,
    textAlignVertical: 'top',
    borderColor: colors.TextInputBorderColor,
    borderWidth: moderateScale(1),
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),


  },
  flatListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'red',
  },
  imageContainer: {
    marginHorizontal: moderateScale(10),
    position: 'relative',
  },
  image: {
    width: moderateScale(90),
    height: moderateScale(90),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: "#D3D3D3",
  },
  crossButton: {
    position: 'absolute',
    top: moderateScale(3),
    right: moderateScale(3),
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.07,
    height: Dimensions.get('window').width * 0.07,
    alignItems: 'center',
    justifyContent: 'center'


  },
  addImageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    height: moderateScale(90),
    width: moderateScale(80),
    borderColor: "#D3D3D3",
  },


});

export default SurveyForm;
