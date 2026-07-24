import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
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
import HostDashboardScreen from '../screens/host/HostDashboardScreen';
import DriverDashboardScreen from '../screens/driver/DriverDashboardScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import BottomTabBar from '../components/navigation/BottomTabBar';
import DesktopHeader from '../components/navigation/DesktopHeader';
import { useTheme } from '../context/ThemeContext';

export default function BottomTabNavigator() {
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState('Home');
  const [activeScreen, setActiveScreen] = useState('Main');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [userRole, setUserRole] = useState('CUSTOMER'); // 'CUSTOMER', 'HOST', 'DRIVER'
  const { colors } = useTheme();
  const isDesktop = width >= 768;


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

  const handleRoleChange = (newRole) => {
    setUserRole(newRole);
  };

  // Render sub-screens or tab screens
  const renderScreen = () => {
    // Role Overrides
    if (userRole === 'HOST' && activeTab !== 'Profile') {
      return <HostDashboardScreen onSwitchRole={handleRoleChange} />;
    }

    if (userRole === 'DRIVER' && activeTab !== 'Profile') {
      return <DriverDashboardScreen onSwitchRole={handleRoleChange} />;
    }

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

    if (activeScreen === 'Login') {
      return (
        <LoginScreen
          navigation={{
            navigate: (screen, params) => {
              if (screen === 'OTP') navigateTo('OTP', params);
              else if (screen === 'Register') setActiveScreen('Register');
              else setActiveScreen('Main');
            },
          }}
        />
      );
    }

    if (activeScreen === 'Register') {
      return (
        <RegisterScreen
          navigation={{
            navigate: (screen) => {
              if (screen === 'Login') setActiveScreen('Login');
              else setActiveScreen('Main');
            },
          }}
        />
      );
    }

    if (activeScreen === 'OTP') {
      return (
        <OTPScreen
          route={{ params: { phoneNumber: selectedVehicle?.phoneNumber || '+91 98765 43210' } }}
          navigation={{
            navigate: () => {
              setActiveScreen('Main');
              handleTabChange('Profile');
            },
          }}
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
        return <ProfileScreen onRoleChange={handleRoleChange} onNavigateToLogin={() => setActiveScreen('Login')} />;
      default:
        return <HomeScreen onSelectVehicle={(v) => navigateTo('VehicleDetails', { vehicle: v })} onNavigateToTab={handleTabChange} />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isDesktop && (
        <DesktopHeader
          activeTab={activeTab}
          onTabChange={handleTabChange}
          userRole={userRole}
          onRoleChange={handleRoleChange}
        />
      )}
      <View style={styles.content}>
        {renderScreen()}
      </View>
      {activeScreen === 'Main' && (
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
