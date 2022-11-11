// @flow

import 'react-native-gesture-handler';
import React, {
  useEffect,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react';

import {Image, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { images, COLORS } from './constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
const RNFS = require('react-native-fs');
// eslint-disable-next-line prettier/prettier
// Screens
import SignInScreen from './screens/auth/SignInScreen';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import DirectorioScreen from './screens/main/DirectorioScreen'
import AgregarContactoScreen from './screens/main/AgregarContactoScreen'
import DatosScreen from './screens/main/DatosScreen';
import DetalleContactoScreen from './screens/main/DetalleContacto';
import DetalleDatosContacto from './screens/main/DetalleDatosContacto';
import TestigoScreen from './screens/main/TestigoScreen';
import MapaScreen from './screens/main/MapaScreen';

import {stateConditionString} from './utils/helpers';
import {AuthContext} from './utils/authContext';
import {reducer, initialState} from './reducer';


// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
// const Tab = createMaterialTopTabNavigator();
// const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: '100%', height: 70, resizeMode:'contain' }}
      source={images.header}
    />
  );
}


function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />

    <Stack.Screen
      name="DirectorioScreen"
      component={DirectorioScreen}
      options={{ 
        headerStyle: {
          height: 50, 
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerTitle: props => <LogoTitle {...props} /> 
      }}
    >
    </Stack.Screen>

    <Stack.Screen
      name="AgregarContactoScreen"
      component={AgregarContactoScreen}
      options={{ 
        headerStyle: {
          height: 70, 
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerTitle: props => <LogoTitle {...props} /> 
      }}
    >
    </Stack.Screen>

    <Stack.Screen
      name="DatosScreen"
      component={DatosScreen}
      options={{ 
        headerStyle: {
          height: 70, 
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerTitle: props => <LogoTitle {...props} /> 
      }}
    >
    </Stack.Screen>

    
    <Stack.Screen
      name="DetalleContactoScreen"
      component={DetalleContactoScreen}
      options={{ 
        headerStyle: {
          height: 70, 
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerTitle: props => <LogoTitle {...props} /> 
      }}
    >
    </Stack.Screen>

    <Stack.Screen
      name="DetalleDatosContacto"
      component={DetalleDatosContacto}
      options={{ 
        headerStyle: {
          height: 70, 
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerTitle: props => <LogoTitle {...props} /> 
      }}
    >
    </Stack.Screen>
    <Stack.Screen
      name="TestigoScreen"
      component={TestigoScreen}
      options={{ 
        headerStyle: {
          height: 70, 
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerTitle: props => <LogoTitle {...props} /> 
      }}
    >
    </Stack.Screen>
    <Stack.Screen
      name="MapaScreen"
      component={MapaScreen}
      options={{ 
        headerStyle: {
          height: 70, 
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        },
        headerTitle: props => <LogoTitle {...props} /> 
      }}
    >
    </Stack.Screen>


    </Stack.Navigator>
  );
}


export default App = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log('navigation ' + JSON.stringify(navigation));
  useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken;

          try {
            userToken = await AsyncStorage.getItem('userInfo');
          } catch (e) {
            // Restoring token failed
          }

          // After restoring token, we may need to validate it in production apps
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          console.log('userToken ' + JSON.stringify(userToken));
          if (userToken == null) {
            console.log('RESTORE_TOKEN');
            dispatch({type: 'RESTORE_TOKEN', token: userToken});
          } else {
            console.log('SIGN_IN');
            dispatch({type: 'SIGN_IN', token: userToken});
          }
        };
    bootstrapAsync();
  }, []);

  // In a production app, we need to send some data (usually username, password) to server and get a token
  // We will also need to handle errors if sign in failed
  // After getting token, we need to persist the token using `AsyncStorage`
  const authContextValue = useMemo(
    () => ({
      signIn: async (data) => {
        console.log("data", data)
        if (
          data &&
          data.emailAddress !== undefined &&
          data.password !== undefined
        ) {
          dispatch({type: 'SIGN_IN', token: 'Token-For-Now'});
        } else {
          dispatch({type: 'TO_SIGNIN_PAGE'});
        }
      },
      signOut: async (data) => {
        // console.log('signOut data ' + JSON.stringify(data));
        let path = RNFS.DocumentDirectoryPath + '/ed2341231.frt';
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('encuestas');
        AsyncStorage.removeItem('usuarios_descargados')
        deleteFile(path); 
        // AsyncStorage.removeItem('encuestasEnviadas');
        dispatch({type: 'SIGN_OUT'});
      },

      signUp: async (data) => {
        if (
          data &&
          data.emailAddress !== undefined &&
          data.password !== undefined
        ) {
          dispatch({type: 'SIGNED_UP', token: 'dummy-auth-token'});
        } else {
          dispatch({type: 'TO_SIGNUP_PAGE'});
        }
      },
    }),
    [],
  );

  const deleteFile = async (path) => {
    try {
      await RNFS.unlink(path); //delete the item present at 'path'
      console.log("file deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const chooseScreen = (state) => {
    let navigateTo = stateConditionString(state);
    let arr = [];
    console.log("navigateTo", navigateTo)
    switch (navigateTo) {
      case 'LOAD_APP':      
        arr.push(
          <Stack.Screen name="Splash"
            component={SplashScreen}
            options={{
              headerShown: false
            }}/>
            );
        break;

      case 'LOAD_SIGNUP':
        arr.push(
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: false,
              title: 'Sign Up',
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
          />,
        );
        break;
      case 'LOAD_SIGNIN':
        console.log("state.isSignout", state.isSignout)
        arr.push(
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{
              headerShown: false,
              title: 'Sign Up',
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
          />,
        );
        break;
      case 'LOAD_SIGNOUT':
        arr.push(
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{
              headerShown: false,
              title: 'Sign Up',
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
          />,
        );
        break;

      case 'LOAD_HOME':
        // arr.push(
        //   <Tab.Screen
        //     name="Home"
        //     component={TabNav}
        //     options={{
        //       headerShown: false,
        //     }}
        //   />,
        // );
        arr.push(
          <Stack.Screen
                    name="Home"
                    component={Root}
                    options={{
                            headerShown: false,
                    }}
        />);
        break;
      default:
        arr.push(<Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{
                            headerShown: false,
                            title: 'Sign Up',
                            animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                    }}
        />);
        break;
    }
    return arr[0];
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator>{chooseScreen(state)}</Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
