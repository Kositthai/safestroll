import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { buttons } from '../src/reusable/styles/Button';
import walkalone from '../assets/images/wave-red-black.png';
import { layout } from '../src/reusable/styles/LayOut';
import { TouchableOpacity } from 'react-native-web';

function RegisterOptions() {
  return (
    <View style={styles.container}>
      <ImageBackground source={walkalone} style={layout.fullWidthCenter}>
        <View style={styles.centerBox}>
          <Text style={styles.shortMessage}>Do you know?</Text>
          <Text style={styles.shortMessage}>
            Half of the female population<br></br>do not feel safe walking alone
            <br></br>
            at night even in busy places
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.whiteText}>I would like to volunteer</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.whiteText}>
                I want somebody to talk to be on the way home
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shortMessage: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    fontFamily: 'Klee One',
  },
  centerBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '30%',
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
  },
});

export default RegisterOptions;
