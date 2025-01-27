import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './Auth';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from './MenuScreen';
import TaskScreen from './TaskScreen';
import DailyScreen from './MealPlannerScreen';
import Home from './UserScreen'
import UpdateProfile from './UpdateProfile';
import ProfileDetails from './ProfileDetails';
export default function AccountScreen({navigation}) {
    
const { userData,logout } = useAuth();  // Access the logout function
 const handleNavigateToUpdateProfile = () => {
    if (userData) {
        navigation.navigate('ProfileDetails', { userData }); // Passing userData to the UpdateProfile screen
    } else {
        console.log('User data is not available');
    }
};
  const handleLogout = async () => {
    await logout();  // Log out and update the state
    navigation.reset({
    index: 0,  // Reset to the first route
    routes: [{ name: 'LOGIN' }],  // Define the screen to navigate to
  });
  };

   return (
    <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
            <Text style={styles.profileName}>Anisha Sailoni</Text>
            <TouchableOpacity style={styles.settingsButton}>
                <Text style={styles.settingsText}>⚙</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
            {[
                'Personal Insights',
                'View psychological profile',
                'View/edit goals',
                'Connect to SOS support',
                'Invite friends to Intellect',
            ].map((option, index) => (
                 <TouchableOpacity 
                        key={index} 
                        style={styles.option} 
                        onPress={() => {
                            if (option === 'View psychological profile') {
                                handleNavigateToUpdateProfile();  // Navigate to the UpdateProfile page
                            } else if (option === 'Personal Insights') {
                                navigation.navigate('Moodhistory');
                            }
                        }}>
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
            ))}
        </View>
        <View style={styles.cardsContainer}>
            {[
                { title: 'Daily reminder', description: 'Build your routine' },
                { title: 'Streaks & Rewards', description: 'View your achievements' },
                { title: 'Insights', description: 'Mood, stress and other insights' },
                { title: 'Bookmarks', description: "Pages you've bookmarked" },
                { title: 'Records and Logs', description: 'All your past entries' },
            ].map((card, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.cardTitle}>{card.title}</Text>
                    <Text style={styles.cardDescription}>{card.description}</Text>
                </View>
            ))}
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
    </ScrollView>
);
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f7f4' },
    profileHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
    profileName: { fontSize: 18, fontWeight: 'bold' },
    settingsButton: { padding: 10 },
    settingsText: { fontSize: 18, color: '#000' },
    optionsContainer: { paddingHorizontal: 20 },
    option: { padding: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10 },
    optionText: { fontSize: 16 },
    cardsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' },
    card: { width: '45%', padding: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 20 },
    cardTitle: { fontWeight: 'bold', marginBottom: 5 },
    cardDescription: { fontSize: 12 },
    logoutButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f44336',
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: { color: '#fff', fontSize: 16 },
});