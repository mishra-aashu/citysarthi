import React from 'react';
import DriverDashboardScreen from '../screens/driver/DriverDashboardScreen';
import DriverKYCScreen from '../screens/driver/DriverKYCScreen';
import RideAlertScreen from '../screens/driver/RideAlertScreen';
import DriverNavigationScreen from '../screens/driver/DriverNavigationScreen';
import DriverEarningsScreen from '../screens/driver/DriverEarningsScreen';

export const DRIVER_SCREENS = {
  Dashboard: DriverDashboardScreen,
  KYC: DriverKYCScreen,
  RideAlert: RideAlertScreen,
  Navigation: DriverNavigationScreen,
  Earnings: DriverEarningsScreen,
};

export default function DriverStack() {
  return <DriverDashboardScreen />;
}
