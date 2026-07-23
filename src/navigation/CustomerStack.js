import React from 'react';
import HomeScreen from '../screens/customer/HomeScreen';
import SearchScreen from '../screens/customer/SearchScreen';
import VehicleDetailsScreen from '../screens/customer/VehicleDetailsScreen';
import BookingSummaryScreen from '../screens/customer/BookingSummaryScreen';
import PaymentScreen from '../screens/customer/PaymentScreen';
import BookingConfirmationScreen from '../screens/customer/BookingConfirmationScreen';
import LiveTrackingScreen from '../screens/customer/LiveTrackingScreen';

export const CUSTOMER_SCREENS = {
  Home: HomeScreen,
  Search: SearchScreen,
  VehicleDetails: VehicleDetailsScreen,
  BookingSummary: BookingSummaryScreen,
  Payment: PaymentScreen,
  BookingConfirmation: BookingConfirmationScreen,
  LiveTracking: LiveTrackingScreen,
};

import BottomTabNavigator from './BottomTabNavigator';

export default function CustomerStack() {
  return <BottomTabNavigator />;
}
