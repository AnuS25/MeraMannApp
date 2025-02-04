import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, ScrollView, TouchableOpacity } from 'react-native';

// Define mood categories
const moodCategories = {
  happy: [
    { mood: "Hopeful", activity: "Take a walk", prompt: "Why do you feel hopeful today?" },
    { mood: "Content", activity: "Practice gratitude", prompt: "What are you grateful for?" },
  ],
  sad: [
    { mood: "Anxious", activity: "Do a breathing exercise", prompt: "What is making you feel anxious?" },
    { mood: "Lonely", activity: "Journal your feelings", prompt: "Who do you wish you could talk to right now?" },
  ],
  angry: [
    { mood: "Frustrated", activity: "Do a short meditation", prompt: "What triggered your frustration?" },
    { mood: "Irritated", activity: "Take a break", prompt: "What could help you calm down?" },
  ],
  calm: [
    { mood: "Relaxed", activity: "Read a book", prompt: "What makes you feel calm?" },
    { mood: "Peaceful", activity: "Listen to calming music", prompt: "When was the last time you felt truly at peace?" },
  ],
};

export default function MoodTrackerBingoScreen() {
  const [completedMoods, setCompletedMoods] = useState([]);
  const [userMood, setUserMood] = useState('');
  const [customMoods, setCustomMoods] = useState({
    happy: [],
    sad: [],
    angry: [],
    calm: [],
  });

  const handleCompleteMood = (mood, activity) => {
    if (completedMoods.includes(mood)) {
      Alert.alert("You've already tracked this mood!");
      return;
    }
    setCompletedMoods([...completedMoods, mood]);
    Alert.alert("Mood Tracked!", `You completed the mood: ${mood} with the activity: ${activity}`);
  };

  const handleCustomMoodChange = (category, mood) => {
    setCustomMoods({
      ...customMoods,
      [category]: [...customMoods[category], mood],
    });
  };

  const checkForBingo = () => {
    if (completedMoods.length >= 5) {
      Alert.alert("Congratulations!", "You’ve got a Bingo!");
    }
  };

  const renderMoodButton = (mood, activity, category) => (
    <TouchableOpacity
      key={mood}
      style={[
        styles.moodButton,
        completedMoods.includes(mood) && styles.moodButtonCompleted
      ]}
      onPress={() => handleCompleteMood(mood, activity)}
    >
      <Text style={styles.moodButtonText}>{mood}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Text style={styles.title}>Mental Health Mood Tracker</Text>
      <Text style={styles.subTitle}>Track your moods and complete activities!</Text>

      {/* Mood Categories */}
      {Object.keys(moodCategories).map((category) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
          {moodCategories[category].map(({ mood, activity }) =>
            renderMoodButton(mood, activity, category)
          )}
        </View>
      ))}

      {/* Custom Mood Input */}
      <View style={styles.customMoodContainer}>
        <Text style={styles.customMoodTitle}>Add Your Custom Mood</Text>
        <TextInput
          style={styles.customMoodInput}
          placeholder="Enter mood"
          value={userMood}
          onChangeText={setUserMood}
        />
        <TouchableOpacity
          style={styles.addMoodButton}
          onPress={() => handleCustomMoodChange('happy', userMood)}
        >
          <Text style={styles.addMoodButtonText}>Add Custom Mood</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.checkBingoButton} onPress={checkForBingo}>
        <Text style={styles.checkBingoText}>Check for Bingo</Text>
      </TouchableOpacity>

      {/* Mood Journal Prompt */}
      {completedMoods.length > 0 && (
        <View style={styles.journalContainer}>
          <Text style={styles.journalTitle}>Journaling Prompt</Text>
          <Text style={styles.journalText}>Reflect on your recent mood and activity. How do you feel?</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,  // Ensures scrollview can expand and scroll
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa', // Light blue to pastel gradient
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 15,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: 25,
    alignItems: 'center',
    width: '100%',
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  moodButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: 200,
    textAlign: 'center',
    alignItems: 'center',
  },
  moodButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  moodButtonCompleted: {
    backgroundColor: '#8BC34A',
  },
  customMoodContainer: {
    marginTop: 30,
    alignItems: 'center',
    width: '80%',
  },
  customMoodTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  customMoodInput: {
    height: 40,
    width: '100%',
    paddingLeft: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 8,
  },
  addMoodButton: {
    backgroundColor: '#FF9800',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    marginBottom: 20,
  },
  addMoodButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  checkBingoButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
  },
  checkBingoText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  journalContainer: {
    marginTop: 25,
    padding: 20,
    backgroundColor: '#e1f5fe',
    borderRadius: 8,
    width: '80%',
  },
  journalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  journalText: {
    fontSize: 16,
    marginTop: 10,
  },
});
