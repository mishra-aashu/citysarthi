import React from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import KYCScreen from '../screens/auth/KYCScreen';

export const AUTH_SCREENS = {
  Login: LoginScreen,
  Register: RegisterScreen,
  OTP: OTPScreen,
  KYC: KYCScreen,
};

export default function AuthStack() {
  return <LoginScreen />;
}
