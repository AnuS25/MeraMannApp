import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MoodHistory from './src/screen/MoodTrackerScreen';
import LoginScreen from './src/screen/LoginScreen';
import UpdateProfile from './src/screen/UpdateProfile' ;
import AccountScreen from './src/screen/AccountScreen';
import ProfileDetails from './src/screen/ProfileDetails.jsx'
const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    
      <Stack.Navigator>
      <Stack.Screen initialRouteName="ProfilePage"
          options={{headerShown: false}}
          name="ProfilePage"
          component={AccountScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Moodhistory"
          component={MoodHistory}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="UpdateProfile"
          component={UpdateProfile}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ProfileDetails"
          component={ProfileDetails}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
      </Stack.Navigator>
    
  );
};

export default ProfileNavigator;

const styles = StyleSheet.create({});