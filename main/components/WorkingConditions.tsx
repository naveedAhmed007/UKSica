import React, { useCallback, useState } from "react";
import CustomText from "./CustomText";
import RadioGroup from "./RadioGroup";
import { colors } from "../utils/Colors";
import fonts from "../utils/fonts";
import {
    Dimensions, FlatList, headings, Icon, Image, ImagePickerResponse, launchCamera,
    launchImageLibrary, moderateScale, placeholders, StyleSheet, TextInput, TouchableOpacity, uuid, View
} from "../utils/imports";
import { radioOptionsYNU } from "../utils/Options";
import CustomTextInput from "./CustomInput";
import ImagePickerModal from "./ImagePickerModal";
import { pick, types } from '@react-native-documents/picker';



interface ConditionProps {
    title: string;
    selectedValue: any;
    onValueChange: (value: any) => void;
    details: string;
    setDetails: (text: string) => void;
    isAttached?: boolean,
    attachedDocument?: (text: any) => void;
    isPhotoVideo?: boolean,
    isDocumentData?: boolean,



}

const WorkingConditions: React.FC<ConditionProps> = ({
    title, selectedValue, onValueChange, details, setDetails,
    isAttached = false, attachedDocument = () => { }, isPhotoVideo = false,
    isDocumentData = false,

}) => {
    const [selectedImages, setSelectedImages] = useState<any>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const addPhotos = useCallback(() => {
        if (isDocumentData == true) {
            pickDocument();

        }
        else {
            setIsModalVisible(!isModalVisible)
        }
    }, [isModalVisible])

    const openGallery = () => {
        setIsModalVisible(false)
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response: ImagePickerResponse) => {


            if (!response.didCancel && response.assets) {
                setSelectedImages([])
                const newImage = {
                    url: response.assets[0]?.uri,
                    id: uuid.v4(),
                    name: response.assets[0]?.fileName,
                    type: response.assets[0]?.type,
                };

                setSelectedImages((prevImages: any) => [...prevImages, newImage]);

                // Attach document data
                attachedDocument(newImage);

            }
        });
    };
    const openCamera = () => {
        setIsModalVisible(false)
        launchCamera({ mediaType: isPhotoVideo == true ? 'mixed' : 'photo', quality: 1 }, (response: ImagePickerResponse) => {
            if (!response.didCancel && response.assets) {
                setSelectedImages([])


                setSelectedImages([])
                const newImage = {
                    url: response.assets[0]?.uri,
                    id: uuid.v4(),
                    name: response.assets[0]?.fileName,
                    type: response.assets[0]?.type,
                };

                setSelectedImages((prevImages: any) => [...prevImages, newImage]);


                attachedDocument(newImage);


            }
        });
    };

    const pickDocument = async () => {
        try {
            setIsModalVisible(false)
            const result = await pick({
                type: [types.allFiles],
            });
            setSelectedImages([])

            const newData = {
                url: result[0].uri,
                id: uuid.v4(),
                name: result[0].name,
                type: result[0].nativeType,
            };
            setSelectedImages((prevImages: any) => [...prevImages, newData]);

            // Attach document data
            attachedDocument(newData);



            console.log('Selected file:', result);
        } catch (err) {

            console.error('Unknown error:', err);
        }

    };


    const renderEmptyComponent = () => {
        return (
            <TouchableOpacity onPress={addPhotos} style={{ flex: 1 }}>
                <CustomTextInput
                    placeholder={placeholders.addFiles}
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



    const renderAddItem = ({ item }: { item: { id: string; url: string; type: string } }) => (
        <TouchableOpacity onPress={addPhotos} style={styles.imageContainer}>
            {item?.type.startsWith('image/') ? (
                <Image source={{ uri: item.url }} style={styles.image} />
            ) : item?.type.startsWith('video/') ? (
                <Icon name="video-camera" size={50} color="black" />
            ) : (
                <Icon name="file" size={50} color="black" />
            )}


        </TouchableOpacity>
    );
    return (
        <View style={styles.formGroup}>
            <CustomText
                title={title}
                color={colors.gray}
                fontSize={fonts.p}
                fontWeight="400"
                marginBottom={10}
            />
            <RadioGroup
                options={radioOptionsYNU}
                selectedValue={selectedValue}
                onValueChange={onValueChange}
            />
            {selectedValue.label === "Yes" && (
                <View>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        numberOfLines={4}
                        value={details}
                        onChangeText={setDetails}
                        placeholder="Enter Details"
                    />
                    {(isAttached == true || isPhotoVideo == true || isDocumentData==true) && <View style={styles.formGroup}>
                        <CustomText
                            title={headings.addFiles}
                            color={colors.gray}
                            fontSize={fonts.p}
                            fontWeight="400"
                            marginBottom={10}
                        />

                        <FlatList
                            data={selectedImages}
                            renderItem={({ item }) =>
                                renderAddItem({ item })
                            }
                            keyExtractor={(item) => item.id}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            // contentContainerStyle={styles.flatListContainer}
                            showsHorizontalScrollIndicator={false}
                            ListEmptyComponent={renderEmptyComponent}
                        />



                    </View>
                    }

                </View>

            )}

            <ImagePickerModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                openCamera={openCamera}
                openGallery={openGallery}
                openDocument={pickDocument}
                isDocumnet={isAttached}

            />

        </View>
    );
};

const styles = StyleSheet.create({
    formGroup: {
        marginBottom: moderateScale(15),
    },
    textInput: {
        height: moderateScale(100),
        marginTop: moderateScale(10),
        padding: 10,
        textAlignVertical: 'top',
        borderColor: colors.TextInputBorderColor,
        borderWidth: moderateScale(1),
        backgroundColor: colors.white,
        borderRadius: moderateScale(10),


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
});

export default WorkingConditions;
