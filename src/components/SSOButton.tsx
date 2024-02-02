import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoogleButton from 'react-google-button';

interface SSOProps {
  label: string;
}

const SSOButton: React.FC<SSOProps> = ({ label }) => {
  return (
    <View>
      <View style={styles.styledGoogleButton}>
        <GoogleButton type="light" label={label} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  styledText: {
    color: 'white',
    textAlign: 'center',
  },
  styledGoogleButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default SSOButton;
