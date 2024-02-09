import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import walkingalone from '../assets/images/dark.jpg';
import SSOButton from '../src/components/SSOButton';
import { form } from '../src/reusable/styles/Form';
import { buttons } from '../src/reusable/styles/Button';
import { layout } from '../src/reusable/styles/LayOut';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log({ response });
      if (response) {
        setLoading(false);
        navigation.navigate('FrontPage');
      }
    } catch (error) {
      // Cast the error to FirebaseAuthError type
      if (
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-credential'
      ) {
        Alert.alert('Failed to log in', 'Invalid email or password', [
          { text: 'Close' },
        ]);
      } else {
        console.error('Error signing in:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={walkingalone}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={layout.fullWidthCenter}>
          <View>
            <Text style={styles.header}>Login</Text>
            <TextInput
              style={form.input20}
              placeholder="Email"
              placeholderTextColor="white"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={form.input20}
              placeholder="Password"
              placeholderTextColor="white"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <View style={buttons.btnRaduis10}>
              <Button
                title={loading ? 'Loading...' : 'Login'}
                color="white"
                onPress={() => handleSignIn()}
                disabled={loading}
              />
            </View>
          </View>
          <View>
            <Text style={[styles.whiteText, styles.centerBox]}>OR</Text>
            <SSOButton />
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.whiteText}>Don't have an accoount?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: 'white',
    fontSize: 25,
    marginBottom: 10,
  },
  centerBox: {
    textAlign: 'center',
    margin: 15,
  },
  whiteText: {
    color: 'white',
  },
  signUpLink: {
    color: 'white',
    marginLeft: 10,
    textDecorationStyle: 'solid',
    textDecorationColor: 'white',
    textDecorationLine: 'underline',
  },
  signUpContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
});

export default Login;
