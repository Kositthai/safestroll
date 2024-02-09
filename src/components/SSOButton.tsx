import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import SSOIcon from '../../assets/images/signUp.jpg';

const SSOButton: React.FC = () => {
  return (
    <TouchableOpacity style={styles.wrapperImage}>
      <Image source={SSOIcon} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapperImage: {
    overflow: 'hidden',
  },
  image: {
    borderRadius: 10,
  },
});

export default SSOButton;
