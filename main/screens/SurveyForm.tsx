import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { Alert, Dimensions, Text } from "react-native";
import SignatureModal from "../components/SignBoard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { postData } from "../apis/ApiServices";
import { endpoints } from "../apis/endPoints";

const SurveyForm = () => {
  const isFocused: any = useIsFocused();

  const [value, setValue] = useState<string>("");

  const [errorName, setErrorName] = useState<string>("");

  const [storeName, setStoreName] = useState<string>("");
  const [ManagerName, setManagerName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  
  const [errorStoreName, setErroStoreName] = useState<boolean>(false);
 
  const [address, setAddress] = useState<string>("");
  const [errorAddress, setErrorAddress] = useState<boolean>(false);
 
  const [errorNameText, setErrorNameText] = useState<string>("");
  const [siaNames, setSIANames] = useState<string>("");
  const [attention, setAttention] = useState<string>("");
  const navigation:any=useNavigation();
 
  const scrollViewRef:any = useRef(null);
  const storeNameRef:any = useRef(null); 

  const [showPicker, setShowPicker] = useState(false);
  const [showPicker1, setShowPicker1] = useState(false);
  const [selectedPickerValue, setSelectedPickerValue] = useState<string>("");
  const [selectedPickerValue1, setSelectedPickerValue1] = useState<string>("");
  const [selectedGuardBehavior, setSelectedGuardBehavior] = useState<string>("");
  const [selectedResponse, setSelectedResponse] = useState<string>("");
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [guardBehavior, setGuardBehavior] = useState<boolean>(false);
  const [showResponseOptions, setShowResponseOptions] = useState<boolean>(false);
  const [showRatingOptions, setShowRatingOptions] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("Yes");
  const [selectedAware, setSelectedAware] = useState<string>("Yes");
  const [selectedLogo, setSelectedLogo] = useState<string>('Yes');
  const [selectedGDPR, setSelectedGDPR] = useState<string>('Yes');
  const [selectedCCTV, setSelectedCCTV] = useState<string>('Yes');
  const [selectedIssues, setSelectedIssues] = useState<string>('No');
  const [selectedInfo, setSelectedInfo] = useState<string>('Yes');
  const [additionalDetails, setAdditionalDetails] = useState<string>('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [modalSignVisible, setModalSignVisible] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  const handleSaveSignature = (signature: string) => {
    setSignature(signature);
    setModalSignVisible(false)


  };



  
  
  
   // Function to scroll to a specific view
   

   
  const submitForm=useCallback(async()=>{
    // console.log("storeNmae=======",storeName)
    // console.log("storeAddress=======",address)
    // console.log("No of assles=========",selectedPickerValue)
    // console.log("No of guards=========",selectedPickerValue1)
    // console.log("sia badg",selectedValue)
    // console.log("logo",selectedLogo)
    // console.log("names and sia",siaNames)
    
    // console.log("mName=========",ManagerName)
    // console.log("position=========",position)
    // console.log("aware=========",selectedAware)
    
    // console.log("gdpr=========",selectedGDPR)
    // console.log("cctv=========",selectedCCTV)
    // console.log("info=========",selectedInfo)
    
    // console.log("behavior=====",selectedGuardBehavior)
    // console.log("responseTime======",selectedResponse)
    // console.log("additional=========",additionalDetails)
    
    // console.log("issues=========",selectedIssues)
    // console.log("attention======",attention)
    // console.log("security=======",selectedRating)
    

 



    if(storeName.trim().length<=0 || address.trim().length<=0 || selectedPickerValue1.length<=0){

    Alert.alert("please fill out required fields") 


    }
    else{
      const mappedImages:any = mapImagesToFields(selectedImages);
     
      const formDataFields = {
        StoreName: storeName,
        Address: address,
        Size_Of_Store: selectedPickerValue,
        Number_of_Security_Guards_Onsite: selectedPickerValue1,
        SIA_Badge_Visible_on_first_guard: "Y",
        Company_Brand_Logo_Visible_on_Guard: "Y",
        Names_and_SIA_number_of_Guards: siaNames,
        Manager_Person_Spoken_To: ManagerName,
        Position: position,
        Was_the_Manager_Person_aware_of_Security_Proc: "N",
        Is_GDPR_Controller_Information_Available_Onsite: "C",
        Is_the_CCTV_Warning_Sign_Displayed: "P",
        Is_there_visible_information_on_data_collection: "Y",
        Security_Guards_Behavior_and_Professionalism: "E",
        Response_Time_of_Guards_to_Issues: "D",
        Additional_Observations: additionalDetails,
        Are_There_Any_Issues: "Y",
        Issues_Details: attention,
        Overall_Security_Rating: "E",
        Auditor_Name: "Bilal",
        Relevant_Photo_File1: mappedImages.Relevant_Photo_File2,
        Relevant_Photo_File2: mappedImages.Relevant_Photo_File3,
        Relevant_Photo_File3: mappedImages.Relevant_Photo_File2,
         };
         


      
      
      const result:any = await postData(endpoints.AddAuditDetails, formDataFields);
       if(result){
        navigation.navigate("UserTypeScreens")


       }
       else{
        console.log("ssssssssssss")
       }
   
    }
  
  },[storeName,address,selectedPickerValue,selectedPickerValue1,selectedLogo,
    siaNames,selectedValue,ManagerName,position,selectedAware,
  selectedGDPR,selectedCCTV,selectedInfo,selectedGuardBehavior,selectedResponse,additionalDetails,
selectedIssues,attention,selectedRating,selectedImages  
])
const mapImagesToFields = (selectedImages:any) => {
  // Define the fields for mapping
  const fields = [
    "Relevant_Photo_File1",
    "Relevant_Photo_File2",
    "Relevant_Photo_File3",
  ];

  // Map over the selected images and assign them to fields
  const mappedImages = fields.reduce((acc, field, index) => {
    if (selectedImages[index]) {
      acc[field] = {
        uri: selectedImages[index].url,
        name: selectedImages[index].name,
        type: selectedImages[index].type,
      };
    }
    return acc;
  }, {});

  return mappedImages;
};


  const openGallery = () => {
    setIsModalVisible(false)
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response: ImagePickerResponse) => {


      if (!response.didCancel && response.assets) {
        setSelectedImages((prevImages: any) => [...prevImages, {
           url: response?.assets[0]?.uri, 
           id: uuid.v4(),
          name:response?.assets[0]?.fileName,
          type:response?.assets[0]?.type,
        
        }]);


      }
    });
  };

  const openCamera = () => {
    setIsModalVisible(false)
    launchCamera({ mediaType: 'photo', quality: 1 }, (response: ImagePickerResponse) => {
      if (!response.didCancel && response.assets) {

        setSelectedImages((prevImages: any) => [...prevImages, {
          url: response?.assets[0]?.uri, 
          id: uuid.v4(),
         name:response?.assets[0]?.fileName,
         type:response?.assets[0]?.type,
       
       }]);


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
  const addSignature = useCallback(() => {
    setModalSignVisible(!modalSignVisible)

  }, [modalSignVisible])


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
          value={""}
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
  const handleAware = useCallback((value: string) => {
    setSelectedAware(value)
  }, [selectedAware])
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
    if (newText.trim().length <= 0) {
      setErroStoreName(true)
    }
    else {
      setErroStoreName(false)
    }
    setStoreName(newText)

  }, [storeName, errorStoreName]);
  const onChangeAddress = useCallback((newText: string) => {
    if (newText.trim().length <= 0) {
      setErroStoreName(true)
    }
    else {
      setErroStoreName(false)
    }
    setAddress(newText)

  }, [storeName, address]);


  const onChangeName = useCallback((newText: string) => {
    if (newText.trim().length <= 0) {
      setErroStoreName(true)
    }
    else {
      setErroStoreName(false)
    }
    setManagerName(newText)

  }, [ManagerName, errorStoreName]);
  const onChangePosition = useCallback((newText: string) => {
    if (newText.trim().length <= 0) {
      setErroStoreName(true)
    }
    else {
      setErroStoreName(false)
    }
    setPosition(newText)

  }, [position, errorStoreName]);
  const onChangeNamesSIA = useCallback((newText: string) => {
    if (newText.trim().length <= 0) {
      setErroStoreName(true)
    }
    else {
      setErroStoreName(false)
    }
    setSIANames(newText)

  }, [ siaNames,errorStoreName]);
 


  const items: string[] = Array.from({ length: 100 }, (_, index) => (index + 1).toString());

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };
  const togglePicker1 = () => {
    setShowPicker1(!showPicker1);
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
  const done1 = useCallback((value: string) => {
    setSelectedPickerValue1(value);
    setShowPicker1(!showPicker1);
  }, [selectedPickerValue1, showPicker1, setSelectedPickerValue1]);
  
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
    setShowRatingOptions(!showRatingOptions);
  }, [selectedRating, showRatingOptions, setShowRatingOptions]);

  return (
    <View style={styles.container}>


      <Header title={headings.UKSICAForm}
        onBackPress={() => { navigation.navigate("UserTypeScreens")}}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        extraHeight={100}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
      >
        <View ref={storeNameRef}>

        <TextInput/>
        </View>
        {/* Category: Store Information */}
        <View>
          <CustomText
            title={headings.StoreInformation}
            color={colors.headerColor}
            fontSize={fonts.h2}
            marginBottom={20}
            fontWeight="bold"
            marginTop={-20}
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
              value={storeName}
              error={false}
            />
            {/* {errorStoreName==true && 
              <CustomText
              title={placeholders.EnterStoreName}
              color={colors.errorColorCode}
              fontSize={fonts.p}
              fontWeight="400"
              marginLeft={5}
              marginBottom={5}
            />
} */}
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
              onChangeText={onChangeAddress}
              value={address}
              error={false}
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
                onPress={togglePicker1}
                value={selectedPickerValue1}
                text={placeholders.EnterNumberOfSecurityGuards}
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


            <View style={styles.formGroup}>
            <CustomText
              title={"Names and SIA number of Guards"}
              color={colors.gray}
              fontSize={fonts.p}
              fontWeight="400"
              marginBottom={5}
            />

            <CustomInput
              placeholder={"Enter names and SIA number"}
              backgroundColor={colors.white}
              borderRadius={10}
              paddingLeft={10}
              paddingRight={10}
              paddingTop={10}
              paddingBottom={10}
              borderColor={colors.TextInputBorderColor}
              borderWidth={1}
              onChangeText={onChangeNamesSIA}
              value={siaNames}
              error={false}
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
                  onChangeText={onChangeName}
                  value={ManagerName}
                  error={false}
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
                  onChangeText={onChangePosition}
                  value={position}
                  error={false}
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
                  selectedValue={selectedAware}
                  onValueChange={handleAware}
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
                  data={selectedImages.length > 0 && selectedImages.length < 3 ? [...selectedImages, "ADD_BUTTON"] : selectedImages} 
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
                  onValueChange={handleIssues}
                />
              </View>
              {selectedIssues === 'Yes' && (

                <TextInput
                  style={styles.textInput}
                  multiline
                  numberOfLines={4}
                  value={attention}
                  onChangeText={setAttention}
                  placeholder="Enter issues"
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

            <View style={styles.formGroup}>
              <CustomText
                title={headings.addSignature}
                color={colors.gray}
                fontSize={fonts.p}
                fontWeight="400"
                marginBottom={10}
              />
              {signature ?
                <TouchableOpacity onPress={addSignature}>
                  <Image
                    source={{ uri: signature }}
                    style={styles.signatureImage}
                    resizeMode="contain"

                  />
                </TouchableOpacity>

                :

                <TouchableOpacity onPress={addSignature} style={{ flex: 1 }}>

                  <CustomTextInput
                    placeholder={placeholders.addSignature}
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
              }
            </View>






          </View>

          <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
            <Text style={styles.submitButtonText}>Submit Form</Text>
          </TouchableOpacity>



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
        visible={showPicker1}
        selectedValue={selectedPickerValue1}
        onClose={togglePicker1}
        done={done1}
        text={"Number of Guards"}
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
      <SignatureModal
        isVisible={modalSignVisible}
        onClose={() => setModalSignVisible(false)}
        onSaveSignature={handleSaveSignature}
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
  signatureImage: {
    width: "100%",
    height: moderateScale(150),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(15),
  },
  submitButton: {
    backgroundColor: '#000080',
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  submitButtonText: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },

});

export default SurveyForm;
