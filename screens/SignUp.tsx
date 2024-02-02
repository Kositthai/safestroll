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
import { NavigationScreenProps } from 'react-navigation';
import SSOButton from '../src/components/SSOButton';
import { form } from '../src/reusable/styles/Form';
import { buttons } from '../src/reusable/styles/Button';
import { layout } from '../src/reusable/styles/LayOut';

interface SignUpProps {
  navigation: NavigationScreenProps;
}

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={walkingalone}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={layout.fullWidthCenter}>
          <View style={styles.inputContainer}>
            <Text style={styles.signUpTitle}>SIGN UP</Text>
            <TextInput style={form.input20} placeholder="Full name" />
            <TextInput style={form.input20} placeholder="Username" />
            <TextInput style={form.input20} placeholder="Password" />
            <View style={buttons.btnRaduis10}>
              <Button
                title="Sign up"
                color="red"
                onPress={() => navigation.navigate('RegisterOptions')}
              />
            </View>
          </View>
          <View style={styles.styledSpaceBetween}>
            <Text style={[styles.whiteText, styles.centerBox]}>OR</Text>
            <SSOButton label="Sign up with Google" />
          </View>
          <View style={styles.styledSignUpContainer}>
            <Text style={styles.whiteText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.styledSignUpText}>Sign in</Text>
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
  imageBackground: {
    flex: 1,
  },

  inputContainer: {
    width: '60%',
  },
  centerBox: {
    textAlign: 'center',
    margin: 10,
  },
  whiteText: {
    color: 'white',
  },
  styledSignUpText: {
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
  signUpTitle: {
    color: 'white',
    fontSize: 25,
    marginBottom: 10,
  },
  styledSpaceBetween: {
    marginBottom: 10,
  },
});
export default SignUp;
