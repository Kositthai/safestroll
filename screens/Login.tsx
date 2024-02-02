import React from 'react';
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
import SSOButton from '../src/components/SSOButton';
import { form } from '../src/reusable/styles/Form';
import { buttons } from '../src/reusable/styles/Button';
import { layout } from '../src/reusable/styles/LayOut';

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={walkingalone}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={layout.fullWidthCenter}>
          <View style={styles.inputContainer}>
            <Text style={styles.loginText}>LOG IN</Text>
            <TextInput style={form.input20} placeholder="Username" />
            <TextInput style={form.input20} placeholder="Password" />
            <View style={buttons.btnRaduis10}>
              <Button title="Login" color="red" />
            </View>
          </View>
          <View style={styles.ssoContainer}>
            <Text style={[styles.whiteText, styles.centerBox]}>OR</Text>
            <SSOButton label="Sign in with Google" />
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
  inputContainer: {
    width: '60%',
  },
  centerBox: {
    color: 'white',
    textAlign: 'center',
    margin: 10,
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
  loginText: {
    color: 'white',
    fontSize: 25,
    marginBottom: 10,
  },
  ssoContainer: {
    marginBottom: 10,
  },
});

export default Login;
