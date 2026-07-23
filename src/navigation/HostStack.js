import React from 'react';
import HostDashboardScreen from '../screens/host/HostDashboardScreen';
import AddVehicleScreen from '../screens/host/AddVehicleScreen';
import HandoverScreen from '../screens/host/HandoverScreen';
import HostEarningsScreen from '../screens/host/HostEarningsScreen';

export const HOST_SCREENS = {
  Dashboard: HostDashboardScreen,
  AddVehicle: AddVehicleScreen,
  Handover: HandoverScreen,
  Earnings: HostEarningsScreen,
};

export default function HostStack() {
  return <HostDashboardScreen />;
}
