import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

interface Guard {
  id: string;
  name: string;
  siaNumber: string;
}

const GuardList: React.FC = () => {
  const [guards, setGuards] = useState<Guard[]>([]);
  const [name, setName] = useState<string>('');
  const [siaNumber, setSiaNumber] = useState<string>('');

  // Function to add a new guard
  const addGuard = () => {
    if (name.trim() && siaNumber.trim()) {
      const newGuard: Guard = {
        id: Date.now().toString(),
        name: name.trim(),
        siaNumber: siaNumber.trim(),
      };
      setGuards(prevGuards => [...prevGuards, newGuard]);
      setName(''); // Reset name field
      setSiaNumber(''); // Reset SIA number field
    } else {
      alert('Please enter both name and SIA number');
    }
  };

  // Function to remove a guard from the list
  const removeGuard = (id: string) => {
    setGuards(prevGuards => prevGuards.filter(guard => guard.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Names and SIA Number of Guards</Text>

      {/* Input fields for Guard's Name and SIA Number */}
      <TextInput
        style={styles.input}
        placeholder="Enter Guard's Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter SIA Number"
        value={siaNumber}
        keyboardType="numeric"
        onChangeText={setSiaNumber}
      />

      {/* Button to add a guard to the list */}
      <Button title="Add Guard" onPress={addGuard} />

      {/* Displaying the list of guards */}
      {guards.length > 0 && (
        <View style={styles.guardListContainer}>
          <Text style={styles.subHeader}>Guard List</Text>
          <FlatList
            data={guards}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.guardItem}>
                <Text style={styles.guardText}>{item.name} (SIA: {item.siaNumber})</Text>
                <TouchableOpacity onPress={() => removeGuard(item.id)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  guardListContainer: {
    marginTop: 20,
  },
  guardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  guardText: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GuardList;
