import React, { act, useCallback, useMemo, useRef, useState } from "react";
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
import { exploitationTypes, externalReporting, internalAction, locationTypes, radioOptions3, radioOptionsYNU, riskLevels, victimOptions } from "../utils/Options";
import RadioGroup from "../components/RadioGroup";
import PickerComponent from "../components/DropDownPicker";
import WorkingConditions from "../components/WorkingConditions";

const SurveyForm2 = () => {
    //suspected Exploiter
    const [nameAlias, setNameAlias] = useState<string>("");
    const [safeGuardMeasures, setSafeGuardMeasures] = useState<string>("");
    const [listPeople, setListPeople] = useState<string>("");
    const [agency, setAgency] = useState<string>("");
    const [reviewer, setReviewer] = useState<string>("");
    const [reference, setReference] = useState<string>("");
    const [action, setAction] = useState<string>("");
    const [crime, setCrime] = useState<string>("");
    const [client, setClient] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [vehical, setVehical] = useState<string>("");
    const [selectedDOBValue, setSelectedDOBValue] = useState<string>("");
    const [selectedDateExpoitation, setSelectedDateExpoitation] = useState<string>("");
    const [selectedDateTime, setSelectedDateTime] = useState<string>("");
    const [selectedDateReviewer, setSelectedDateReviewer] = useState<string>("");
    const [selectedNationality, setSelectedNationality] = useState<string>("");
    const [showDOB, setShowDOB] = useState(false);
    const [showDateExploitation, setShowDateExpoitation] = useState(false);
    const [showDateTime, setShowDateTime] = useState(false);
    const [showDateReviewed, setShowDateReviewed] = useState(false);
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
    const [comp, setComp] = useState("");
    const [officer, setOfficer] = useState("");
    const [locationError, setLocationError] = useState(false);
    const [companyError, setCompanyError] = useState(false);
    const [officerError, setOfficerError] = useState(false);
    const [errorExpoitation, setErrorExpoitation] = useState(false);
    const [errorLocationType, setErrorLocationType] = useState(false);
    const [errorRiskLevel, setErrorRiskLevel] = useState(false);
    const [showPickerExploitation, setShowPickerExploitation] = useState(false);
    const [showPickerInternal, setShowPickerInternal] = useState(false);
    const [showPickerExternal, setShowPickerExternal] = useState(false);
    const [showPickerLocation, setShowPickerLocation] = useState(false);
    const [showRiskLevel, setShowRiskLevel] = useState(false);
    const [selectedPickerLocationValue, setSelectedPickerLocationValue] = useState<string>("");
    const [selectedPickerExploitationValue, setSelectedPickerExploitationValue] = useState<string>("");
    const [selectedPickerInternalValue, setSelectedPickerInternalValue] = useState<string>("");
    const [selectedPickerExternalValue, setSelectedPickerExternalValue] = useState<string>("");
    const [selectedRiskLevelValue, setSelectedRiskLevelValue] = useState<string>("");
    const [locationDescription, setLocationDescription] = useState("");
    const [locationDescriptionError, setLocationDescriptionError] = useState(false);

    //Indicators of Labour Exploitation
    const [excessiveHours, setExcessiveHours] = useState<any>({ label: "No", value: "n" });
    const [unsafeConditions, setUnsafeConditions] = useState<any>({ label: "No", value: "n" });
    const [lackOfEquipment, setLackOfEquipment] = useState<any>({ label: "No", value: "n" });
    const [restrictedMovement, setRestrictedMovement] = useState<any>({ label: "No", value: "n" });
    const [poorLivingConditions, setPoorLivingConditions] = useState<any>({ label: "No", value: "n" });

    const [nonPayment, setNonPayment] = useState<any>({ label: "No", value: "n" });
    const [wageDeductions, setWageDeductions] = useState<any>({ label: "No", value: "n" });
    const [bankControl, setBankControl] = useState<any>({ label: "No", value: "n" });
    const [debtBondage, setDebtBondage] = useState<any>({ label: "No", value: "n" });

    const [threats, setThreats] = useState<any>({ label: "No", value: "n" });
    const [physicalAbuse, setPhysicalAbuse] = useState<any>({ label: "No", value: "n" });
    const [verbalAbuse, setVerbalAbuse] = useState<any>({ label: "No", value: "n" });
    const [isolation, setIsolation] = useState<any>({ label: "No", value: "n" });
    const [fearOfAuthorities, setFearOfAuthorities] = useState<any>({ label: "No", value: "n" });

    const [confiscationOfDocuments, setConfiscationOfDocuments] = useState<any>({ label: "No", value: "n" });
    const [restrictionOnCommunication, setRestrictionOnCommunication] = useState<any>({ label: "No", value: "n" });
    const [falseDocuments, setFalseDocuments] = useState<any>({ label: "No", value: "N" });

    const [deceptiveRecruitment, setDeceptiveRecruitment] = useState<any>({ label: "No", value: "n" });
    const [forcedTransportation, setForcedTransportation] = useState<any>({ label: "No", value: "n" });
    const [recruitmentFees, setRecruitmentFees] = useState<any>({ label: "No", value: "n" });
    const [witnessStatements, setWitnessStatements] = useState<any>({ label: "No", value: "n" });

    const [photographsVideos, setPhotographsVideos] = useState<any>({ label: "No", value: "n" });

    const [documentsRecords, setDocumentsRecords] = useState<any>({ label: "No", value: "n" });

    const [anyOtherRelevantInformation, setAnyOtherRelevantInformation] = useState<any>("");
    const [justification, setJustification] = useState<any>("");



    const [excessiveHoursDetails, setExcessiveHoursDetails] = useState("");
    const [unsafeConditionsDetails, setUnsafeConditionsDetails] = useState("");
    const [lackOfEquipmentDetails, setLackOfEquipmentDetails] = useState("");
    const [restrictedMovementDetails, setRestrictedMovementDetails] = useState("");
    const [poorLivingConditionsDetails, setPoorLivingConditionsDetails] = useState("");
    const [nonPaymentDetails, setNonPaymentDetails] = useState("");
    const [wageDeductionsDetails, setWageDeductionsDetails] = useState("");
    const [bankControlDetails, setBankControlDetails] = useState("");
    const [debtBondageDetails, setDebtBondageDetails] = useState("");
    const [threatsDetails, setThreatsDetails] = useState("");
    const [physicalAbuseDetails, setPhysicalAbuseDetails] = useState("");
    const [verbalAbuseDetails, setVerbalAbuseDetails] = useState("");
    const [isolationDetails, setIsolationDetails] = useState("");
    const [fearOfAuthoritiesDetails, setFearOfAuthoritiesDetails] = useState("");

    const [confiscationOfDocumentsDetails, setConfiscationOfDocumentsDetails] = useState("");
    const [restrictionOnCommunicationDetails, setRestrictionOnCommunicationDetails] = useState("");
    const [falseDocumentsDetails, setFalseDocumentsDetails] = useState("");

    const [deceptiveRecruitmentDetails, setDeceptiveRecruitmentDetails] = useState("");
    const [forcedTransportationDetails, setForcedTransportationDetails] = useState("");
    const [recruitmentFeesDetails, setRecruitmentFeesDetails] = useState("");
    const [witnessStatementsDetails, setWitnessStatementsDetails] = useState("");
    const [photographsVideosDetails, setPhotographsVideosDetails] = useState("");
    const [documentsRecordsDetails, setDocumentsRecordsDetails] = useState("");

    const [witnessStatementFile, setWitnessStatementFile] = useState<any>(null);
    const [photoFile, setPhotoFile] = useState<any>(null);
    const [documentFile, setDocumentFile] = useState<any>(null);
    const [selectedIssues, setSelectedIssues] = useState<any>({ label: "No", value: "n" });
    const handleIssues = useCallback((value: any) => {
        setSelectedIssues(value)
    }, [selectedIssues])

    const [modalSignVisible, setModalSignVisible] = useState(false);
    const [signature, setSignature] = useState<any>(null);
    const addSignature = useCallback(() => {
        setModalSignVisible(!modalSignVisible)

    }, [modalSignVisible])

    const handleSaveSignature = async (signature: string) => {



        setSignature({ uri: signature, name: `${moment().valueOf()}.png`, type: "image/png" });


        setModalSignVisible(false)


    };







    const mapImageToField = async (selectedImage: any) => {
        if (!selectedImage) {
            console.error("No selected");
            return;
        }

        setWitnessStatementFile({

            uri: selectedImage?.url || "",
            name: selectedImage?.name || "unknown",
            type: selectedImage?.type || "unknown",

        });
    };

    const mapImageToFieldPhoto = async (selectedImage: any) => {
        if (!selectedImage) {
            console.error("No selected");
            return;
        }

        setPhotoFile({

            uri: selectedImage?.url || "",
            name: selectedImage?.name || "unknown",
            type: selectedImage?.type || "unknown",

        });
    };

    const mapImageToFieldDocument = async (selectedImage: any) => {
        if (!selectedImage) {
            console.error("No selected");
            return;
        }

        setDocumentFile({

            uri: selectedImage?.url || "",
            name: selectedImage?.name || "unknown",
            type: selectedImage?.type || "unknown",

        });
    };














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
    const riskLevelRef: any = useRef(null);


    const locationRef: any = useRef(null);
    const officerRef: any = useRef(null);
    const CompanyRef: any = useRef(null);


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
    const hideDateTime = useCallback(() => {
        setShowDateTime(false)

    }, [showDateTime]);
    const hideDateReviewer = useCallback(() => {
        setShowDateReviewed(false)

    }, [showDateReviewed]);
    const toggleDateOfExploitation = () => {
        setShowDateExpoitation(!showDateExploitation)
    };
    const toggleDateTime = () => {
        setShowDateTime(!showDateTime)
    };
    const toggleDateReviewed = () => {
        setShowDateReviewed(!showDateReviewed)
    };
    const toggleLocationPicker = () => {
        setShowPickerLocation(!showPickerLocation);
    };
    const toggleRiskLevel = () => {
        setShowRiskLevel(!showRiskLevel);
    };
    const toggleExploitationPicker = () => {
        setShowPickerExploitation(!showPickerExploitation);
    };
    const toggleInternalPicker = () => {
        setShowPickerInternal(!showPickerInternal);
    };
    const toggleExternalPicker = () => {
        setShowPickerExternal(!showPickerExternal);
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


    const handleConfirmDateTime = useCallback((date: any) => {
        const formattedDateTime = moment(date).format("YYYY-MM-DD HH:mm");
        setSelectedDateTime(formattedDateTime);

        hideDateTime();
    }, [selectedDateTime, showDateTime]);

    const handleConfirmDateReviwer = useCallback((date: any) => {
        setSelectedDateReviewer(date.toISOString().split('T')[0]);


        hideDateReviewer();
    }, [selectedDateReviewer, showDateReviewed]);


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

    const doneExploitation = useCallback((value: string) => {
        setSelectedPickerExploitationValue(value)
        setShowPickerExploitation(!showPickerExploitation)
    },
        [setSelectedPickerExploitationValue, showPickerExploitation, selectedPickerExploitationValue]);

    const doneInternal = useCallback((value: string) => {
        setSelectedPickerInternalValue(value)
        setShowPickerInternal(!showPickerInternal)
    },
        [setSelectedPickerInternalValue, showPickerInternal, selectedPickerInternalValue]);

    const doneExternal = useCallback((value: string) => {
        setSelectedPickerExternalValue(value)
        setShowPickerExternal(!showPickerExternal)
    },
        [setSelectedPickerExternalValue, showPickerExternal, selectedPickerExternalValue]);


    const doneRiskLevel = useCallback((value: string) => {
        setSelectedRiskLevelValue(value)
        setErrorRiskLevel(false)
        setShowRiskLevel(!showRiskLevel)
    },
        [selectedRiskLevelValue, showRiskLevel, setSelectedRiskLevelValue, errorRiskLevel]);




    const handleExcessiveHours = useCallback((value: any) => {
        setExcessiveHours(value);
    }, [excessiveHours]);

    const handleUnsafeConditions = useCallback((value: any) => {
        setUnsafeConditions(value);
    }, [unsafeConditions]);

    const handleLackOfEquipment = useCallback((value: any) => {
        setLackOfEquipment(value);
    }, [lackOfEquipment]);

    const handleRestrictedMovement = useCallback((value: any) => {
        setRestrictedMovement(value);
    }, [restrictedMovement]);

    const handlePoorLivingConditions = useCallback((value: any) => {
        setPoorLivingConditions(value);
    }, [poorLivingConditions]);

    const handleNonPayment = useCallback((value: any) => {
        setNonPayment(value);
    }, [nonPayment]);

    const handleWageDeductions = useCallback((value: any) => {
        setWageDeductions(value);
    }, [wageDeductions]);

    const handleBankControl = useCallback((value: any) => {
        setBankControl(value);
    }, [bankControl]);

    const handleDebtBondage = useCallback((value: any) => {
        setDebtBondage(value);
    }, [debtBondage]);

    const handleThreats = useCallback((value: any) => {
        setThreats(value);
    }, [threats]);

    const handlePhysicalAbuse = useCallback((value: any) => {
        setPhysicalAbuse(value);
    }, [physicalAbuse]);

    const handleVerbalAbuse = useCallback((value: any) => {
        setVerbalAbuse(value);
    }, [verbalAbuse]);

    const handleIsolation = useCallback((value: any) => {
        setIsolation(value);
    }, [isolation]);

    const handleFearOfAuthorities = useCallback((value: any) => {
        setFearOfAuthorities(value);
    }, [fearOfAuthorities]);

    const handleConfiscationOfDocuments = useCallback((value: any) => {
        setConfiscationOfDocuments(value);
    }, [confiscationOfDocuments]);

    const handleRestrictionOnCommunication = useCallback((value: any) => {
        setRestrictionOnCommunication(value);
    }, [restrictionOnCommunication]);

    const handleFalseDocuments = useCallback((value: any) => {
        setFalseDocuments(value);
    }, [falseDocuments]);

    const handleDeceptiveRecruitment = useCallback((value: any) => {
        setDeceptiveRecruitment(value);
    }, [deceptiveRecruitment]);

    const handleForcedTransportation = useCallback((value: any) => {
        setForcedTransportation(value);
    }, [forcedTransportation]);

    const handleRecruitmentFees = useCallback((value: any) => {
        setRecruitmentFees(value);
    }, [recruitmentFees]);


    const handleAnyOtherRelevantInformation = useCallback((value: any) => {
        setAnyOtherRelevantInformation(value);
    }, [anyOtherRelevantInformation]);

    const handleAction = useCallback((value: any) => {
        setAction(value);
    }, [action]);
    const handleJustification = useCallback((value: any) => {
        setJustification(value);
    }, [justification]);


    const handleDocumentsRecords = useCallback((value: any) => {
        setDocumentsRecords(value);
    }, [documentsRecords]);
    const handleWitnessStatements = useCallback((value: string) => {
        setWitnessStatements(value);
    }, [witnessStatements]);

    const handlePhotographsVideos = useCallback((value: any) => {
        setPhotographsVideos(value);
    }, [photographsVideos]);









    const submitForm = useCallback(async () => {

        try {
            if (officer.trim().length <= 0) {
                setLocationError(false);
                setErrorExpoitation(false);
                setErrorLocationType(false);
                setErrorRiskLevel(false);
                setCompanyError(false)
                setOfficerError(true)

                setLocationDescriptionError(false);
                const nodeHandle = findNodeHandle(officerRef.current);
                _scrollToInput(nodeHandle);


            }
            else if (comp.trim().length <= 0) {
                setLocationError(false);
                setErrorExpoitation(false);
                setErrorLocationType(false);
                setErrorRiskLevel(false);
                setCompanyError(true)
                setOfficerError(false)

                setLocationDescriptionError(false);
                const nodeHandle = findNodeHandle(CompanyRef.current);
                _scrollToInput(nodeHandle);


            }
           
            else if (location.trim().length <= 0) {

                setLocationError(true);
                setErrorExpoitation(false);
                setErrorLocationType(false);
                setErrorRiskLevel(false)
                setCompanyError(false)
                setOfficerError(false)
                setLocationDescriptionError(false)
                const nodeHandle = findNodeHandle(locationRef.current);
                _scrollToInput(nodeHandle);
            }
            else if (selectedDateExpoitation.trim().length <= 0) {
                setLocationError(false);
                setErrorExpoitation(true);
                setErrorLocationType(false);
                setErrorRiskLevel(false)
                setLocationDescriptionError(false)
                setCompanyError(false)
                setOfficerError(false)


                const nodeHandle = findNodeHandle(locationDateRef.current);
                _scrollToInput(nodeHandle);


            }
            else if (selectedPickerLocationValue.trim().length <= 0) {
                setLocationError(false);
                setErrorExpoitation(false);
                setErrorLocationType(true);
                setErrorRiskLevel(false)
                setLocationDescriptionError(false)
                setCompanyError(false)
                setOfficerError(false)

                const nodeHandle = findNodeHandle(locationTypeRef.current);
                _scrollToInput(nodeHandle);
            }
            else if (locationDescription.trim().length <= 0) {
                setLocationError(false);
                setErrorExpoitation(false);
                setErrorLocationType(false);
                setErrorRiskLevel(false);
                setCompanyError(false)
                setOfficerError(false)

                setLocationDescriptionError(true);
                const nodeHandle = findNodeHandle(locationDesRef.current);
                _scrollToInput(nodeHandle);


            }
            else if (selectedRiskLevelValue.trim().length <= 0) {
                setLocationError(false);
                setErrorExpoitation(false);
                setErrorLocationType(false);
                setErrorRiskLevel(true);
                setCompanyError(false)
                setOfficerError(false)

                setLocationDescriptionError(false);
                const nodeHandle = findNodeHandle(riskLevelRef.current);
                _scrollToInput(nodeHandle);


            }
           



            else {
                setShowLoader(true);
                const formDataFields = {
                    ReportingOfficer: officer,
                    Company: comp,
                    Client: client,
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
                    IncidentLocation: location,
                    IncidentDate: selectedDateExpoitation,
                    LocationType: selectedPickerLocationValue,
                    IncidentDescription: locationDescription,
                    ExcessiveWorkingHours: excessiveHours.value,
                    UnsafeWorkingConditions: unsafeConditions.value,
                    LackOfProtectiveEquipment: lackOfEquipment.value,
                    RestrictedMovement: restrictedMovement.value,
                    PoorLivingConditions: poorLivingConditions.value,
                    NonPaymentOfWages: nonPayment.value,
                    WageDeductions: wageDeductions.value,
                    ControlOfBankAccounts: bankControl.value,
                    DebtBondage: debtBondage.value,
                    ThreatsOrIntimidation: threats.value,
                    PhysicalAbuse: physicalAbuse.value,
                    VerbalAbuse: verbalAbuse.value,
                    IsolationFromOthers: isolation.value,
                    FearOfAuthorities: fearOfAuthorities.value,
                    ConfiscationOfDocuments: confiscationOfDocuments.value,
                    RestrictedCommunication: restrictedMovement.value,
                    FalseDocuments: falseDocuments.value,
                    DeceptiveRecruitment: deceptiveRecruitment.value,
                    ForcedTransportation: forcedTransportation.value,
                    RecruitmentFees: recruitmentFees.value,
                    ReportDetailString: JSON.stringify(getReportDetails()),
                    DocumentsRecords: documentsRecords.value,
                    WitnessStatements: witnessStatements.value,
                    PhotographsVideos: photographsVideos.value,
                    WitnessStatementFile: witnessStatementFile,
                    OtherEvidence: anyOtherRelevantInformation,
                    PhotographsVideoFile: photoFile,
                    DocumentsRecordFile: documentFile,
                    RiskAssessment: selectedRiskLevelValue == "High" ? "h" : selectedRiskLevelValue == "Medium" ? "m" : "l",
                    OrganisedCrimeLinks: crime,
                    FurtherInvestigation: selectedIssues.value,
                    LikelyExploitationType: selectedPickerExploitationValue,

                    AgencyContacted: agency,
                    DoNotContactList: listPeople,
                    SafeguardingMeasures: safeGuardMeasures,
                    ExternalReporting: selectedPickerExternalValue,
                    InternalAction: selectedPickerInternalValue,
                    AgencyContactDate: selectedDateTime,
                    ReferenceNumber: reference,
                    OutcomeActionTaken: action,
                    ReviewedBy: reviewer,
                    DateReviewed: selectedDateReviewer,
                    SignOff: "test"











                };


                const result: any = await postData(endpoints.CreateReport, formDataFields);

                if (result?.reportId) {
                    showToast({ text1: headings.successMessage, type: "info" });


                    navigation.navigate(screenNames.userType)


                }
                else {
                    showToast({
                        text1: headings.errorMessage,
                        type: "error"
                    })

                }
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
        locationDescription, locationDescriptionError,
        poorLivingConditions, restrictedMovement, lackOfEquipment,
        unsafeConditions, excessiveHours, nonPayment,
        wageDeductions, bankControl, debtBondage, threats, physicalAbuse,
        verbalAbuse, isolation, fearOfAuthorities, confiscationOfDocuments,
        restrictionOnCommunication, falseDocuments, deceptiveRecruitment,
        forcedTransportation, recruitmentFees, excessiveHoursDetails, unsafeConditionsDetails, lackOfEquipmentDetails,
        restrictedMovementDetails, poorLivingConditionsDetails, nonPaymentDetails,
        wageDeductionsDetails, bankControlDetails, debtBondageDetails, threatsDetails,
        physicalAbuseDetails, verbalAbuseDetails, isolationDetails, fearOfAuthoritiesDetails,
        confiscationOfDocumentsDetails, restrictionOnCommunicationDetails,
        falseDocumentsDetails, deceptiveRecruitmentDetails, forcedTransportationDetails,
        recruitmentFeesDetails, witnessStatementFile, witnessStatements,
        photographsVideos, witnessStatementsDetails, photographsVideosDetails,
        photoFile, documentFile, documentsRecordsDetails,
        documentsRecords, anyOtherRelevantInformation, selectedRiskLevelValue,
        errorRiskLevel, crime, selectedIssues, selectedPickerExploitationValue, selectedPickerInternalValue, selectedPickerExternalValue,
        safeGuardMeasures, listPeople, reference, action, selectedDateTime, agency, reviewer, selectedDateReviewer, signature, comp, officer,
        companyError, officerError,client,




    ])


    const getReportDetails = () => {
        const detailsArray = [
            { FieldName: "ExcessiveWorkingHours", Detail: excessiveHoursDetails },
            { FieldName: "UnsafeWorkingConditions", Detail: unsafeConditionsDetails },
            { FieldName: "LackOfProtectiveEquipment", Detail: lackOfEquipmentDetails },
            { FieldName: "RestrictedMovement", Detail: restrictedMovementDetails },
            { FieldName: "PoorLivingConditions", Detail: poorLivingConditionsDetails },
            { FieldName: "NonPaymentOfWages", Detail: nonPaymentDetails },
            { FieldName: "WageDeductions", Detail: wageDeductionsDetails },
            { FieldName: "ControlOfBankAccounts", Detail: bankControlDetails },
            { FieldName: "DebtBondage", Detail: debtBondageDetails },
            { FieldName: "ThreatsOrIntimidation", Detail: threatsDetails },
            { FieldName: "PhysicalAbuse", Detail: physicalAbuseDetails },
            { FieldName: "VerbalAbuse", Detail: verbalAbuseDetails },
            { FieldName: "IsolationFromOthers", Detail: isolationDetails },
            { FieldName: "FearOfAuthorities", Detail: fearOfAuthoritiesDetails },
            { FieldName: "ConfiscationOfDocuments", Detail: confiscationOfDocumentsDetails },
            { FieldName: "RestrictedCommunication", Detail: restrictionOnCommunicationDetails },
            { FieldName: "FalseDocuments", Detail: falseDocumentsDetails },
            { FieldName: "DeceptiveRecruitment", Detail: deceptiveRecruitmentDetails },
            { FieldName: "ForcedTransportation", Detail: forcedTransportationDetails },
            { FieldName: "RecruitmentFees", Detail: recruitmentFeesDetails },
            { FieldName: "WitnessStatements", Detail: witnessStatementsDetails },
            { FieldName: "PhotographsVideos", Detail: photographsVideosDetails },
            { FieldName: "DocumentsRecords", Detail: documentsRecordsDetails },
        ].filter(item => item.Detail.trim() !== ""); // Remove empty details

        return detailsArray;
    };

    const onChangeNameAlias = useCallback((newText: string) => {
        setNameAlias(newText)

    }, [nameAlias]);
    const onChangeSafeGuard = useCallback((newText: string) => {
        setSafeGuardMeasures(newText)

    }, [safeGuardMeasures]);
    const onChangeListPeople = useCallback((newText: string) => {
        setListPeople(newText)

    }, [listPeople]);
    const onChangeAgency = useCallback((newText: string) => {
        setAgency(newText)

    }, [agency]);
    const onChangeReviewer = useCallback((newText: string) => {
        setReviewer(newText)

    }, [reviewer]);
    const onChangeReference = useCallback((newText: string) => {
        setReference(newText)

    }, [reference]);



    const onChangeCrime = useCallback((newText: string) => {
        setCrime(newText)

    }, [crime]);

    const onChangeClient = useCallback((newText: string) => {
        setClient(newText)

    }, [client]);





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

    const onChangeOfficer = useCallback((newText: string) => {
        if (newText.trim().length <= 0) {
            setOfficerError(true)
        }
        else {
            setOfficerError(false)
        }
        setOfficer(newText)

    }, [officer, officerError]);

    const onChangeComp = useCallback((newText: string) => {
        if (newText.trim().length <= 0) {
            setCompanyError(true)
        }
        else {
            setCompanyError(false)
        }
        setComp(newText)

    }, [comp, companyError]);



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



                    {/* Compsain Details */}
                    <CustomText
                        title={headings.ComplianceDetails}
                        color={colors.subHeaderColor}
                        fontSize={fonts.h3}
                        marginBottom={15}
                        fontWeight="bold"
                        marginTop={10}
                    />


                    <View style={styles.formGroup} ref={officerRef}>
                        <CustomText
                            title={headings.ReportingOfficer}
                            color={colors.gray}
                            fontSize={fonts.p}
                            fontWeight="400"
                            marginBottom={5}
                        />

                        <CustomInput
                            placeholder={placeholders.enterOfficerName}
                            backgroundColor={colors.white}
                            borderRadius={10}
                            paddingLeft={10}
                            paddingRight={10}
                            paddingTop={10}
                            paddingBottom={10}
                            borderColor={colors.TextInputBorderColor}
                            borderWidth={1}
                            onChangeText={onChangeOfficer}
                            value={officer}
                            error={officerError}
                        />
                        {officerError == true &&
                            <CustomText
                                title={placeholders.enterOfficerName}
                                color={colors.errorColorCode}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginLeft={5}
                                marginBottom={5}
                            />
                        }




                    </View>

                    <View style={styles.formGroup} ref={CompanyRef}>
                        <CustomText
                            title={headings.CompanyName}
                            color={colors.gray}
                            fontSize={fonts.p}
                            fontWeight="400"
                            marginBottom={5}
                        />

                        <CustomInput
                            placeholder={placeholders.enterCompany}
                            backgroundColor={colors.white}
                            borderRadius={10}
                            paddingLeft={10}
                            paddingRight={10}
                            paddingTop={10}
                            paddingBottom={10}
                            borderColor={colors.TextInputBorderColor}
                            borderWidth={1}
                            onChangeText={onChangeComp}
                            value={comp}
                            error={companyError}
                        />
                        {companyError == true &&
                            <CustomText
                                title={placeholders.enterCompany}
                                color={colors.errorColorCode}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginLeft={5}
                                marginBottom={5}
                            />
                        }
                    </View>

                    <View style={styles.formGroup}>
                                <CustomText
                                    title={headings.ClientName}
                                    color={colors.gray}
                                    fontSize={fonts.p}
                                    fontWeight="400"
                                    marginBottom={5}
                                />

                                <CustomInput
                                    placeholder={placeholders.enterClientName}
                                    backgroundColor={colors.white}
                                    borderRadius={10}
                                    paddingLeft={10}
                                    paddingRight={10}
                                    paddingTop={10}
                                    paddingBottom={10}
                                    borderColor={colors.TextInputBorderColor}
                                    borderWidth={1}
                                    onChangeText={onChangeClient}
                                    value={client}
                                    error={false}
                                />

                            </View>

                            <View style={styles.formGroup}>
                                <CustomText
                                    title={headings.DateofReport}
                                    color={colors.gray}
                                    fontSize={fonts.p}
                                    fontWeight="400"
                                    marginBottom={5}
                                />

                                <CustomInput
                                    placeholder={placeholders.enterClientName}
                                    backgroundColor={colors.white}
                                    borderRadius={10}
                                    paddingLeft={10}
                                    paddingRight={10}
                                    paddingTop={10}
                                    editable={false}
                                    paddingBottom={10}
                                    borderColor={colors.TextInputBorderColor}
                                    borderWidth={1}
                                    onChangeText={onChangeClient}
                                    value={moment().format("YYYY-MM-DD") }
                                    error={false}
                                />

                            </View>




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



                        <CustomText
                            title={headings.IndicatorsOfLabourExploitation}
                            color={colors.headerColor}
                            fontSize={fonts.h2}
                            marginBottom={20}
                            fontWeight="bold"
                            marginTop={10}
                        />

                        <CustomText
                            title={headings.WorkingConditions}
                            color={colors.subHeaderColor}
                            fontSize={fonts.h3}
                            marginBottom={15}
                            fontWeight="bold"
                            marginTop={10}
                        />

                        <WorkingConditions
                            title={headings.excessiveWorkingHours}
                            selectedValue={excessiveHours}
                            onValueChange={handleExcessiveHours}
                            details={excessiveHoursDetails}
                            setDetails={setExcessiveHoursDetails}
                        />
                        <WorkingConditions
                            title={headings.unsafeWorkingConditions}
                            selectedValue={unsafeConditions}
                            onValueChange={handleUnsafeConditions}
                            details={unsafeConditionsDetails}
                            setDetails={setUnsafeConditionsDetails}
                        />

                        <WorkingConditions
                            title={headings.lackOfProtectiveEquipment}
                            selectedValue={lackOfEquipment}
                            onValueChange={handleLackOfEquipment}
                            details={lackOfEquipmentDetails}
                            setDetails={setLackOfEquipmentDetails}
                        />

                        <WorkingConditions
                            title={headings.restrictedMovement}
                            selectedValue={restrictedMovement}
                            onValueChange={handleRestrictedMovement}
                            details={restrictedMovementDetails}
                            setDetails={setRestrictedMovementDetails}
                        />

                        <WorkingConditions
                            title={headings.poorLivingConditions}
                            selectedValue={poorLivingConditions}
                            onValueChange={handlePoorLivingConditions}
                            details={poorLivingConditionsDetails}
                            setDetails={setPoorLivingConditionsDetails}
                        />


                        <CustomText
                            title={headings.PaymentControl}
                            color={colors.subHeaderColor}
                            fontSize={fonts.h3}
                            marginBottom={15}
                            fontWeight="bold"
                            marginTop={10}
                        />
                        <WorkingConditions
                            title={headings.nonPaymentOrUnderpayment}
                            selectedValue={nonPayment}
                            onValueChange={handleNonPayment}
                            details={nonPaymentDetails}
                            setDetails={setNonPaymentDetails}
                        />
                        <WorkingConditions
                            title={headings.wageDeductionsWithoutExplanation}
                            selectedValue={wageDeductions}
                            onValueChange={handleWageDeductions}
                            details={wageDeductionsDetails}
                            setDetails={setWageDeductionsDetails}
                        />
                        <WorkingConditions
                            title={headings.controlOfBankAccounts}
                            selectedValue={bankControl}
                            onValueChange={handleBankControl}
                            details={bankControlDetails}
                            setDetails={setBankControlDetails}
                        />
                        <WorkingConditions
                            title={headings.debtBondage}
                            selectedValue={debtBondage}
                            onValueChange={handleDebtBondage}
                            details={debtBondageDetails}
                            setDetails={setDebtBondageDetails}
                        />
                        <CustomText
                            title={headings.PsychologicatControl}
                            color={colors.subHeaderColor}
                            fontSize={fonts.h3}
                            marginBottom={15}
                            fontWeight="bold"
                            marginTop={10}
                        />

                        <WorkingConditions
                            title={headings.threatsOrIntimidation}
                            selectedValue={threats}
                            onValueChange={handleThreats}
                            details={threatsDetails}
                            setDetails={setThreatsDetails}
                        />
                        <WorkingConditions
                            title={headings.physicalAbuse}
                            selectedValue={physicalAbuse}
                            onValueChange={handlePhysicalAbuse}
                            details={physicalAbuseDetails}
                            setDetails={setPhysicalAbuseDetails}
                        />
                        <WorkingConditions
                            title={headings.verbalAbuse}
                            selectedValue={verbalAbuse}
                            onValueChange={handleVerbalAbuse}
                            details={verbalAbuseDetails}
                            setDetails={setVerbalAbuseDetails}
                        />
                        <WorkingConditions
                            title={headings.isolationFromOthers}
                            selectedValue={isolation}
                            onValueChange={handleIsolation}
                            details={isolationDetails}
                            setDetails={setIsolationDetails}
                        />
                        <WorkingConditions
                            title={headings.fearOfAuthorities}
                            selectedValue={fearOfAuthorities}
                            onValueChange={handleFearOfAuthorities}
                            details={fearOfAuthoritiesDetails}
                            setDetails={setFearOfAuthoritiesDetails}
                        />
                        <CustomText
                            title={headings.DocumentControl}
                            color={colors.subHeaderColor}
                            fontSize={fonts.h3}
                            marginBottom={15}
                            fontWeight="bold"
                            marginTop={10}
                        />
                        <WorkingConditions
                            title={headings.confiscationOfDocuments}
                            selectedValue={confiscationOfDocuments}
                            onValueChange={handleConfiscationOfDocuments}
                            details={confiscationOfDocumentsDetails}
                            setDetails={setConfiscationOfDocumentsDetails}
                        />
                        <WorkingConditions
                            title={headings.restrictionOnCommunication}
                            selectedValue={restrictionOnCommunication}
                            onValueChange={handleRestrictionOnCommunication}
                            details={restrictionOnCommunicationDetails}
                            setDetails={setRestrictionOnCommunicationDetails}
                        />
                        <WorkingConditions
                            title={headings.falseDocuments}
                            selectedValue={falseDocuments}
                            onValueChange={handleFalseDocuments}
                            details={falseDocumentsDetails}
                            setDetails={setFalseDocumentsDetails}
                        />
                        <CustomText
                            title={headings.Recruitment}
                            color={colors.subHeaderColor}
                            fontSize={fonts.h3}
                            marginBottom={15}
                            fontWeight="bold"
                            marginTop={10}
                        />
                        <WorkingConditions
                            title={headings.deceptiveRecruitment}
                            selectedValue={deceptiveRecruitment}
                            onValueChange={handleDeceptiveRecruitment}
                            details={deceptiveRecruitmentDetails}
                            setDetails={setDeceptiveRecruitmentDetails}
                        />
                        <WorkingConditions
                            title={headings.forcedTransportation}
                            selectedValue={forcedTransportation}
                            onValueChange={handleForcedTransportation}
                            details={forcedTransportationDetails}
                            setDetails={setForcedTransportationDetails}
                        />
                        <WorkingConditions
                            title={headings.recruitmentFees}
                            selectedValue={recruitmentFees}
                            onValueChange={handleRecruitmentFees}
                            details={recruitmentFeesDetails}
                            setDetails={setRecruitmentFeesDetails}
                        />

                        {/* Supporting Evidence */}


                        <CustomText
                            title={headings.SupportingEvidence}
                            color={colors.headerColor}
                            fontSize={fonts.h2}
                            marginBottom={20}
                            fontWeight="bold"
                            marginTop={10}
                        />

                        <WorkingConditions
                            title={headings.WitnessStatements}
                            selectedValue={witnessStatements}
                            onValueChange={handleWitnessStatements}
                            details={witnessStatementsDetails}
                            setDetails={setWitnessStatementsDetails}
                            isAttached={true}
                            attachedDocument={mapImageToField}
                        />

                        <WorkingConditions
                            title={headings.PhotographsVideos}
                            selectedValue={photographsVideos}
                            onValueChange={handlePhotographsVideos}
                            details={photographsVideosDetails}
                            setDetails={setPhotographsVideosDetails}
                            attachedDocument={mapImageToFieldPhoto}
                            isPhotoVideo={true}
                        />

                        <WorkingConditions
                            title={headings.DocumentsRecords}
                            selectedValue={documentsRecords}
                            onValueChange={handleDocumentsRecords}
                            details={documentsRecordsDetails}
                            setDetails={setDocumentsRecordsDetails}
                            attachedDocument={mapImageToFieldDocument}
                            isDocumentData={true}
                        />


                        <View style={styles.formGroup}>
                            <CustomText
                                title={headings.AnyOtherRelevantInformation}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={10}
                            />
                            <TextInput
                                style={[styles.textInput, {
                                    borderColor: colors.borderColor,

                                }]}
                                multiline
                                numberOfLines={4}
                                value={anyOtherRelevantInformation}
                                onChangeText={handleAnyOtherRelevantInformation}
                                placeholder={placeholders.EnterAnyOtherRelevantInformation}
                            />

                        </View>

                        {/* Analysis */}

                        <CustomText
                            title={headings.Analysis}
                            color={colors.headerColor}
                            fontSize={fonts.h2}
                            marginBottom={20}
                            fontWeight="bold"
                            marginTop={10}
                        />
                        <View style={styles.formGroup} ref={riskLevelRef}>
                            <CustomText
                                title={headings.AssessmentofRisk}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />
                            <CustomNumberPicker
                                onPress={toggleRiskLevel}
                                value={selectedRiskLevelValue}
                                text={placeholders.SelectAssessmentofRisk}
                                error={errorRiskLevel}
                            />
                            {errorRiskLevel == true &&
                                <CustomText
                                    title={placeholders.SelectAssessmentofRisk}
                                    color={colors.errorColorCode}
                                    fontSize={fonts.p}
                                    fontWeight="400"
                                    marginLeft={5}
                                    marginBottom={5}
                                />
                            }


                        </View>


                        {selectedRiskLevelValue && <View style={styles.formGroup}>
                            <CustomText
                                title={headings.Justification}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={10}
                            />
                            <TextInput
                                style={[styles.textInput, {
                                    borderColor: colors.borderColor,

                                }]}
                                multiline
                                numberOfLines={4}
                                value={justification}
                                onChangeText={handleJustification}
                                placeholder={placeholders.justification}
                            />

                        </View>
                        }


                        <View style={styles.formGroup}>
                            <CustomText
                                title={headings.LikelyFormofExploitation}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />
                            <CustomNumberPicker
                                onPress={toggleExploitationPicker}
                                value={selectedPickerExploitationValue}
                                text={placeholders.SelectLikelyFormofExploitation}
                                error={false}
                            />

                            <View style={styles.formGroup}>
                                <CustomText
                                    title={headings.PotentialLinkstoOrganisedCrime}
                                    color={colors.gray}
                                    fontSize={fonts.p}
                                    fontWeight="400"
                                    marginBottom={5}
                                />

                                <CustomInput
                                    placeholder={placeholders.crimeLinks}
                                    backgroundColor={colors.white}
                                    borderRadius={10}
                                    paddingLeft={10}
                                    paddingRight={10}
                                    paddingTop={10}
                                    paddingBottom={10}
                                    borderColor={colors.TextInputBorderColor}
                                    borderWidth={1}
                                    onChangeText={onChangeCrime}
                                    value={crime}
                                    error={false}
                                />

                            </View>




                        </View>

                        <View style={styles.formGroup}>
                            <CustomText title=
                                {headings.AnyFurtherInvestigationNeeded}
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





                        {/* Recommendations */}
                        <CustomText
                            title={headings.Recommendations}
                            color={colors.subHeaderColor}
                            fontSize={fonts.h3}
                            marginBottom={15}
                            fontWeight="bold"
                            marginTop={10}
                        />

                        <View style={styles.formGroup}>
                            <CustomText
                                title={headings.internalAction}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />
                            <CustomNumberPicker
                                onPress={toggleInternalPicker}
                                value={selectedPickerInternalValue}
                                text={placeholders.SelectinternalAction}
                                error={false}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <CustomText
                                title={headings.internalAction}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />
                            <CustomNumberPicker
                                onPress={toggleExternalPicker}
                                value={selectedPickerExternalValue}
                                text={placeholders.SelectexternalReporting}
                                error={false}
                            />
                        </View>


                        <View style={styles.formGroup}>
                            <CustomText
                                title={headings.safeguardingMeasures}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomInput
                                placeholder={placeholders.enterSafeguardingMeasures}
                                backgroundColor={colors.white}
                                borderRadius={10}
                                paddingLeft={10}
                                paddingRight={10}
                                paddingTop={10}
                                paddingBottom={10}
                                borderColor={colors.TextInputBorderColor}
                                borderWidth={1}
                                onChangeText={onChangeSafeGuard}
                                value={safeGuardMeasures}
                                error={false}
                            />

                        </View>

                        <View style={styles.formGroup}>
                            <CustomText
                                title={headings.doNotContact}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomInput
                                placeholder={placeholders.listPeople}
                                backgroundColor={colors.white}
                                borderRadius={10}
                                paddingLeft={10}
                                paddingRight={10}
                                paddingTop={10}
                                paddingBottom={10}
                                borderColor={colors.TextInputBorderColor}
                                borderWidth={1}
                                onChangeText={onChangeListPeople}
                                value={listPeople}
                                error={false}
                            />

                        </View>

                        {/* Reporting to External Agencies */}

                        <CustomText
                            title={headings.Recommendations}
                            color={colors.subHeaderColor}
                            fontSize={fonts.h3}
                            marginBottom={15}
                            fontWeight="bold"
                            marginTop={10}
                        />


                        <View style={styles.formGroup}>
                            <CustomText
                                title={headings.agencyContacted}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomInput
                                placeholder={placeholders.EnterAgencyName}
                                backgroundColor={colors.white}
                                borderRadius={10}
                                paddingLeft={10}
                                paddingRight={10}
                                paddingTop={10}
                                paddingBottom={10}
                                borderColor={colors.TextInputBorderColor}
                                borderWidth={1}
                                onChangeText={onChangeAgency}
                                value={agency}
                                error={false}
                            />

                        </View>

                        <View style={styles.formGroup}>
                            <CustomText
                                title={headings.dateTimeContacted}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomNumberPicker
                                onPress={toggleDateTime}
                                value={selectedDateTime}
                                text={placeholders.selectDateOf}
                                error={false}
                            />

                        </View>

                        <View style={styles.formGroup}>
                            <CustomText
                                title={headings.referenceNumber}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomInput
                                placeholder={placeholders.EnterReferenceNumber}
                                backgroundColor={colors.white}
                                borderRadius={10}
                                paddingLeft={10}
                                paddingRight={10}
                                paddingTop={10}
                                paddingBottom={10}
                                borderColor={colors.TextInputBorderColor}
                                borderWidth={1}
                                onChangeText={onChangeReference}
                                value={reference}
                                error={false}
                            />

                        </View>

                        <View style={styles.formGroup}>
                            <CustomText
                                title={headings.outcomeActionTaken}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={10}
                            />
                            <TextInput
                                style={[styles.textInput, {
                                    borderColor: colors.borderColor,

                                }]}
                                multiline
                                numberOfLines={4}
                                value={action}
                                onChangeText={handleAction}
                                placeholder={placeholders.DescribeTheOutcome}
                            />

                        </View>

                        {/* Reviewed By */}
                        <CustomText
                            title={headings.Review}
                            color={colors.subHeaderColor}
                            fontSize={fonts.h3}
                            marginBottom={15}
                            fontWeight="bold"
                            marginTop={10}
                        />


                        <View style={styles.formGroup}>
                            <CustomText
                                title={headings.reviewedBy}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomInput
                                placeholder={placeholders.EnterReviewerName}
                                backgroundColor={colors.white}
                                borderRadius={10}
                                paddingLeft={10}
                                paddingRight={10}
                                paddingTop={10}
                                paddingBottom={10}
                                borderColor={colors.TextInputBorderColor}
                                borderWidth={1}
                                onChangeText={onChangeReviewer}
                                value={reviewer}
                                error={false}
                            />

                        </View>

                        <View style={styles.formGroup}>
                            <CustomText
                                title={headings.dateReviewed}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={5}
                            />

                            <CustomNumberPicker
                                onPress={toggleDateReviewed}
                                value={selectedDateReviewer}
                                text={placeholders.selectDate}
                                error={false}
                            />

                        </View>


                        <View style={styles.formGroup}>
                            <CustomText
                                title={headings.sign}
                                color={colors.gray}
                                fontSize={fonts.p}
                                fontWeight="400"
                                marginBottom={10}
                            />
                            {signature ?
                                <TouchableOpacity onPress={addSignature}>
                                    <Image
                                        source={{ uri: signature.uri }}
                                        style={styles.signatureImage}
                                        resizeMode="contain"

                                    />
                                </TouchableOpacity>

                                :

                                <TouchableOpacity onPress={addSignature} style={{ flex: 1 }} >

                                    <CustomTextInput
                                        placeholder={placeholders.addSignature}
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




                            }
                        </View>














                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
                        <Text style={styles.submitButtonText}>Submit Form</Text>
                    </TouchableOpacity>




                </View>

            </KeyboardAwareScrollView >
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
            <DateTimePickerModal
                isVisible={showDateTime}
                mode="datetime"
                maximumDate={new Date()}
                onConfirm={handleConfirmDateTime}
                onCancel={hideDateTime}
            />
            <DateTimePickerModal
                isVisible={showDateReviewed}
                mode="date"
                maximumDate={new Date()}
                onConfirm={handleConfirmDateReviwer}
                onCancel={hideDateReviewer}
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

            <PickerComponent
                visible={showRiskLevel}
                selectedValue={selectedRiskLevelValue}
                onClose={toggleRiskLevel}
                done={doneRiskLevel}
                text={headings.AssessmentofRisk}
                items={riskLevels}
            />
            <PickerComponent
                visible={showPickerExploitation}
                selectedValue={selectedPickerExploitationValue}
                onClose={toggleExploitationPicker}
                done={doneExploitation}
                text={headings.LikelyFormofExploitation}
                items={exploitationTypes}
            />

            <PickerComponent
                visible={showPickerInternal}
                selectedValue={selectedPickerInternalValue}
                onClose={toggleInternalPicker}
                done={doneInternal}
                text={headings.internalAction}
                items={internalAction}
            />
            <PickerComponent
                visible={showPickerExternal}
                selectedValue={selectedPickerExternalValue}
                onClose={toggleExternalPicker}
                done={doneExternal}
                text={headings.externalReporting}
                items={externalReporting}
            />
            <SignatureModal
                isVisible={modalSignVisible}
                onClose={() => setModalSignVisible(false)}
                onSaveSignature={handleSaveSignature}

            />








        </View >
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
