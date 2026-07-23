import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '../screens/customer/HomeScreen';
import SearchScreen from '../screens/customer/SearchScreen';
import MyBookingsScreen from '../screens/customer/MyBookingsScreen';
import SupportScreen from '../screens/customer/SupportScreen';
import ProfileScreen from '../screens/customer/ProfileScreen';
import VehicleDetailsScreen from '../screens/customer/VehicleDetailsScreen';
import BookingSummaryScreen from '../screens/customer/BookingSummaryScreen';
import PaymentScreen from '../screens/customer/PaymentScreen';
import BookingConfirmationScreen from '../screens/customer/BookingConfirmationScreen';
import LiveTrackingScreen from '../screens/customer/LiveTrackingScreen';
import BottomTabBar from '../components/navigation/BottomTabBar';
import { COLORS } from '../config/theme';

export default function BottomTabNavigator() {
  const [activeTab, setActiveTab] = useState('Home');
  const [activeScreen, setActiveScreen] = useState('Main'); // 'Main', 'VehicleDetails', 'BookingSummary', 'Payment', 'BookingConfirmation', 'LiveTracking'
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Navigation handlers
  const navigateTo = (screenName, params = {}) => {
    if (params.vehicle) {
      setSelectedVehicle(params.vehicle);
    }
    setActiveScreen(screenName);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setActiveScreen('Main'); // Reset sub-screen when switching main tabs
  };

  // Render sub-screens or tab screens
  const renderScreen = () => {
    // Check for detailed sub-flow screens first
    if (activeScreen === 'VehicleDetails') {
      return (
        <VehicleDetailsScreen
          vehicle={selectedVehicle}
          onBack={() => setActiveScreen('Main')}
          onBookNow={(veh) => navigateTo('BookingSummary', { vehicle: veh })}
        />
      );
    }

    if (activeScreen === 'BookingSummary') {
      return (
        <BookingSummaryScreen
          vehicle={selectedVehicle}
          onBack={() => setActiveScreen('VehicleDetails')}
          onProceedToPayment={() => setActiveScreen('Payment')}
        />
      );
    }

    if (activeScreen === 'Payment') {
      return (
        <PaymentScreen
          vehicle={selectedVehicle}
          onBack={() => setActiveScreen('BookingSummary')}
          onPaymentSuccess={() => setActiveScreen('BookingConfirmation')}
        />
      );
    }

    if (activeScreen === 'BookingConfirmation') {
      return (
        <BookingConfirmationScreen
          vehicle={selectedVehicle}
          onViewLiveTracking={() => setActiveScreen('LiveTracking')}
          onGoHome={() => handleTabChange('Home')}
        />
      );
    }

    if (activeScreen === 'LiveTracking') {
      return (
        <LiveTrackingScreen
          vehicle={selectedVehicle}
          onBack={() => handleTabChange('Bookings')}
        />
      );
    }

    // Default main tabs
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onSelectVehicle={(v) => navigateTo('VehicleDetails', { vehicle: v })} onNavigateToTab={handleTabChange} />;
      case 'Search':
        return <SearchScreen onSelectVehicle={(v) => navigateTo('VehicleDetails', { vehicle: v })} />;
      case 'Bookings':
        return <MyBookingsScreen onTrackBooking={(v) => navigateTo('LiveTracking', { vehicle: v })} />;
      case 'Support':
        return <SupportScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen onSelectVehicle={(v) => navigateTo('VehicleDetails', { vehicle: v })} onNavigateToTab={handleTabChange} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
});
