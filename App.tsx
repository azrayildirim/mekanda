import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NearbyPlacesMap from './screens/NearbyPlacesMap';
import ProfileScreen from './screens/ProfileScreen';

export type RootStackParamList = {
  Map: undefined;
  Profile: { personId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Map"
        screenOptions={{
          headerShown: true,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen 
          name="Map" 
          component={NearbyPlacesMap}
          options={{ title: 'Harita' }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{ title: 'Profil' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 