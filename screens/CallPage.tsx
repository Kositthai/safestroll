import React, { useEffect, useState } from 'react';
import { Voice } from '@twilio/voice-react-native-sdk';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { Text } from 'react-native';
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from 'firebase/firestore';

function CallPage() {
  const [userAccessUid, setUserAccessUid] = useState(null);
  const [volunteerAccessUid, setVolunteerAccessUid] = useState(null);

  const fetchUserAccessUid = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      console.log(user);
      if (user) {
        setUserAccessUid(user.uid);
      } else {
        console.error('User not authenticated');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // get volunteer uid for connect

  const handleMatching = async () => {
    const db = getFirestore();

    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('role', '==', 'volunteer'));

    const volunteerDocs = [];
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      volunteerDocs.push({ id: doc.id, data: doc.data() });
    });

    // Randomly select one volunteer
    const randomIndex = Math.floor(Math.random() * volunteerDocs.length);
    const randomVolunteer = volunteerDocs[randomIndex];

    console.log({ randomVolunteer });
  };
  // Call the function to fetch access Uid

  useEffect(() => {
    const test = async () => {
      const token = fetchUserAccessUid();
      const volunteer = handleMatching();
      //   const voice = new Voice();

      //   // Allow incoming calls
      //   // @ts-ignore
      //   await voice.register(token);

      //   // Handle incoming calls
      //   // @ts-ignore
      //   voice.on('callInvite', (callInvite) => {
      //     callInvite.accept();
      //   });

      //   // @ts-ignore
      //   const call = await voice.connect(token, params);
    };
    test();
  }, []);

  return <Text>{userAccessUid ? 'Call page' : 'Loading...'}</Text>;
}

export default CallPage;
