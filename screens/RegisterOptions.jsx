import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import walkalone from '../assets/images/wave-red-black.png';
import { layout } from '../src/reusable/styles/LayOut';

const RegisterOptions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={walkalone} style={layout.fullWidthCenter}>
        <View style={styles.centerBox}>
          <Text style={styles.whiteText}>Join Safe Stroll community</Text>
          <Text style={[styles.shortMessage, styles.marginTitle]}>
            Do you know?
          </Text>
          <Text style={styles.shortMessage}>
            Half of the female population<br></br>do not feel safe walking alone
            <br></br>
            at night even in busy places
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp', { role: 'volunteer' })}
          >
            <View style={styles.button}>
              <Text style={styles.whiteText}>
                I would like to be a volunteer
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp', { role: 'needer' })}
          >
            <View style={styles.button}>
              <Text style={styles.whiteText}>I need assistent</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shortMessage: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  centerBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15%',
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'rgba(248, 124, 124, 0.5)',
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
  whiteText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  marginTitle: {
    marginTop: 30,
  },
});

export default RegisterOptions;
