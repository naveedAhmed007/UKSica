import React, { useState, useMemo } from "react";

import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/Ionicons";
import countries from "world-countries";
import { FlatList, KeyboardAwareScrollView, 
    Modal, SafeAreaView, 
    TextInput, TouchableOpacity, View,StyleSheet, 
    Platform,Text,
    StatusBar,
    colors} from "../utils/imports";

interface CountryPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: string) => void;
}

const CountryPickerModal: React.FC<CountryPickerModalProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const [search, setSearch] = useState("");

  const countryList = useMemo(
    () =>
      countries.map((country) => ({
        name: country.name.common,
        flag: country.flag,
        demonym: country.demonyms?.eng?.m || "N/A",
      })),
    []
  );

  const filteredCountries = useMemo(
    () =>
      countryList.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, countryList]
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Select Country</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={moderateScale(22)} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <Icon name="search" size={moderateScale(20)} color="#999" />
            <TextInput
              placeholder="Search country..."
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>

          {/* Country List */}
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scrollViewContent}
          >
            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    onSelect(item.name);
                    onClose();
                  }}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <View style={styles.textContainer}>
                    <Text style={styles.countryName} numberOfLines={1} ellipsizeMode="tail">
                      {item.name}
                    </Text>
                    <Text style={styles.demonym} numberOfLines={1} ellipsizeMode="tail">
                      {item.demonym}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.loaderBackDropColor,
    justifyContent: "center",
  },
  safeArea: {
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    overflow: "hidden",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.headerColor,
    padding: moderateScale(15),
  },
  headerText: {
    fontSize: moderateScale(18),
    color: colors.white,
    fontWeight: "bold",
  },
  closeButton: {
    padding: moderateScale(5),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.searchContainerBackgroundColor, 
    marginHorizontal: moderateScale(15),
    borderRadius: moderateScale(12), // More rounded for a modern look
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(15),
    marginTop: moderateScale(10),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 3, 
  },
  searchInput: {
    flex: 1,
    marginLeft: moderateScale(10),
    fontSize: moderateScale(16),
    color: "#333",
    fontWeight: "500",
  },
  scrollViewContent: {
    paddingBottom: moderateScale(20),
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: moderateScale(15),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  flag: {
    fontSize: moderateScale(22),
    marginRight: moderateScale(10),
  },
  textContainer: {
    flex: 1,
    flexShrink: 1,
  },
  countryName: {
    fontSize: moderateScale(16),
    color: "#333",
    fontWeight: "bold",
  },
  demonym: {
    fontSize: moderateScale(14),
    color: "#666",
  },
});

export default CountryPickerModal;
