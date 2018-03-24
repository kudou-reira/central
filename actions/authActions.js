import { AsyncStorage } from 'react-native';
import { Facebook, Google } from 'expo';

import {
	FACEBOOK_LOGIN_SUCCESS,
	FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL
} from './types';

// '202231510542916'

let keys = require('../config/keys');

// getting expire time

// https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=ya29.GluIBRGeGQq1TEAS2IrrwGs-oHCaS9fx9AejnUY15ma2ItLOYbwxP3-TON5fpt_LysvDyIQz8hpu-EvdtNNd2tu290AXVABFJWA_oRHZlk10C7UGrtzd94pcVb4d
// https://stackoverflow.com/questions/13851157/oauth2-and-google-api-access-token-expiration-time?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
const googleAPI = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';

export const googleLogin = () => async dispatch => {
  const token = await AsyncStorage.getItem("token");
  const refreshToken = await AsyncStorage.getItem("refreshToken");
  // probably have to query the google api to see the expires_in property
  // if it's not expired, dispatch successful login
  // if expired, use refresh token to get new, if refresh token exists, that is

  try {
    const { accessToken, refreshToken } = await doGoogleLogin();
    console.log("this is accessToken in await google login", accessToken);

    await AsyncStorage.setItem("token", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
    await AsyncStorage.setItem("type", "google");
    return dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: { token: accessToken, type: 'google' } });
  } catch (error) {
    return dispatch({ type: GOOGLE_LOGIN_FAIL });
  }
};

const doGoogleLogin = async () => {
  // { type, accessToken, expires }
  const { type, accessToken, refreshToken } = await Google.logInAsync({
      iosClientId: keys.GOOGLE_CLIENT_IOS_ID,
      scopes: ['profile', 'email']
    });

  console.log("this is result in google actions", accessToken);

 
  if (type === "cancel") {
    throw new Error({ error: "Google login cancelled" });
  }
 
  if (type === "success") {
    return { accessToken, refreshToken };
  }
};

export const facebookLogin = () => async dispatch => {
  const token = await AsyncStorage.getItem("token");
  const expires = await AsyncStorage.getItem("expires");
  const currentTime = Math.floor(new Date().getTime() / 1000);
 
  if (token && expires && expires > currentTime) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: { token, expires } });
  } else {
    try {
      const { token, expires } = await doFacebookLogin();
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("expires", String(expires));
      await AsyncStorage.setItem("type", "facebook");

      console.log("this is fb token", token);
      console.log("this is fb expires", expires);

      return dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: { token, expires, type: 'facebook' } });
    } catch (error) {
      return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }
  }
};
 
const doFacebookLogin = async () => {
  const { type, token, expires } = await Facebook.logInWithReadPermissionsAsync(
    keys.FACEBOOK_APP_ID,
    {
      permissions: ["public_profile"]
    }
  );
 
  if (type === "cancel") {
    throw new Error({ error: "Facebook login cancelled" });
  }
 
  if (type === "success") {
    return { token, expires };
  }
};