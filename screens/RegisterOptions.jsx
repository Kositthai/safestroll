import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import womanIcon from '../assets/images/phone.png';
import { buttons } from '../src/reusable/styles/Button';

function RegisterOptions() {
  return (
    <View style={styles.container}>
      <View style={styles.centerBox}>
        <Text style={styles.shortMessage}>Do you know?</Text>
        <Text style={styles.shortMessage}>
          "Half of the female population do not feel safe walking alone at night
          even in busy places"
        </Text>
      </View>
      <Image
        source={womanIcon}
        style={{ width: '50%', height: '50%', color: 'white' }}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="I would like to volunteer"
          color="red"
          style={[buttons.btnRaduis10]}
        />
        <Button
          title="I want somebody to talk to be on the way home"
          color="red"
          width={'50%'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6e3e3',
    flex: 1,
  },
  shortMessage: {
    fontSize: 20,
    fontFamily: 'Frank Ruhl Libre',
    color: 'red',
    fontWeight: '800',
    textAlign: 'center',
  },
  centerBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '50%',
  },
});

export default RegisterOptions;
