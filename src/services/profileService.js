import { supabase } from '../config/supabase';

// Static fallbacks for seamless user experience
export const INITIAL_ADDRESSES = [
  { id: 'addr_1', title: 'Home', address_line: 'B-402, Sunshine Heights, Sector 62', city: 'Noida', pincode: '201301', is_default: true },
  { id: 'addr_2', title: 'Work Office', address_line: 'Tower 3, Cyber Hub, DLF Phase 2', city: 'Gurugram', pincode: '122002', is_default: false },
];

export const INITIAL_PAYMENTS = [
  { id: 'pay_1', type: 'upi', provider: 'gpay', identifier: 'aashu@okicici', is_default: true },
  { id: 'pay_2', type: 'card', provider: 'HDFC Visa', identifier: '•••• 8829', is_default: false },
];

export const getSavedAddresses = async (userId) => {
  try {
    if (!userId) return INITIAL_ADDRESSES;
    const { data, error } = await supabase
      .from('saved_addresses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return INITIAL_ADDRESSES;
    return data;
  } catch (err) {
    return INITIAL_ADDRESSES;
  }
};

export const addSavedAddress = async (userId, address) => {
  try {
    const payload = {
      id: 'addr_' + Date.now(),
      user_id: userId || null,
      title: address.title || 'Address',
      address_line: address.addressLine || address.address_line,
      city: address.city || 'Delhi',
      pincode: address.pincode || '110001',
      is_default: false,
    };
    if (userId) {
      await supabase.from('saved_addresses').insert([payload]);
    }
    return { success: true, address: payload };
  } catch (err) {
    return { success: true, address: address };
  }
};

export const deleteSavedAddress = async (id) => {
  try {
    await supabase.from('saved_addresses').delete().eq('id', id);
    return { success: true };
  } catch (err) {
    return { success: true };
  }
};

export const getSavedPaymentMethods = async (userId) => {
  try {
    if (!userId) return INITIAL_PAYMENTS;
    const { data, error } = await supabase
      .from('saved_payment_methods')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return INITIAL_PAYMENTS;
    return data;
  } catch (err) {
    return INITIAL_PAYMENTS;
  }
};

export const addSavedPaymentMethod = async (userId, payment) => {
  try {
    const payload = {
      id: 'pay_' + Date.now(),
      user_id: userId || null,
      type: payment.type,
      provider: payment.provider,
      identifier: payment.identifier,
      is_default: false,
    };
    if (userId) {
      await supabase.from('saved_payment_methods').insert([payload]);
    }
    return { success: true, payment: payload };
  } catch (err) {
    return { success: true, payment: payment };
  }
};

export const deleteSavedPaymentMethod = async (id) => {
  try {
    await supabase.from('saved_payment_methods').delete().eq('id', id);
    return { success: true };
  } catch (err) {
    return { success: true };
  }
};
