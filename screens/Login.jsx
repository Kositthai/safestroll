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
import walkingalone from '../assets/dark.jpg';
import GoogleButton from 'react-google-button';

function Login({ navigation }) {
  return (
    <View style={styles.styledView}>
      <ImageBackground
        source={walkingalone}
        style={styles.styledImage}
        resizeMode="cover"
      >
        <View style={styles.styledContainer}>
          <View style={styles.styledInputContainer}>
            <Text style={styles.styledLogIn}>LOG IN</Text>
            <TextInput style={styles.styledInput} placeholder="Username" />
            <TextInput style={styles.styledInput} placeholder="Password" />
            <View style={styles.styledButton}>
              <Button style={styles.styledButton} title="Login" color="red" />
            </View>
          </View>
          <View>
            <Text style={styles.styledText}>OR</Text>
            <GoogleButton source={GoogleButton} type="light" />
          </View>
          <View style={styles.styledSignUpContainer}>
            <Text style={styles.styledSignUp}>Don't have an accoount?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.styledSignUpText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  styledView: {
    flex: 1,
  },
  styledImage: {
    flex: 1,
  },
  styledContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  styledInputContainer: {
    width: '60%',
  },
  styledInput: {
    color: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
    marginBottom: 10,
    width: '100%',
    height: '3rem',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styledText: {
    color: 'white',
    textAlign: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  styledSignUp: {
    color: 'white',
    margin: '.5rem',
  },
  styledSignUpText: {
    color: 'white',
    margin: '.5rem',
    textDecorationStyle: 'solid',
    textDecorationColor: 'white',
    textDecorationLine: 'underline',
  },
  styledSignUpContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  styledButton: {
    borderRadius: 10,
    overflow: 'hidden', // Ensure border radius works as expected
    marginTop: 10,
  },
  styledLogIn: {
    color: 'white',
    fontSize: 25,
    marginBottom: 10,
  },
});

export default Login;
