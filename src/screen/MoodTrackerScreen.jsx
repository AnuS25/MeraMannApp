import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const MoodHistory = () => {
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();  // Access navigation

  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          alert('User is not logged in!');
          return;
        }

        const response = await axios.get('https://mentalapp-backend.onrender.com/moods/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
if (response.status === 200) {
        setMoodHistory(response.data.moodHistory);  // Update state with fetched mood history
      } else {
        alert('No mood history found.');
      }
    } catch (error) {
      if (error.response) {
        // If server responds with error status
        if (error.response.status === 404) {
          alert('Mood history not found.');
        } else {
          alert(`Error: ${error.response.data.error || error.response.data.message}`);
        }
      } else {
        // Network or other errors
        console.error('Error fetching mood history:', error);
        alert('Error fetching mood history.');
      }
    } finally {
      setLoading(false);
    }
  };
    //     setMoodHistory(response.data.moodHistory);  // Update state with fetched mood history
    //     setLoading(false);  // Stop loading once data is fetched
    //   } catch (error) {
    //     console.error('Error fetching mood history:', error);
    //     setLoading(false);
    //   }
    // };

    fetchMoodHistory();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
    {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{"< Back"}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Mood History</Text>
      {moodHistory.length === 0 ? (
        <Text>No mood history found.</Text>
      ) : (
        moodHistory.map((item, index) => (
          <View key={index} style={styles.moodCard}>
            <Text style={styles.mood}>{item.mood}</Text>
            {item.note && <Text style={styles.note}>{item.note}</Text>}
            <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f7f4',
    padding: 16,
  },
  backButton: {
    marginBottom: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007BFF',  // Customize color as per your theme
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  moodCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mood: {
    fontSize: 28,
  },
  note: {
    fontSize: 16,
    color: '#555',
    marginVertical: 8,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
});

export default MoodHistory;
