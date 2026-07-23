import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useTheme } from '../../context/ThemeContext';
import { getWalletBalance, addWalletMoney } from '../../services/walletService';
import {
  getSavedAddresses,
  addSavedAddress,
  deleteSavedAddress,
  getSavedPaymentMethods,
  addSavedPaymentMethod,
  deleteSavedPaymentMethod,
} from '../../services/profileService';
import KYCScreen from '../auth/KYCScreen';

export default function ProfileScreen({ onRoleChange, onLogout }) {
  const { colors, themeMode, setThemeMode, isDark } = useTheme();

  // State
  const [walletBalance, setWalletBalance] = useState(1450.00);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [userRole, setUserRole] = useState('CUSTOMER');

  // Modals
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [addAmount, setAddAmount] = useState('500');

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newUpi, setNewUpi] = useState('');

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddressTitle, setNewAddressTitle] = useState('');
  const [newAddressLine, setNewAddressLine] = useState('');

  const [showKycModal, setShowKycModal] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [language, setLanguage] = useState('English');

  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const bal = await getWalletBalance();
    setWalletBalance(bal);
    const addrs = await getSavedAddresses();
    setAddresses(addrs);
    const pays = await getSavedPaymentMethods();
    setPaymentMethods(pays);
  };

  const handleAddWalletMoney = async () => {
    const amt = parseFloat(addAmount);
    if (isNaN(amt) || amt <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount to add.');
      return;
    }
    const res = await addWalletMoney(null, amt);
    if (res.success) {
      setWalletBalance(res.balance);
      setShowWalletModal(false);
      Alert.alert('Money Added! 💳', `₹${amt} successfully added to your CitySarthi Wallet.`);
    }
  };

  const handleAddAddress = async () => {
    if (!newAddressTitle || !newAddressLine) {
      Alert.alert('Incomplete Address', 'Please fill in both title and address line.');
      return;
    }
    const res = await addSavedAddress(null, { title: newAddressTitle, addressLine: newAddressLine });
    if (res.success) {
      setAddresses([res.address, ...addresses]);
      setNewAddressTitle('');
      setNewAddressLine('');
      setShowAddressModal(false);
      Alert.alert('Address Saved', 'Your location has been saved to your profile.');
    }
  };

  const handleDeleteAddress = async (id) => {
    await deleteSavedAddress(id);
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleAddPayment = async () => {
    if (!newUpi || !newUpi.includes('@')) {
      Alert.alert('Invalid UPI ID', 'Please enter a valid UPI VPA (e.g. name@upi)');
      return;
    }
    const res = await addSavedPaymentMethod(null, { type: 'upi', provider: 'UPI', identifier: newUpi });
    if (res.success) {
      setPaymentMethods([res.payment, ...paymentMethods]);
      setNewUpi('');
      setShowPaymentModal(false);
      Alert.alert('Payment Method Added', 'UPI ID saved securely.');
    }
  };

  const handleDeletePayment = async (id) => {
    await deleteSavedPaymentMethod(id);
    setPaymentMethods(paymentMethods.filter((p) => p.id !== id));
  };

  const handleRoleSelect = (role) => {
    setUserRole(role);
    if (onRoleChange) onRoleChange(role);
  };

  return (
    <ResponsiveContainer>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.cardBorder }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Account Profile</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              KYC, Wallet, Saved Addresses & Theme Settings
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* User Card */}
          <View style={[styles.userCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>AS</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: colors.textPrimary }]}>Aashu Sharma</Text>
              <Text style={[styles.userPhone, { color: colors.textMuted }]}>
                +91 98765 43210 • aashu@example.com
              </Text>
              <TouchableOpacity style={styles.kycBadge} onPress={() => setShowKycModal(true)}>
                <Ionicons name="checkmark-seal" size={14} color={colors.success} />
                <Text style={[styles.kycText, { color: colors.success }]}>
                  KYC Verified (Driving License & Aadhaar)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Role Mode Switcher (Customer / Host / Driver) */}
          <View style={[styles.roleSwitchCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <Text style={[styles.roleLabel, { color: colors.textMuted }]}>ACTIVE PLATFORM MODE</Text>
            <View style={styles.roleBtnGroup}>
              {[
                { id: 'CUSTOMER', label: 'Renter / Rider', icon: 'car' },
                { id: 'HOST', label: 'Vehicle Host', icon: 'business' },
                { id: 'DRIVER', label: 'Driver Captain', icon: 'person' },
              ].map((r) => (
                <TouchableOpacity
                  key={r.id}
                  style={[
                    styles.roleToggleBtn,
                    { backgroundColor: colors.background, borderColor: colors.cardBorder },
                    userRole === r.id && { backgroundColor: colors.primary, borderColor: colors.primary },
                  ]}
                  onPress={() => handleRoleSelect(r.id)}
                >
                  <Ionicons name={r.icon} size={16} color={userRole === r.id ? '#000000' : colors.textMuted} />
                  <Text style={[styles.roleToggleText, { color: userRole === r.id ? '#000000' : colors.textSecondary }, userRole === r.id && { fontWeight: '800' }]}>
                    {r.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Theme Selector Section */}
          <View style={[styles.themeCard, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <View style={styles.themeHeader}>
              <Ionicons name={isDark ? "moon" : "sunny"} size={20} color={colors.primaryLight} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={[styles.themeTitle, { color: colors.textPrimary }]}>App Appearance & Theme</Text>
                <Text style={[styles.themeSubtitle, { color: colors.textMuted }]}>
                  Choose Light, Dark, or System mode
                </Text>
              </View>
            </View>

            <View style={styles.themeOptionsRow}>
              <TouchableOpacity
                style={[
                  styles.themeOptionBtn,
                  { backgroundColor: colors.background, borderColor: colors.cardBorder },
                  themeMode === 'light' && { backgroundColor: 'rgba(243, 163, 20, 0.12)', borderColor: colors.primary },
                ]}
                onPress={() => setThemeMode('light')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="sunny-outline"
                  size={18}
                  color={themeMode === 'light' ? colors.primaryLight : colors.textMuted}
                />
                <Text
                  style={[
                    styles.themeOptionText,
                    { color: themeMode === 'light' ? colors.primaryLight : colors.textSecondary },
                    themeMode === 'light' && { fontWeight: '700' },
                  ]}
                >
                  Light Mode
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.themeOptionBtn,
                  { backgroundColor: colors.background, borderColor: colors.cardBorder },
                  themeMode === 'dark' && { backgroundColor: 'rgba(243, 163, 20, 0.12)', borderColor: colors.primary },
                ]}
                onPress={() => setThemeMode('dark')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="moon-outline"
                  size={18}
                  color={themeMode === 'dark' ? colors.primaryLight : colors.textMuted}
                />
                <Text
                  style={[
                    styles.themeOptionText,
                    { color: themeMode === 'dark' ? colors.primaryLight : colors.textSecondary },
                    themeMode === 'dark' && { fontWeight: '700' },
                  ]}
                >
                  Dark Mode
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.themeOptionBtn,
                  { backgroundColor: colors.background, borderColor: colors.cardBorder },
                  themeMode === 'system' && { backgroundColor: 'rgba(243, 163, 20, 0.12)', borderColor: colors.primary },
                ]}
                onPress={() => setThemeMode('system')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="phone-portrait-outline"
                  size={18}
                  color={themeMode === 'system' ? colors.primaryLight : colors.textMuted}
                />
                <Text
                  style={[
                    styles.themeOptionText,
                    { color: themeMode === 'system' ? colors.primaryLight : colors.textSecondary },
                    themeMode === 'system' && { fontWeight: '700' },
                  ]}
                >
                  System
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Wallet Card */}
          <View style={[styles.walletCard, { backgroundColor: 'rgba(243, 163, 20, 0.12)', borderColor: colors.primary }]}>
            <View>
              <Text style={[styles.walletLabel, { color: colors.textMuted }]}>CitySarthi Wallet Balance</Text>
              <Text style={[styles.walletVal, { color: colors.primaryLight }]}>₹{walletBalance.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={[styles.addMoneyBtn, { backgroundColor: colors.primary }]} onPress={() => setShowWalletModal(true)}>
              <Ionicons name="add-circle" size={16} color="#000000" />
              <Text style={styles.addMoneyText}>Add Money</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Sections */}
          <View style={[styles.menuGroup, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.subtleBorder }]} onPress={() => setShowPaymentModal(true)}>
              <Ionicons name="card-outline" size={20} color={colors.primaryLight} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>Saved Payment Methods</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.subtleBorder }]} onPress={() => setShowAddressModal(true)}>
              <Ionicons name="location-outline" size={20} color={colors.primaryLight} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>Saved Addresses & Locations</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.subtleBorder }]} onPress={() => setShowKycModal(true)}>
              <Ionicons name="document-attach-outline" size={20} color={colors.primaryLight} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>Manage Driving License & KYC</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => setShowReferralModal(true)}>
              <Ionicons name="gift-outline" size={20} color={colors.accent} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>Refer & Earn ₹250</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <View style={[styles.menuGroup, { backgroundColor: colors.surface, borderColor: colors.cardBorder }]}>
            <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.subtleBorder }]} onPress={() => setShowSettingsModal(true)}>
              <Ionicons name="settings-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>App Settings & Notifications</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { borderBottomColor: colors.subtleBorder }]} onPress={() => setShowTermsModal(true)}>
              <Ionicons name="shield-checkmark-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.menuText, { color: colors.textPrimary }]}>Privacy Policy & Terms</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, { borderBottomWidth: 0 }]}
              onPress={() => {
                Alert.alert('Log Out', 'Are you sure you want to log out of CitySarthi?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Log Out', style: 'destructive', onPress: () => onLogout && onLogout() },
                ]);
              }}
            >
              <Ionicons name="log-out-outline" size={20} color={colors.danger} />
              <Text style={[styles.menuText, { color: colors.danger }]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* 1. Wallet Add Money Modal */}
        <Modal visible={showWalletModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Add Money to Wallet</Text>
                <TouchableOpacity onPress={() => setShowWalletModal(false)}>
                  <Ionicons name="close" size={24} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              <Text style={[styles.modalSub, { color: colors.textSecondary }]}>Enter amount to top up your CitySarthi wallet balance</Text>
              <View style={[styles.amountInputBox, { backgroundColor: colors.background, borderColor: colors.primary }]}>
                <Text style={[styles.currencyPrefix, { color: colors.primaryLight }]}>₹</Text>
                <TextInput
                  style={[styles.amountInput, { color: colors.textPrimary }]}
                  keyboardType="numeric"
                  value={addAmount}
                  onChangeText={setAddAmount}
                />
              </View>

              <View style={styles.quickAmtRow}>
                {['200', '500', '1000', '2000'].map((amt) => (
                  <TouchableOpacity
                    key={amt}
                    style={[styles.quickAmtBtn, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}
                    onPress={() => setAddAmount(amt)}
                  >
                    <Text style={[styles.quickAmtText, { color: colors.textPrimary }]}>+₹{amt}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={[styles.confirmBtn, { backgroundColor: colors.primary }]} onPress={handleAddWalletMoney}>
                <Text style={styles.confirmBtnText}>Pay & Top Up Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* 2. Saved Payment Methods Modal */}
        <Modal visible={showPaymentModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Saved Payment Methods</Text>
                <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                  <Ionicons name="close" size={24} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              {paymentMethods.map((pm) => (
                <View key={pm.id} style={[styles.listCard, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
                  <Ionicons name={pm.type === 'upi' ? "qr-code" : "card"} size={20} color={colors.primaryLight} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={[styles.listCardTitle, { color: colors.textPrimary }]}>{pm.provider}</Text>
                    <Text style={[styles.listCardSub, { color: colors.textMuted }]}>{pm.identifier}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDeletePayment(pm.id)}>
                    <Ionicons name="trash-outline" size={18} color={colors.danger} />
                  </TouchableOpacity>
                </View>
              ))}

              <Text style={[styles.inputLabel, { color: colors.textSecondary, marginTop: 14 }]}>Add New UPI VPA</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="e.g. username@upi"
                  placeholderTextColor={colors.textMuted}
                  value={newUpi}
                  onChangeText={setNewUpi}
                />
              </View>

              <TouchableOpacity style={[styles.confirmBtn, { backgroundColor: colors.primary, marginTop: 14 }]} onPress={handleAddPayment}>
                <Text style={styles.confirmBtnText}>Save Payment Method</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* 3. Saved Addresses Modal */}
        <Modal visible={showAddressModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Saved Addresses</Text>
                <TouchableOpacity onPress={() => setShowAddressModal(false)}>
                  <Ionicons name="close" size={24} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              {addresses.map((addr) => (
                <View key={addr.id} style={[styles.listCard, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
                  <Ionicons name="location" size={20} color={colors.primaryLight} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={[styles.listCardTitle, { color: colors.textPrimary }]}>{addr.title}</Text>
                    <Text style={[styles.listCardSub, { color: colors.textMuted }]}>{addr.address_line}, {addr.city}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDeleteAddress(addr.id)}>
                    <Ionicons name="trash-outline" size={18} color={colors.danger} />
                  </TouchableOpacity>
                </View>
              ))}

              <Text style={[styles.inputLabel, { color: colors.textSecondary, marginTop: 14 }]}>Address Title</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="Home / Work / Office"
                  placeholderTextColor={colors.textMuted}
                  value={newAddressTitle}
                  onChangeText={setNewAddressTitle}
                />
              </View>

              <Text style={[styles.inputLabel, { color: colors.textSecondary, marginTop: 8 }]}>Full Address Line</Text>
              <View style={[styles.inputBox, { backgroundColor: colors.background, borderColor: colors.cardBorder }]}>
                <TextInput
                  style={[styles.input, { color: colors.textPrimary }]}
                  placeholder="House No, Building, Street, Area"
                  placeholderTextColor={colors.textMuted}
                  value={newAddressLine}
                  onChangeText={setNewAddressLine}
                />
              </View>

              <TouchableOpacity style={[styles.confirmBtn, { backgroundColor: colors.primary, marginTop: 14 }]} onPress={handleAddAddress}>
                <Text style={styles.confirmBtnText}>Save Address</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* 4. KYC Modal */}
        <Modal visible={showKycModal} animationType="slide">
          <KYCScreen onBack={() => setShowKycModal(false)} onComplete={() => setShowKycModal(false)} />
        </Modal>

        {/* 5. Refer & Earn Modal */}
        <Modal visible={showReferralModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Refer & Earn ₹250</Text>
                <TouchableOpacity onPress={() => setShowReferralModal(false)}>
                  <Ionicons name="close" size={24} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              <View style={styles.referralBanner}>
                <Ionicons name="gift" size={48} color={colors.accent} />
                <Text style={[styles.referralTitle, { color: colors.textPrimary }]}>Invite Friends to CitySarthi</Text>
                <Text style={[styles.referralSub, { color: colors.textSecondary }]}>
                  Give ₹250 off on their first rental trip, and get ₹250 credited directly into your wallet when they finish their trip!
                </Text>
              </View>

              <View style={[styles.codeBox, { backgroundColor: colors.background, borderColor: colors.primary }]}>
                <View>
                  <Text style={[styles.codeLabel, { color: colors.textMuted }]}>YOUR EXCLUSIVE CODE</Text>
                  <Text style={[styles.codeText, { color: colors.primaryLight }]}>SARTHI250</Text>
                </View>
                <TouchableOpacity
                  style={[styles.copyBtn, { backgroundColor: colors.primary }]}
                  onPress={() => Alert.alert('Code Copied! 📋', 'Referral code SARTHI250 copied to clipboard.')}
                >
                  <Text style={styles.copyBtnText}>Copy</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.confirmBtn, { backgroundColor: colors.primary, marginTop: 14 }]}
                onPress={() => Alert.alert('Share Link 🚀', 'Sharing CitySarthi invite link via WhatsApp & Messages!')}
              >
                <Ionicons name="logo-whatsapp" size={18} color="#000000" style={{ marginRight: 6 }} />
                <Text style={styles.confirmBtnText}>Share via WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* 6. Settings Modal */}
        <Modal visible={showSettingsModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>App Settings & Notifications</Text>
                <TouchableOpacity onPress={() => setShowSettingsModal(false)}>
                  <Ionicons name="close" size={24} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              <View style={styles.settingRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>Push Notifications</Text>
                  <Text style={[styles.settingSub, { color: colors.textMuted }]}>Get trip alerts, driver arrivals, and offers</Text>
                </View>
                <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} trackColor={{ false: '#767577', true: colors.primary }} />
              </View>

              <View style={styles.settingRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>SMS & WhatsApp Alerts</Text>
                  <Text style={[styles.settingSub, { color: colors.textMuted }]}>Receive booking OTPs and digital receipts</Text>
                </View>
                <Switch value={smsEnabled} onValueChange={setSmsEnabled} trackColor={{ false: '#767577', true: colors.primary }} />
              </View>

              <Text style={[styles.inputLabel, { color: colors.textSecondary, marginTop: 14 }]}>APP LANGUAGE</Text>
              <View style={styles.langRow}>
                {['English', 'हिंदी (Hindi)', 'Hinglish'].map((l) => (
                  <TouchableOpacity
                    key={l}
                    style={[styles.langBtn, { backgroundColor: colors.background, borderColor: colors.cardBorder }, language === l && { backgroundColor: 'rgba(243, 163, 20, 0.15)', borderColor: colors.primary }]}
                    onPress={() => setLanguage(l)}
                  >
                    <Text style={[styles.langText, { color: language === l ? colors.primaryLight : colors.textSecondary }]}>{l}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

        {/* 7. Terms & Privacy Modal */}
        <Modal visible={showTermsModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface, maxHeight: '80%' }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Privacy Policy & Terms</Text>
                <TouchableOpacity onPress={() => setShowTermsModal(false)}>
                  <Ionicons name="close" size={24} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ paddingVertical: 10 }}>
                <Text style={[styles.policyHeading, { color: colors.textPrimary }]}>1. Vehicle Rental Agreement</Text>
                <Text style={[styles.policyBody, { color: colors.textSecondary }]}>
                  All renters must hold a valid Indian Driving License and be at least 18 years of age. Vehicles are equipped with GPS tracking for safety and compliance.
                </Text>

                <Text style={[styles.policyHeading, { color: colors.textPrimary }]}>2. Security Deposit & Fuel Policy</Text>
                <Text style={[styles.policyBody, { color: colors.textSecondary }]}>
                  Refundable security deposits are processed within 24 hours of trip completion. Renters must return vehicles with the same fuel level as recorded during pickup check-in.
                </Text>

                <Text style={[styles.policyHeading, { color: colors.textPrimary }]}>3. User Privacy</Text>
                <Text style={[styles.policyBody, { color: colors.textSecondary }]}>
                  CitySarthi protects your personal data, location history, and KYC credentials with high-grade encryption. We do not sell user data to third parties.
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ResponsiveContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, borderBottomWidth: 1 },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 13, marginTop: 2 },
  content: { padding: 16 },

  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: { fontSize: 18, fontWeight: '800', color: '#000000' },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: '800' },
  userPhone: { fontSize: 11, marginTop: 2 },
  kycBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 4 },
  kycText: { fontSize: 10, fontWeight: '700' },

  roleSwitchCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
  },
  roleLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5, marginBottom: 8 },
  roleBtnGroup: { flexDirection: 'row', gap: 8 },
  roleToggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    gap: 5,
  },
  roleToggleText: { fontSize: 11, fontWeight: '600' },

  themeCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
  },
  themeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  themeTitle: { fontSize: 15, fontWeight: '700' },
  themeSubtitle: { fontSize: 11, marginTop: 1 },
  themeOptionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  themeOptionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  themeOptionText: {
    fontSize: 12,
    fontWeight: '600',
  },

  walletCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  walletLabel: { fontSize: 11, fontWeight: '700' },
  walletVal: { fontSize: 22, fontWeight: '900', marginTop: 2 },
  addMoneyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  addMoneyText: { color: '#000000', fontWeight: '800', fontSize: 12 },

  menuGroup: {
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  menuText: { flex: 1, fontSize: 14, fontWeight: '600', marginLeft: 12 },

  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  modalTitle: { fontSize: 18, fontWeight: '800' },
  modalSub: { fontSize: 13, marginBottom: 16 },
  amountInputBox: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, borderWidth: 1.5, paddingHorizontal: 16, height: 56, marginBottom: 14 },
  currencyPrefix: { fontSize: 24, fontWeight: '800', marginRight: 10 },
  amountInput: { flex: 1, fontSize: 24, fontWeight: '800', outlineStyle: 'none' },
  quickAmtRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  quickAmtBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  quickAmtText: { fontSize: 13, fontWeight: '700' },
  confirmBtn: { flexDirection: 'row', height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  confirmBtnText: { color: '#000000', fontSize: 15, fontWeight: '800' },

  listCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 8 },
  listCardTitle: { fontSize: 14, fontWeight: '700' },
  listCardSub: { fontSize: 12, marginTop: 2 },

  inputLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5, marginBottom: 6 },
  inputBox: { borderRadius: 10, borderWidth: 1, paddingHorizontal: 12, height: 46, justifyContent: 'center' },
  input: { fontSize: 14, outlineStyle: 'none' },

  referralBanner: { alignItems: 'center', paddingVertical: 16 },
  referralTitle: { fontSize: 18, fontWeight: '800', marginTop: 10 },
  referralSub: { fontSize: 12, textAlign: 'center', marginTop: 6, lineHeight: 18 },
  codeBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 14, borderWidth: 1.5 },
  codeLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  codeText: { fontSize: 20, fontWeight: '900', marginTop: 2 },
  copyBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  copyBtnText: { color: '#000000', fontWeight: '800', fontSize: 12 },

  settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  settingTitle: { fontSize: 14, fontWeight: '700' },
  settingSub: { fontSize: 11, marginTop: 2 },
  langRow: { flexDirection: 'row', gap: 8, marginTop: 6 },
  langBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  langText: { fontSize: 12, fontWeight: '700' },

  policyHeading: { fontSize: 15, fontWeight: '800', marginTop: 12, marginBottom: 4 },
  policyBody: { fontSize: 12, lineHeight: 18, marginBottom: 12 },
});
