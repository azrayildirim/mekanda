import React, { useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native';

export default function AddMemberScreen() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const memberData = {
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
      };

      await addDoc(collection(db, 'members'), memberData);
      router.back();
    } catch (err) {
      setError('Üye eklenirken bir hata oluştu');
      console.error('Error adding member:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Yeni Üye Ekle',
          headerShown: true,
          presentation: 'modal',
        }}
      />
      <ScrollView style={styles.container}>
        <ThemedView style={styles.form}>
          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.label}>Ad Soyad</ThemedText>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Ad Soyad giriniz"
              placeholderTextColor="#666"
            />
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.label}>E-posta</ThemedText>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="E-posta giriniz"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </ThemedView>

          {error && (
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          )}

          <ThemedView
            style={[styles.button, loading && styles.buttonDisabled]}
            onTouchEnd={!loading ? handleSubmit : undefined}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <ThemedText style={styles.buttonText}>Üye Ekle</ThemedText>
            )}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
}); 