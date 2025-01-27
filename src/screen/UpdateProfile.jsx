import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateProfile({ navigation, route }) {
    // Retrieve user data passed from ProfileScreen via navigation
    const { userData } = route.params || {};
console.log("userData from route params:", userData);
    // Log to verify if userData is passed
   if (!userData) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>User data not found!</Text>
            </View>
        );
    }

     const [name, setName] = useState(userData.name || ''); // Store user name
    const [bio, setBio] = useState(userData.bio || '');   // Bio is optional
    const [profession, setProfession] = useState(userData.profession || ''); // Profession is optional

//    useEffect(() => {
//         // Optional: You can fetch additional data or perform any side-effects here
//     }, []); 

    const handleUpdateProfile = async () => {
        const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage

        const updateData = {
            token,
            name: userData.name, // Send the current name (for user identification)
            newName: userData.name, // Only send newName if it's updated
            bio,                // Send updated bio
            profession,         // Send updated profession
        };

        try {
            const response = await axios.post('https://your-backend-api.com/update-profile', updateData);

            if (response.data.success) {
                Alert.alert('Success', 'Profile updated successfully');
                navigation.goBack();  // Navigate back to the previous screen
            } else {
                Alert.alert('Failed', 'Failed to update profile');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'There was an error updating your profile');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Update Profile</Text>
            
            {/* Name Input */}
            <TextInput
                style={styles.input}
                value={userData.name}
                placeholder="Name"
                onChangeText={(text) => setUserData({ ...userData, name: text })}
            />
            
            {/* Bio Input */}
            <TextInput
                style={styles.input}
                value={bio}
                placeholder="Bio"
                onChangeText={(text) => setBio(text)} // Bio field update
            />
            
            {/* Profession Input */}
            <TextInput
                style={styles.input}
                value={profession}
                placeholder="Profession"
                onChangeText={(text) => setProfession(text)} // Profession field update
            />
            
            {/* Update Profile Button */}
            <Button title="Update Profile" onPress={handleUpdateProfile} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: '#f9f7f4' 
    },
    header: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 20 
    },
    input: { 
        height: 50, 
        borderColor: '#ccc', 
        borderWidth: 1, 
        borderRadius: 10, 
        marginBottom: 15, 
        paddingLeft: 10 
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
