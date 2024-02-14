// // import React, { useState, useEffect, useRef } from 'react';
// // import { Button, StyleSheet, View, Text } from 'react-native';
// // import {
// //   collection,
// //   query,
// //   where,
// //   getDocs,
// //   getFirestore,
// //   doc,
// //   addDoc,
// //   setDoc,
// // } from 'firebase/firestore';
// // import Daily from '@daily-co/daily-js';
// // import { Voice } from '@twilio/voice-react-native-sdk';

// // function Matching() {
// //   const handleMatching = async () => {
// //     const db = getFirestore();

// //     const usersCollection = collection(db, 'users');
// //     const q = query(usersCollection, where('role', '==', 'volunteer'));

// //     const volunteerDocs = [];
// //     const querySnapShot = await getDocs(q);
// //     querySnapShot.forEach((doc) => {
// //       volunteerDocs.push({ id: doc.id, data: doc.data() });
// //     });

// //     // Randomly select one volunteer
// //     const randomIndex = Math.floor(Math.random() * volunteerDocs.length);
// //     const randomVolunteer = volunteerDocs[randomIndex];

// //     console.log({ randomVolunteer });
// //   };

// //   const call = Daily.createFrame({
// //     videoSource: false,
// //     audioSource: true,
// //   });
// //   call.join({ url: 'https://vkositthai.daily.co/test' });

// //   return <Text></Text>;
// // }

// // export default Matching;

// // const styles = StyleSheet.create({
// //   video: {
// //     backgroundColor: 'black',
// //     width: '100%',
// //     height: 300,
// //   },
// //   container: {
// //     display: 'flex',
// //     flexDirection: 'row',
// //   },
// // });

// // const [localStream, setLocalStream] = useState(null);
// // const [volunteerStream, setVolunteerStream] = useState(null);
// // const [peerConnection, setPeerConnection] = useState(null);
// // const startLocalStream = async () => {
// //   const isFront = true;

// //   // use to request currently media input and output devices such as microphone, cameras, headsets
// //   // return promise of an array that user allow to access and OMIT any device that are block
// //   // no parameters
// //   const devices = await mediaDevices.enumerateDevices();

// //   const facing = isFront ? 'front' : 'environment';
// //   // @ts-ignore
// //   const videoSourceId = devices.find(
// //     (device) => device.kind === 'videoinput' && device.facing === facing
// //   );

// //   const facingMode = isFront ? 'user' : 'environment';

// //   const constraints = {
// //     audio: true,
// //     video: {
// //       mandatory: {
// //         minWidth: 500, // Provide your own width, height and frame rate here
// //         minHeight: 300,
// //         minFrameRate: 30,
// //       },
// //       facingMode,
// //       optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
// //     },
// //   };

// //   // newStream is use to ask the premission from user to allow access to devices
// //   const newStream = await mediaDevices.getUserMedia(constraints);
// //   // @ts-ignore
// //   setLocalStream(newStream);
// // };

// // const startCall = async (id: any) => {
// //   // RTCPeerConnection use to connnect localStream peer to remoteStream peer
// //   //
// //   const localPC = new RTCPeerConnection(configuration);
// //   // @ts-ignore
// //   localPC.addStream(localStream);

// // };

// // Import necessary libraries
// import React, { useState, useEffect } from 'react';
// import { View, Text, Button } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';

// const App = () => {
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStream, setRemoteStream] = useState(null);
//   const [volunteers, setVolunteers] = useState([]);
//   const [selectedVolunteer, setSelectedVolunteer] = useState(null);
//   const [isCalling, setIsCalling] = useState(false);
//   const [peerConnection, setPeerConnection] = useState(null);

//   useEffect(() => {
//     // Fetch available volunteers from Firestore
//     const fetchVolunteers = async () => {
//       const volunteersSnapshot = await firestore()
//         .collection('volunteers')
//         .get();
//       const volunteersData = volunteersSnapshot.docs.map((doc) => doc.data());
//       setVolunteers(volunteersData);
//     };
//     fetchVolunteers();
//   }, []);

//   const startCall = async () => {
//     try {
//       // Select a random volunteer
//       const randomIndex = Math.floor(Math.random() * volunteers.length);
//       const selectedVolunteer = volunteers[randomIndex];
//       setSelectedVolunteer(selectedVolunteer);

//       // Initialize WebRTC peer connection
//       const configuration = {
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//       };
//       const peerConnection = new RTCPeerConnection(configuration);
//       setPeerConnection(peerConnection);

//       // Add local stream to peer connection
//       const stream = await mediaDevices.getUserMedia({ audio: true });
//       // @ts-ignore
//       peerConnection.addStream(stream);
//       setLocalStream(stream);

//       // Create offer
//       // @ts-ignore
//       const offer = await peerConnection.createOffer();
//       await peerConnection.setLocalDescription(offer);

//       // Send offer to the selected volunteer
//       await firestore().collection('calls').add({
//         offer,
//         seekerId: 'your_seeker_id',
//         volunteerId: selectedVolunteer.id,
//       });

//       // Listen for incoming answer
//       firestore()
//         .collection('calls')
//         .where('volunteerId', '==', selectedVolunteer.id)
//         .onSnapshot((snapshot) => {
//           snapshot.docChanges().forEach((change) => {
//             const { answer } = change.doc.data();
//             peerConnection.setRemoteDescription(
//               new RTCSessionDescription(answer)
//             );
//           });
//         });

//       setIsCalling(true);
//     } catch (error) {
//       console.error('Error starting call:', error);
//     }
//   };

//   const endCall = () => {
//     if (peerConnection) {
//       peerConnection.close();
//     }
//     setLocalStream(null);
//     setRemoteStream(null);
//     setIsCalling(false);
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {isCalling ? (
//         <>
//           <RTCView
//             streamURL={localStream ? localStream.toURL() : null}
//             style={{ width: 200, height: 200, marginBottom: 20 }}
//           />
//           <RTCView
//             streamURL={remoteStream ? remoteStream.toURL() : null}
//             style={{ width: 200, height: 200 }}
//           />
//           <Button title="End Call" onPress={endCall} />
//         </>
//       ) : (
//         <>
//           <Text>No ongoing call</Text>
//           <Button
//             title="Start Call"
//             onPress={startCall}
//             disabled={volunteers.length === 0}
//           />
//         </>
//       )}
//     </View>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, Button } from 'react-native';

function RoomScreen({ setScreen, screens, setRoomId, roomId }) {
  const OnCallOrJoin = (screen) => {
    if (roomId.length > 0) {
      setScreen(screen);
    }
  };

  return (
    <>
      <Text style={styles.heading}>Select a room</Text>
      <TextInput style={styles.input} value={roomId} onChangeText={setRoomId} />
      <View style={styles.buttonContainer}>
        <Button
          title="Join Screen"
          onPress={() => OnCallOrJoin(screens.JOIN)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Call Screen"
          onPress={() => OnCallOrJoin(screens.CALL)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 30,
  },
  input: {
    margin: 20,
    height: 40,
    backgroundColor: '#aaa',
  },
  buttonContainer: {
    margin: 5,
  },
});
export default RoomScreen;
