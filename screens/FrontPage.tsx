import React from 'react';
import { Button, Text } from 'react-native';
import { FIREBASE_AUTH } from '../FirebaseConfig';

function FrontPage() {
  return (
    <>
      <Text>Front page</Text>
      <Button title="Signout" onPress={() => FIREBASE_AUTH.signOut()} />
    </>
  );
}

export default FrontPage;
