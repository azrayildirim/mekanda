import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ route }) => {
  const { personId } = route.params;

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: `https://i.pravatar.cc/200?img=${personId}` }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Profil Detayları</Text>
      <Text style={styles.info}>Kullanıcı ID: {personId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProfileScreen; 