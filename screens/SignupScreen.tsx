import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SignupScreen() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    if (!formData.email || !formData.password || !formData.fullName || !formData.username) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, 'users', user.uid), {
        email: formData.email,
        fullName: formData.fullName,
        username: formData.username.toLowerCase(),
        createdAt: new Date().toISOString(),
      });

      router.replace('/(tabs)');
    } catch (err: any) {
      setError(
        err.code === 'auth/email-already-in-use'
          ? 'Bu e-posta adresi zaten kullanımda'
          : 'Kayıt olurken bir hata oluştu'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ThemedView style={styles.content}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <ThemedView style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="E-posta"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Ad Soyad"
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="Kullanıcı adı"
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Şifre"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
          />

          {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <ThemedText style={styles.buttonText}>Kayıt Ol</ThemedText>
            )}
          </Pressable>
        </ThemedView>

        <ThemedView style={styles.footer}>
          <ThemedText>Hesabın var mı? </ThemedText>
          <Pressable onPress={() => router.push('/login')}>
            <ThemedText style={styles.link}>Giriş Yap</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    height: 64,
    width: '100%',
    marginBottom: 32,
  },
  form: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#0095f6',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ed4956',
    textAlign: 'center',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  link: {
    color: '#0095f6',
    fontWeight: '600',
  },
}); 