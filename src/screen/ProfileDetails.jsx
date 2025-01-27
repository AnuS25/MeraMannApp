import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileDetails() {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log("No token found.");
        return;
      }

      const response = await axios.get('https://your-api-url.com/userdata', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data); // Set the user data in state
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when the screen loads
  }, []);

  return (
    <View style={styles.container}>
      {userData ? (
        <Text style={styles.text}>Welcome, {userData.name}</Text>
      ) : (
        <Text style={styles.text}>Loading user data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});


export default ProfileDetails;
