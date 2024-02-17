import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Button, View } from 'react-native';
import { getFirestore } from 'firebase/firestore';

// const configuration = {
//   iceServers: [
//     {
//       urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };

function CallScreen({ setScreen, screens, roomId }) {
  //   const db = getFirestore();
  //   const [localStream, setLocalStream] = useState();
  //   const [remoteStream, setRemoteStream] = useState();
  //   const [cachedLocalPC, setCachedLocalPC] = useState();

  //   const [isMuted, setIsMuted] = useState(false);

  //   function onBackPress() {
  //     if (cachedLocalPC) {
  //       cachedLocalPC.removeStream(localStream);
  //       cachedLocalPC.close();
  //     }
  //     setLocalStream();
  //     setRemoteStream();
  //     setCachedLocalPC();
  //     // cleanup
  //     setScreen(screens.ROOM);
  //   }

  //   useEffect(() => {
  //     // startLocalStream();
  //   }, []);

  //   // set-up localStream asking user to access devices
  //   const startLocalStream = async () => {
  //     const isFront = true;
  //     const devices = await mediaDevices.enumerateDevices();

  //     const facing = isFront ? 'front' : 'environment';
  //     const videoSourceId = devices.find(
  //       (device) => device.kind === 'videoinput' && device.facing === facing
  //     );
  //     const facingMode = isFront ? 'user' : 'environment';

  //     const constrains = {
  //       audio: true,
  //       video: {
  //         mandatory: {
  //           minWidth: 500, // Provide your own width, height and frame rate here
  //           minHeight: 300,
  //           minFrameRate: 30,
  //         },
  //         facingMode,
  //         optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
  //       },
  //     };

  //     const newStream = await mediaDevices.getUserMedia(constrains);
  //     setLocalStream(newStream);
  //   };

  //   // set-up connection by passing configration to peerConnection
  //   const startCall = async (id) => {
  //     const localPC = new RTCPeerConnection(configuration); // return peer connection object
  //     // assign localStream to object that get from RTCPeerconnection
  //     // It tells the Peer Connection, that this is the stream we are going to use,
  //     // so please send this to the other side when connected.
  //     localPC.addStream(localStream);

  //     const roomRef = await db.collection('rooms').doc(id);
  //     const callerCondidateCollection = roomRef.collection('callerCandidates');

  //     // So when our local peer connection gets a new ice candidate it added it to the
  //     // callerCandidatesCollection for the callee to listen.
  //     localPC.onicecandidate = (e) => {
  //       if (!e.candidate) {
  //         console.log('Got final candidate');
  //         return;
  //       }
  //       callerCondidateCollection.add(e.candidate.toJSON());
  //     };

  //     localPC.onaddstream = (e) => {
  //       if (e.stream && remoteStream !== e.stream) {
  //         console.log('RemotePC received the stream call', e.stream);
  //         setRemoteStream(e.stream);
  //       }
  //     };

  //     // after starting call, we have to send an offer
  //     // Generate an offer :
  //     // Offer is a kind of a contract which we generate from our peer connection, saying that
  //     // if anyone wants to connect to us, use this offer to move forward.
  //     const offer = await localPC.createOffer();
  //     await localPC.setLocalDescription(offer);

  //     const roomWithOffer = { offer };
  //     await roomRef.set(roomWithOffer);

  //     // Use the offer received from the caller to set the Remote Description for its Peer Connection
  //     roomRef.onSnapshot(async (snapshot) => {
  //       const data = snapshot.data();
  //       if (!localPC.currentRemoteDescription && data.answer) {
  //         const rtcSessionDescription = new RTCSessionDescription(data.answer);
  //         await localPC.setRemoteDescription(rtcSessionDescription);
  //       }
  //     });

  //     roomRef.collection('calleeCandidates').onSnapshot((snapshot) => {
  //       snapshot.docChanges().forEach(async (change) => {
  //         if (change.type === 'added') {
  //           let data = change.doc.data();
  //           await localPC.addIceCandidate(new RTCIceCandidate(data));
  //         }
  //       });
  //     });
  //     setCachedLocalPC(localPC);
  //   };

  //   const switchCamera = () => {
  //     localStream.getVideoTracks().forEach((track) => track._switchCamera());
  //   };

  //   // Mutes the local's outgoing audio
  //   const toggleMute = () => {
  //     if (!remoteStream) {
  //       return;
  //     }
  //     localStream.getAudioTracks().forEach((track) => {
  //       // console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
  //       track.enabled = !track.enabled;
  //       setIsMuted(!track.enabled);
  //     });
  //   };
  return (
    // <>
    //   <Text style={styles.heading}>Call Screen</Text>
    //   <Text style={styles.heading}>Room : {roomId}</Text>

    //   <View style={styles.callButtons}>
    //     <View styles={styles.buttonContainer}>
    //       <Button title="Click to stop call" onPress={onBackPress} />
    //     </View>
    //     <View styles={styles.buttonContainer}>
    //       {!localStream && (
    //         <Button title="Click to start stream" onPress={startLocalStream} />
    //       )}
    //       {localStream && (
    //         <Button
    //           title="Click to start call"
    //           onPress={() => startCall(roomId)}
    //           disabled={!!remoteStream}
    //         />
    //       )}
    //     </View>
    //   </View>

    //   {localStream && (
    //     <View style={styles.toggleButtons}>
    //       <Button title="Switch camera" onPress={switchCamera} />
    //       <Button
    //         title={`${isMuted ? 'Unmute' : 'Mute'} stream`}
    //         onPress={toggleMute}
    //         disabled={!remoteStream}
    //       />
    //     </View>
    //   )}

    //   <View style={{ display: 'flex', flex: 1, padding: 10 }}>
    //     <View style={styles.rtcview}>
    //       {/* {localStream && (
    //         <RTCView
    //           style={styles.rtc}
    //           streamURL={localStream && localStream.toURL()}
    //         />
    //       )} */}
    //     </View>
    //     <View style={styles.rtcview}>
    //       {/* {remoteStream && (
    //         <RTCView
    //           style={styles.rtc}
    //           streamURL={remoteStream && remoteStream.toURL()}
    //         />
    //       )} */}
    //     </View>
    //   </View>
    // </>
    <Text>Call screen</Text>
  );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: 'center',
    fontSize: 30,
  },
  rtcview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 5,
  },
  rtc: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  toggleButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  callButtons: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    margin: 5,
  },
});

export default CallScreen;
