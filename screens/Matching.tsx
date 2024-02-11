import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  doc,
  addDoc, 
  setDoc
} from 'firebase/firestore';
import { RTCPeerConnection, mediaDevices } from 'react-native-webrtc';

const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

function Matching() {
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

  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();
  const [isMuted, setIsMuted] = useState(false);
  const [isOffCam, setIsOffCam] = useState(false);

  const db = getFirestore()

  const startLocalStream = async () => {
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();
    const facing = isFront ? 'front' : 'environment';

    // @ts-ignore
    const videoSourceId = devices.find(
      (device) => device.kind === 'videoinput' && device.facing === facing
    );

    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
      },
    };

    // newStream is use to ask the premission from user to allow access to devices
    const newStream = await mediaDevices.getUserMedia(constraints);
    // @ts-ignore
    setLocalStream(newStream);
  };

  const startCall = async (id: any) => {
    const localPC = new RTCPeerConnection(configuration);
    // @ts-ignore
    localStream.getStacks().forEach((track) => {
      localPC.addTrack(track, localStream);
    });

    const roomRef = doc(db, 'room', id);
    const callerCandidatesCollection = collection(roomRef, 'callerCandidates');
    const calleeCandidatesCollection = collection(roomRef, 'calleeCandidates');

    localPC.addEventListener("icecandidate", (e) => {
      if (!e.candidate) {
        console.log("Got final candidate!");
        return;
      }
      addDoc(callerCandidatesCollection, e.candidate.toJSON());
    });

    localPC.ontrack = (e) => {
      const newStream = new MediaStream();
      e.streams[0].getTracks().forEach((track) => {
        newStream.addTrack(track);
      });
      setRemoteStream(newStream);
    };

    const offer = await localPC.createOffer();
    await localPC.setLocalDescription(offer);

    await setDoc(roomRef, { offer, connected: false }, { merge: true });
  };

 



  return <View style={styles.container}></View>;
}

export default Matching;

const styles = StyleSheet.create({
  video: {
    backgroundColor: 'black',
    width: '100%',
    height: 300,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
});

// const [localStream, setLocalStream] = useState(null);
// const [volunteerStream, setVolunteerStream] = useState(null);
// const [peerConnection, setPeerConnection] = useState(null);
// const startLocalStream = async () => {
//   const isFront = true;

//   // use to request currently media input and output devices such as microphone, cameras, headsets
//   // return promise of an array that user allow to access and OMIT any device that are block
//   // no parameters
//   const devices = await mediaDevices.enumerateDevices();

//   const facing = isFront ? 'front' : 'environment';
//   // @ts-ignore
//   const videoSourceId = devices.find(
//     (device) => device.kind === 'videoinput' && device.facing === facing
//   );

//   const facingMode = isFront ? 'user' : 'environment';

//   const constraints = {
//     audio: true,
//     video: {
//       mandatory: {
//         minWidth: 500, // Provide your own width, height and frame rate here
//         minHeight: 300,
//         minFrameRate: 30,
//       },
//       facingMode,
//       optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
//     },
//   };

//   // newStream is use to ask the premission from user to allow access to devices
//   const newStream = await mediaDevices.getUserMedia(constraints);
//   // @ts-ignore
//   setLocalStream(newStream);
// };

// const startCall = async (id: any) => {
//   // RTCPeerConnection use to connnect localStream peer to remoteStream peer
//   //
//   const localPC = new RTCPeerConnection(configuration);
//   // @ts-ignore
//   localPC.addStream(localStream);

// };
