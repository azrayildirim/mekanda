import React from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Member } from '../../types/member';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome } from '@expo/vector-icons';

const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
  return (
    <ThemedView style={styles.memberCard}>
      <ThemedText style={styles.memberName}>{member.name}</ThemedText>
      <ThemedText style={styles.memberEmail}>{member.email}</ThemedText>
      <ThemedText style={styles.memberDate}>{member.joinDate}</ThemedText>
    </ThemedView>
  );
};

export default function MembersScreen() {
  const [members, setMembers] = React.useState<Member[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const membersCollection = collection(db, 'members');
      const membersSnapshot = await getDocs(membersCollection);
      const membersList = membersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Member[];
      
      setMembers(membersList);
    } catch (err) {
      setError('Üyeler yüklenirken bir hata oluştu');
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = () => {
    router.push('/(tabs)/add-member');
  };

  if (loading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable onPress={handleAddMember}>
              <ThemedView style={styles.headerButton}>
                <FontAwesome name="plus" size={20} color="#007AFF" />
              </ThemedView>
            </Pressable>
          ),
          title: 'Üyeler',
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MemberCard member={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  memberCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  memberEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  memberDate: {
    fontSize: 14,
    color: '#888',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
}); 