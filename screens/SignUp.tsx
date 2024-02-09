import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import walkingalone from '../assets/images/dark.jpg';
import { NavigationScreenProps } from 'react-navigation';
import SSOButton from '../src/components/SSOButton';
import { form } from '../src/reusable/styles/Form';
import { buttons } from '../src/reusable/styles/Button';
import { layout } from '../src/reusable/styles/LayOut';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

interface SignUpProps {
  navigation: NavigationScreenProps;
  route: NavigationScreenProps;
}

const SignUp: React.FC<SignUpProps> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    setLoading(true);
    const authUser = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    // involking fireStore
    const db = getFirestore();
    const userCollection = collection(db, 'users');
    const data = await addDoc(userCollection, {
      uid: authUser.user.uid,
      email: authUser.user.email,
      role: route.params.role,
    });
    setLoading(false);
    if (data) {
      navigation.navigate('FrontPage');
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
            <Text style={styles.header}>SIGN UP</Text>
            <TextInput
              style={form.input20}
              placeholder="Email"
              placeholderTextColor="white"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              style={form.input20}
              placeholder="Password"
              placeholderTextColor="white"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry
            />
            <View style={buttons.btnRaduis10}>
              <Button
                title={loading ? 'Loading...' : 'Sign Up'}
                onPress={() => handleSignUp()}
                disabled={loading}
                color="white"
              />
            </View>
          </View>

          <View style={styles.styledSignUpContainer}>
            <Text style={styles.whiteText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={[styles.whiteText, styles.centerBox]}>OR</Text>
            <SSOButton />
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
  signInLink: {
    color: 'white',
    marginLeft: 10,
    textDecorationStyle: 'solid',
    textDecorationColor: 'white',
    textDecorationLine: 'underline',
  },
  styledSignUpContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
});
export default SignUp;
