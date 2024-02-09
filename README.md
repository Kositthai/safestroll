# Safestroll
Safestroll is a **native mobile app** designed to ensure safe walks home, especially during late hours or in unfamiliar areas. Users can volunteer as companions or request support from nearby volunteers. With real-time assistance,and a supportive community, Safestroll helps users feel safer and more connected on their journey home.

![mobile-3](https://github.com/Kositthai/safestroll/assets/94117213/5cfe8824-63d4-4fbc-9aba-670528e2b033)

## Tech Stack: 
[![My Skills](https://skillicons.dev/icons?i=react,typescript,firebase,html,css,gmail)](https://skillicons.dev)

## Usage: 
User can register to volunteer as conpanion or need a support 
Safestroll offers a platform where users can both volunteer to accompany others on their walks and request assistance from supportive volunteers when needed.

## Progress Update: 
**Current Status:** The app is in the process of building the authentication system and UI components for Login, SignUp, and SignIn.

**Next Steps:**
- Set up SSO for an alternative option for users to easily sign in and sign up with their existing email.
- Create the matching functionality to facilitate random pairing between volunteers and support seekers.
- Implement the audio call functionality and integrate it with the matching system.
- Establish a mechanism for collecting feedback after each call.

## Installation 
- Clone this repository.
- Run npm install.
- Set up Firebase:
  - Create an account on Firebase.
  - Copy the initial Firebase config and add it to the project by creating FirebaseConfig.ts.
```
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}
```

