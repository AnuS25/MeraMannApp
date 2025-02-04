import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from './Auth'; // Assuming the context is in the `Auth` file

export default function AccountScreen({ navigation }) {
    const { userData: authUserData, logout } = useAuth();  // Renamed 'userData' to 'authUserData' to avoid conflict
    const [userName, setUserName] = useState('');  // State to store the user's name

    
   useEffect(() => {
        const fetchUserName = async () => {
            try {
                // Fetch user data using authUserData (previously userData)
                const response = await fetch('https://your-backend-api.com/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authUserData.token}`  // Use the renamed authUserData
                    }
                });
                const data = await response.json();
                if (data && data.name) {
                    setUserName(data.name);  // Set the fetched name in the state
                } else {
                    console.log('No name found in the response');
                }
            } catch (error) {
                console.error('Error fetching user name:', error);
            }
        };

        if (authUserData) {
            fetchUserName();
        }
    }, [authUserData]);  // Now 'fetchUserName' is inside the useEffect hook, so no need to list it in the dependencies

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
                <Text style={styles.profileName}>{userName || 'Loading...'}</Text>
                <TouchableOpacity style={styles.settingsButton}>
                    <Text style={styles.settingsText}>⚙</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.optionsContainer}>
                {[
                    'Personal Insights',
                    'View psychological profile',
                    'View goals',
                ].map((option, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.option} 
                        onPress={() => {
                            if (option === 'View psychological profile') {
                                navigation.navigate('ProfileDetails');  // Navigate to the ProfileDetails page
                            } else if (option === 'View goals') {
                                navigation.navigate('TrackingHistory'); // Navigate to the TrackingHistory screen
                            } else if (option === 'Personal Insights') {
                                navigation.navigate('Moodhistory');
                            }
                        }}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.cardsContainer}>
                {/* Streaks Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Streaks</Text>
                    <Text style={styles.cardDescription}>Track your consecutive tasks completed</Text>
                    <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => navigation.navigate('Streaks')}  // Navigate to Streaks screen
                    >
                        <Text style={styles.cardButtonText}>View Streaks</Text>
                    </TouchableOpacity>
                </View>

                {/* Rewards Card */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Records and Logs</Text>
                    <Text style={styles.cardDescription}>All your past entries</Text>
                    <TouchableOpacity
                        style={styles.cardButton}
                        onPress={() => navigation.navigate('Record')}  // Navigate to Rewards screen
                    >
                        <Text style={styles.cardButtonText}>View Rewards</Text>
                    </TouchableOpacity>
                </View>

                {/* Other Cards */}
                {[
                    { title: 'Daily reminder', description: 'Build your routine' },
                    { title: 'Insights', description: 'Mood, stress and other insights' },
                    { title: 'Bookmarks', description: "Pages you've bookmarked" },
                    { title: 'Rewards', description: 'See your earned rewards for completed tasks' },
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
    cardButton: { marginTop: 10, backgroundColor: '#4CAF50', padding: 8, borderRadius: 5 },
    cardButtonText: { color: '#fff', textAlign: 'center' },
    logoutButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f44336',
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: { color: '#fff', fontSize: 16 },
});
