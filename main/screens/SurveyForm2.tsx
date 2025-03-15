import React, { useCallback, useMemo, useRef, useState } from "react";
import CustomText from "../components/CustomText";
import Header from "../components/Header";
import CustomInput from "../components/CustomInput";
import CustomNumberPicker from "../components/CustomNumberPicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    AntDesign, colors, FlatList, fonts,
    headings, Icon, Image, ImagePickerResponse,
    KeyboardAwareScrollView, launchCamera, launchImageLibrary, moderateScale,
    placeholders, StyleSheet, TextInput, TouchableOpacity,
    uuid, View, Text, findNodeHandle, Dimensions,
    moment,

} from "../utils/imports";
import CustomTextInput from "../components/CustomInput";
import SignatureModal from "../components/SignBoard";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { postData } from "../apis/ApiServices";
import { endpoints } from "../apis/endPoints";
import { showToast } from "../components/ShowToast";
import Loader from "../components/Loader";
import { screenNames } from "../navigation/screenNames";
import CountryPickerModal from "../components/CountryPickerModal";
import CheckboxGroup from "../components/CheckboxGroup";
import { locationTypes, victimOptions } from "../utils/Options";
import RadioGroup from "../components/RadioGroup";
import PickerComponent from "../components/DropDownPicker";

