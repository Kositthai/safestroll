import { store } from './store/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import FrontPage from './screens/FrontPage';
import RegisterOptions from './screens/RegisterOptions';
import MatchingPage from './screens/Matching';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { useState } from 'react';

// import JoinScreen from './screens/JoinScreen';
import RoomScreen from './screens/Matching';
import CallScreen from './screens/CallScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="RegisterOptions">
          {user ? (
            <>
              {/* <Stack.Screen name="FrontPage" component={FrontPage} /> */}
              <Stack.Screen name="MatchingPage" component={RoomScreen} />
              <Stack.Screen name="CallScreen" component={CallScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="RegisterOptions"
                component={RegisterOptions}
              />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