const SurveyForm2 = () => {
    //suspected Exploiter
    const [nameAlias, setNameAlias] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [vehical, setVehical] = useState<string>("");
    const [selectedDOBValue, setSelectedDOBValue] = useState<string>("");
    const [selectedDateExpoitation, setSelectedDateExpoitation] = useState<string>("");
    const [selectedNationality, setSelectedNationality] = useState<string>("");
    const [showDOB, setShowDOB] = useState(false);
    const [showDateExploitation, setShowDateExpoitation] = useState(false);
    const [showNationalityModal, setShowNationalityModal] = useState(false);


    //Suspected Victim
    const [victimNameAlias, setVictimNameAlias] = useState<string>("");
    const [victimAddress, setVictimAddress] = useState<string>("");
    const [victimEmail, setVictimEmail] = useState<string>("");
    const [victimPhone, setVictimPhone] = useState<string>("");
    const [victimLanguage, setVictimLanguage] = useState<string>("");
    const [victimSelectedDOBValue, setSelectedVictimDOBValue] = useState<string>("");
    const [victimSelectedNationality, setSelectedVictimNationality] = useState<string>("");
    const [victimShowDOB, setShowVictimDOB] = useState(false);
    const [victimShowNationalityModal, setShowVictimNationalityModal] = useState(false);
    const [victimSelectedOptions, setVictimSelectedOptions] = useState<string[]>([]);

    //location
    const [location, setLocation] = useState("");
    const [locationError, setLocationError] = useState(false);
    const [errorExpoitation, setErrorExpoitation] = useState(false);
    const [errorLocationType, setErrorLocationType] = useState(false);
    const [showPickerLocation, setShowPickerLocation] = useState(false);
    const [selectedPickerLocationValue, setSelectedPickerLocationValue] = useState<string>("");
    const [locationDescription, setLocationDescription] = useState("");
    const [locationDescriptionError, setLocationDescriptionError] = useState(false);




    const [showLoader, setShowLoader] = useState<boolean>(false);

    const navigation: any = useNavigation();


    const scrollRef: any = useRef(null);
    const NameRef: any = useRef(null);
    const dobRef: any = useRef(null);
    const nationalityRef: any = useRef(null);
    const addressRef: any = useRef(null);
    const contactDetailsRef: any = useRef(null);
    const businessRef: any = useRef(null);
    const vehicalRef: any = useRef(null);

    const victimNameRef: any = useRef(null);
    const victimdobRef: any = useRef(null);
    const victimnationalityRef: any = useRef(null);
    const victimaddressRef: any = useRef(null);
    const victimcontactDetailsRef: any = useRef(null);
    const victimLangRef: any = useRef(null);
    const victimVulnerableRef: any = useRef(null);
    const locationDateRef: any = useRef(null);
    const locationTypeRef: any = useRef(null);
    const locationDesRef: any = useRef(null);


    const locationRef: any = useRef(null);


    const _scrollToInput = (nodeHandle: any) => {
        if (scrollRef.current) {
            const yPosition = nodeHandle.y;
            scrollRef?.current?.scrollToFocusedInput(nodeHandle);
        }
    };




    const openNationalityModal = useCallback(() => {
        setShowNationalityModal(!showNationalityModal);
    }, [showNationalityModal])

    const onSelect = useCallback((country: string) => {
        setSelectedNationality(country)
    }, [selectedNationality])

    const hideDatePicker = useCallback(() => {
        setShowDOB(false)

    }, [showDOB]);
    const toggleDateOfBirth = () => {
        setShowDOB(!showDOB);
    };
    const hideDatePickerExploitation = useCallback(() => {
        setShowDateExpoitation(false)

    }, [showDateExploitation]);
    const toggleDateOfExploitation = () => {
        setShowDateExpoitation(!showDateExploitation)
    };
    const toggleLocationPicker = () => {
        setShowPickerLocation(!showPickerLocation);
    };

    const handleConfirm = useCallback((date: any) => {
        setSelectedDOBValue(date.toISOString().split('T')[0]);
        hideDatePicker();
    }, []);
    const handleConfirmExpoitation = useCallback((date: any) => {
        const formattedDateTime = moment(date).format("YYYY-MM-DD HH:mm");
        setSelectedDateExpoitation(formattedDateTime);
        setErrorExpoitation(false)

        hideDatePickerExploitation();
    }, [selectedDateExpoitation, showDateExploitation, errorExpoitation]);


    const openNationalityVictimModal = useCallback(() => {
        setShowVictimNationalityModal(!victimShowNationalityModal)
    }, [victimShowNationalityModal])

    const onSelectVictim = useCallback((country: string) => {
        setSelectedVictimNationality(country)
    }, [victimSelectedNationality])

    const hideDatePickerVictim = useCallback(() => {
        setShowVictimDOB(false)

    }, [victimShowDOB]);
    const toggleDateOfBirthVictim = () => {
        setShowVictimDOB(!victimShowDOB);
    };

    const handleConfirmVictim = useCallback((date: any) => {
        setSelectedVictimDOBValue(date.toISOString().split('T')[0]);
        hideDatePicker();
    }, []);


    const doneLocation = useCallback((value: string) => {
        setSelectedPickerLocationValue(value);
        setErrorLocationType(false)
        setShowPickerLocation(!showPickerLocation)
    },
        [selectedPickerLocationValue, showPickerLocation, setSelectedPickerLocationValue, errorLocationType]);










    const submitForm = useCallback(() => {

        try {
            if (location.trim().length <= 0) {

                setLocationError(true);
                setErrorExpoitation(false);
                setErrorLocationType(false);
                setLocationDescriptionError(false)
                const nodeHandle = findNodeHandle(locationRef.current);
                _scrollToInput(nodeHandle);
            }
            else if (selectedDateExpoitation.trim().length <= 0) {
                setLocationError(false);
                setErrorExpoitation(true);
                setErrorLocationType(false);
                setLocationDescriptionError(false)

                const nodeHandle = findNodeHandle(locationDateRef.current);
                _scrollToInput(nodeHandle);


            }
            else if (selectedPickerLocationValue.trim().length <= 0) {
                setLocationError(false);
                setErrorExpoitation(false);
                setErrorLocationType(true);
                setLocationDescriptionError(false)
                const nodeHandle = findNodeHandle(locationTypeRef.current);
                _scrollToInput(nodeHandle);
            }
            else if (locationDescription.trim().length <= 0) {
                setLocationError(false);
                setErrorExpoitation(false);
                setErrorLocationType(false)
                setLocationDescriptionError(true);
                const nodeHandle = findNodeHandle(locationDesRef.current);
                _scrollToInput(nodeHandle);


            }

            else {
                const formDataFields = {
                    SuspectedExploiterName: nameAlias,
                    ExploiterDOB: selectedDOBValue,
                    ExploiterNationality: selectedNationality,
                    ExploiterAddress: address,
                    ExploiterEmail: email,
                    ExploiterPhone: phone,
                    BusinessAffiliation: company,
                    VehicleDetails: vehical,
                    SuspectedVictimName: victimNameAlias,
                    VictimDOB: victimSelectedDOBValue,
                    VictimNationality: victimSelectedNationality,
                    VictimAddress: victimAddress,
                    VictimEmail: victimEmail,
                    VictimPhone: victimPhone,
                    VictimLanguagesSpoken: victimLanguage,
                    VulnerableCharacteristics: victimSelectedOptions.length > 0 ? victimSelectedOptions.join(", ") : "",
                    IncidentLocation:location,
                    IncidentDate:selectedDateExpoitation,
                    LocationType:selectedPickerLocationValue,
                    IncidentDescription:locationDescription,



                };

            }
        }
        catch (error) {
            showToast({
                text1: headings.errorMessage,
                type: "error"
            })

        }
        finally {
            setShowLoader(false)
        }





    }, [nameAlias, selectedDOBValue, selectedNationality,
        address, email, phone, company, vehical,
        victimNameAlias, victimSelectedDOBValue, victimSelectedNationality,
        victimAddress, victimEmail, victimPhone, victimLanguage,
        victimSelectedOptions, location, locationError, errorExpoitation,
        selectedDateExpoitation, errorLocationType, selectedPickerLocationValue,
        locationDescription,locationDescriptionError


    ])

    const onChangeNameAlias = useCallback((newText: string) => {
        setNameAlias(newText)

    }, [nameAlias]);


    const onChangeAddress = useCallback((newText: string) => {
        setAddress(newText)

    }, [address]);
    const onChangePhone = useCallback((newText: string) => {
        setPhone(newText)

    }, [address]);
    const onChangeEmail = useCallback((newText: string) => {
        setEmail(newText)

    }, [email]);

    const onChangeCompany = useCallback((newText: string) => {
        setCompany(newText)

    }, [company]);

    const onChangeVehical = useCallback((newText: string) => {
        setVehical(newText)

    }, [vehical]);



    const onChangeVictimNameAlias = useCallback((newText: string) => {
        setVictimNameAlias(newText)

    }, [victimNameAlias]);

    const onChangeVictimAddress = useCallback((newText: string) => {
        setVictimAddress(newText)

    }, [victimAddress]);
    const onChangeVictimPhone = useCallback((newText: string) => {
        setVictimPhone(newText)

    }, [victimAddress]);
    const onChangeVictimEmail = useCallback((newText: string) => {
        setVictimEmail(newText)

    }, [victimEmail]);

    const onChangeLanguage = useCallback((newText: string) => {
        setVictimLanguage(newText)

    }, [victimLanguage]);

    const onChangeLocation = useCallback((newText: string) => {
        if (newText.trim().length <= 0) {
            setLocationError(true)
        }
        else {
            setLocationError(false)
        }
        setLocation(newText)

    }, [location, locationError]);

    const onChangeLocationDescription = useCallback((newText: string) => {
        if (newText.trim().length <= 0) {
            setLocationDescriptionError(true)
        }
        else {
            setLocationDescriptionError(false)
        }
        setLocationDescription(newText)

    }, [locationDescription, locationDescriptionError]);





    return (
        <View style={styles.container}>


            <Header title={headings.UKSICAIntelligenceForm}
                onBackPress={() => { navigation.navigate(screenNames.userType) }}
            />
            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollView}
                extraHeight={100}
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
            >

                {/* Category: Subject Information (if available): */}
                <View>
                    <CustomText
                        title={headings.subjectInformation}
                        color={colors.headerColor}
                        fontSize={fonts.h2}
                        marginBottom={20}
                        fontWeight="bold"
                        marginTop={10}
                    />

                    <CustomText
                        title={headings.suspectedExploiter}
                        color={colors.subHeaderColor}
                        fontSize={fonts.h3}
                        marginBottom={15}
                        fontWeight="bold"
                        marginTop={10}
                    />


                    <View style={styles.formGroup} ref={NameRef}>
                        <CustomText
                            title={headings.nameAliases}
                            color={colors.gray}
                            fontSize={fonts.p}
                            fontWeight="400"
                            marginBottom={5}
                        />

                        <CustomInput
                            placeholder={placeholders.EnterNameAlias}
                            backgroundColor={colors.white}
                            borderRadius={10}
                            paddingLeft={10}
                            paddingRight={10}
                            paddingTop={10}
                            paddingBottom={10}
                            borderColor={colors.TextInputBorderColor}
                            borderWidth={1}
                            onChangeText={onChangeNameAlias}
                            value={nameAlias}
                            error={false}
                        />

                    </View>

                    <View style={styles.formGroup} ref={dobRef}>
                        <CustomText
                            title={headings.dateOfBirth}
                            color={colors.gray}
                            fontSize={fonts.p}
                            fontWeight="400"
                            marginBottom={5}
                        />

                        <CustomNumberPicker
                            onPress={toggleDateOfBirth}
                            value={selectedDOBValue}
                            text={placeholders.selectDob}
                            error={false}
                        />
                    </View>
                    <View style={styles.formGroup} ref={nationalityRef}>
                        <CustomText
                            title={headings.nationalityEthnicity}
                            color={colors.gray}
                            fontSize={fonts.p}
                            fontWeight="400"
                            marginBottom={5}
                        />

                        <CustomNumberPicker
                            onPress={openNationalityModal}
                            value={selectedNationality}
                            text={placeholders.selectnationality}
                            error={false}
                        />
                    </View>

                    <View style={styles.formGroup} ref={addressRef}>
                        <CustomText
                            title={headings.addresses}
                            color={colors.gray}
                            fontSize={fonts.p}
                            fontWeight="400"
                            marginBottom={5}
                        />

                        <CustomInput
                            placeholder={placeholders.EnterAddress}
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
                    <View style={styles.formGroup} ref={contactDetailsRef}>
                        <CustomText
                            title={headings.contactDetails}
                            color={colors.gray}
                            fontSize={fonts.p}
                            fontWeight="400"
                            marginBottom={5}
                        />

                        <CustomInput
                            placeholder={placeholders.EnterEmail}
                            backgroundColor={colors.white}
                            borderRadius={10}
                            paddingLeft={10}
                            paddingRight={10}
                            paddingTop={10}
                            paddingBottom={10}
                            borderColor={colors.TextInputBorderColor}
                            borderWidth={1}
                            onChangeText={onChangeEmail}
                            value={email}
                            error={false}
                        />
                        <CustomInput
                            placeholder={placeholders.EnterPhone}
                            backgroundColor={colors.white}
                            borderRadius={10}
                            paddingLeft={10}
                            paddingRight={10}
                            paddingTop={10}
                            paddingBottom={10}
                            borderColor={colors.TextInputBorderColor}
                            borderWidth={1}
                            onChangeText={onChangePhone}
                            value={phone}
                            error={false}
                            marginTop={10}
                            marginBottom={10}
                            keyboardType="phone-pad"

                        />


                        <View style={styles.formGroup} ref={businessRef}>
                            <CustomText
                                title={headings.businessAffiliation}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomInput
                                placeholder={placeholders.EnterCompany}
                                backgroundColor={colors.white}
                                borderRadius={10}
                                paddingLeft={10}
                                paddingRight={10}
                                paddingTop={10}
                                paddingBottom={10}
                                borderColor={colors.TextInputBorderColor}
                                borderWidth={1}
                                onChangeText={onChangeCompany}
                                value={company}
                                error={false}
                            />

                        </View>
                        <View style={styles.formGroup} ref={vehicalRef}>
                            <CustomText
                                title={headings.vehicleDetails}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomInput
                                placeholder={placeholders.enterVehicleDetails}
                                backgroundColor={colors.white}
                                borderRadius={10}
                                paddingLeft={10}
                                paddingRight={10}
                                paddingTop={10}
                                paddingBottom={10}
                                borderColor={colors.TextInputBorderColor}
                                borderWidth={1}
                                onChangeText={onChangeVehical}
                                value={vehical}
                                error={false}
                            />

                        </View>

                        {/* Suspected Victim */}

                        <CustomText
                            title={headings.SuspectedVictim}
                            color={colors.subHeaderColor}
                            fontSize={fonts.h3}
                            marginBottom={15}
                            fontWeight="bold"
                            marginTop={10}
                        />


                        <View style={styles.formGroup} ref={victimNameRef}>
                            <CustomText
                                title={headings.nameAliases}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomInput
                                placeholder={placeholders.EnterNameAlias}
                                backgroundColor={colors.white}
                                borderRadius={10}
                                paddingLeft={10}
                                paddingRight={10}
                                paddingTop={10}
                                paddingBottom={10}
                                borderColor={colors.TextInputBorderColor}
                                borderWidth={1}
                                onChangeText={onChangeVictimNameAlias}
                                value={victimNameAlias}
                                error={false}
                            />

                        </View>

                        <View style={styles.formGroup} ref={victimdobRef}>
                            <CustomText
                                title={headings.dateOfBirth}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomNumberPicker
                                onPress={toggleDateOfBirthVictim}
                                value={victimSelectedDOBValue}
                                text={placeholders.selectDob}
                                error={false}
                            />
                        </View>
                        <View style={styles.formGroup} ref={victimnationalityRef}>
                            <CustomText
                                title={headings.nationalityEthnicity}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomNumberPicker
                                onPress={openNationalityVictimModal}
                                value={victimSelectedNationality}
                                text={placeholders.selectnationality}
                                error={false}
                            />
                        </View>

                        <View style={styles.formGroup} ref={victimaddressRef}>
                            <CustomText
                                title={headings.addresses}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomInput
                                placeholder={placeholders.EnterAddress}
                                backgroundColor={colors.white}
                                borderRadius={10}
                                paddingLeft={10}
                                paddingRight={10}
                                paddingTop={10}
                                paddingBottom={10}
                                borderColor={colors.TextInputBorderColor}
                                borderWidth={1}
                                onChangeText={onChangeVictimAddress}
                                value={victimAddress}
                                error={false}
                            />
                        </View>
                        <View style={styles.formGroup} ref={victimcontactDetailsRef}>
                            <CustomText
                                title={headings.contactDetails}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomInput
                                placeholder={placeholders.EnterEmail}
                                backgroundColor={colors.white}
                                borderRadius={10}
                                paddingLeft={10}
                                paddingRight={10}
                                paddingTop={10}
                                paddingBottom={10}
                                borderColor={colors.TextInputBorderColor}
                                borderWidth={1}
                                onChangeText={onChangeVictimEmail}
                                value={victimEmail}
                                error={false}
                            />
                            <CustomInput
                                placeholder={placeholders.EnterPhone}
                                backgroundColor={colors.white}
                                borderRadius={10}
                                paddingLeft={10}
                                paddingRight={10}
                                paddingTop={10}
                                paddingBottom={10}
                                borderColor={colors.TextInputBorderColor}
                                borderWidth={1}
                                onChangeText={onChangeVictimPhone}
                                value={victimPhone}
                                error={false}
                                marginTop={10}
                                marginBottom={10}
                                keyboardType="phone-pad"
                            />


                            <View style={styles.formGroup} ref={victimLangRef}>
                                <CustomText
                                    title={headings.languageSpoken}
                                    color={colors.gray}
                                    fontSize={fonts.p}
                                    fontWeight="400"
                                    marginBottom={5}
                                />

                                <CustomInput
                                    placeholder={placeholders.EnterSpokenLanguage}
                                    backgroundColor={colors.white}
                                    borderRadius={10}
                                    paddingLeft={10}
                                    paddingRight={10}
                                    paddingTop={10}
                                    paddingBottom={10}
                                    borderColor={colors.TextInputBorderColor}
                                    borderWidth={1}
                                    onChangeText={onChangeLanguage}
                                    value={victimLanguage}
                                    error={false}
                                />

                            </View>


                            <View style={styles.formGroup} ref={victimVulnerableRef}>
                                <CustomText
                                    title={headings.vulnerableCharacteristics}
                                    color={colors.gray}
                                    fontSize={fonts.p}
                                    fontWeight="400"
                                    marginBottom={5}
                                />

                                <CheckboxGroup
                                    options={victimOptions}
                                    selectedValues={victimSelectedOptions}
                                    onValueChange={setVictimSelectedOptions} />


                            </View>

                        </View>


                        {/* Location/Incident Details */}

                        <CustomText
                            title={headings.LocationIncidentDetails}
                            color={colors.subHeaderColor}
                            fontSize={fonts.h3}
                            marginBottom={15}
                            fontWeight="bold"
                            marginTop={10}
                        />


                        <View style={styles.formGroup} ref={locationRef}>
                            <CustomText
                                title={headings.LocationOfSuspectedExploitation}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomInput
                                placeholder={placeholders.AddressSiteDetails}
                                backgroundColor={colors.white}
                                borderRadius={10}
                                paddingLeft={10}
                                paddingRight={10}
                                paddingTop={10}
                                paddingBottom={10}
                                borderColor={colors.TextInputBorderColor}
                                borderWidth={1}
                                onChangeText={onChangeLocation}
                                value={location}
                                error={locationError}
                            />
                            {locationError == true &&
                                <CustomText
                                    title={placeholders.AddressSiteDetails}
                                    color={colors.errorColorCode}
                                    fontSize={fonts.p}
                                    fontWeight="400"
                                    marginLeft={5}
                                    marginBottom={5}
                                />
                            }

                        </View>

                        <View style={styles.formGroup} ref={locationDateRef}>
                            <CustomText
                                title={headings.DateTimeOfSuspectedExploitation}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomNumberPicker
                                onPress={toggleDateOfExploitation}
                                value={selectedDateExpoitation}
                                text={placeholders.selectDateOf}
                                error={errorExpoitation}
                            />
                            {errorExpoitation == true &&
                                <CustomText
                                    title={placeholders.selectDateOf}
                                    color={colors.errorColorCode}
                                    fontSize={fonts.p}
                                    fontWeight="400"
                                    marginLeft={5}
                                    marginBottom={5}
                                />
                            }
                        </View>

                        <View style={styles.formGroup} ref={locationTypeRef}>
                            <CustomText
                                title={headings.TypeOfLocation}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />
                            <CustomNumberPicker
                                onPress={toggleLocationPicker}
                                value={selectedPickerLocationValue}
                                text={placeholders.selectTypeLocation}
                                error={errorLocationType}
                            />
                            {errorLocationType == true &&
                                <CustomText
                                    title={placeholders.selectTypeLocation}
                                    color={colors.errorColorCode}
                                    fontSize={fonts.p}
                                    fontWeight="400"
                                    marginLeft={5}
                                    marginBottom={5}
                                />
                            }


                        </View>

                        <View style={styles.formGroup} ref={locationDesRef}>
                            <CustomText
                                title={headings.DescriptionOfIncident}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={10}
                            />
                            <TextInput
                                style={[styles.textInput, {
                                    borderColor: locationDescriptionError == true ?
                                        colors.errorColorCode : colors.borderColor,

                                }]}
                                multiline
                                numberOfLines={4}
                                value={locationDescription}
                                onChangeText={onChangeLocationDescription}
                                placeholder={placeholders.detailedNarrative}
                            />
                            {locationDescriptionError == true &&
                                <CustomText
                                    title={placeholders.enterDescription}
                                    color={colors.errorColorCode}
                                    fontSize={fonts.p}
                                    fontWeight="400"
                                    marginLeft={5}
                                    marginBottom={5}
                                />
                            }

                        </View>






                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
                        <Text style={styles.submitButtonText}>Submit Form</Text>
                    </TouchableOpacity>




                </View>

            </KeyboardAwareScrollView>
            {showLoader && <Loader />}




            <DateTimePickerModal
                isVisible={showDOB}
                mode="date"
                maximumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={showDateExploitation}
                mode="datetime"
                maximumDate={new Date()}
                onConfirm={handleConfirmExpoitation}
                onCancel={hideDatePickerExploitation}
            />
            <CountryPickerModal
                visible={showNationalityModal}
                onClose={() => setShowNationalityModal(false)}
                onSelect={onSelect}
            />

            <DateTimePickerModal
                isVisible={victimShowDOB}
                mode="date"
                maximumDate={new Date()}
                onConfirm={handleConfirmVictim}
                onCancel={hideDatePickerVictim}
            />
            <CountryPickerModal
                visible={victimShowNationalityModal}
                onClose={() => setShowVictimNationalityModal(false)}
                onSelect={onSelectVictim}
            />

            <PickerComponent
                visible={showPickerLocation}
                selectedValue={selectedPickerLocationValue}
                onClose={toggleLocationPicker}
                done={doneLocation}
                text={headings.TypeOfLocation}
                items={locationTypes}
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
    bScontent: {
        flex: 1,
        padding: moderateScale(16),
    },
    bSsearchInput: {
        height: moderateScale(40),
        borderBottomWidth: moderateScale(1),
        borderBottomColor: "#ccc",
        marginBottom: moderateScale(12),
        paddingHorizontal: moderateScale(8),
        fontSize: fonts.h3,
    },
    bSitem: {
        padding: moderateScale(12),
        borderBottomWidth: moderateScale(1),
        borderBottomColor: "#eee",
    },
    bSitemText: {
        fontSize: fonts.h3,
    },

});

export default SurveyForm2;
