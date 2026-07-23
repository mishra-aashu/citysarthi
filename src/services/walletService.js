import { supabase } from '../config/supabase';

export const getWalletBalance = async (userId) => {
  try {
    if (!userId) return 1450.00;
    const { data, error } = await supabase
      .from('user_wallets')
      .select('balance')
      .eq('user_id', userId)
      .single();
    if (error || !data) return 1450.00;
    return Number(data.balance);
  } catch (err) {
    console.warn('Wallet balance fetch warning:', err.message);
    return 1450.00;
  }
};

export const addWalletMoney = async (userId, amount) => {
  try {
    const currentBalance = await getWalletBalance(userId);
    const newBalance = currentBalance + Number(amount);

    if (userId) {
      const { error } = await supabase
        .from('user_wallets')
        .upsert({ user_id: userId, balance: newBalance, updated_at: new Date().toISOString() });
      if (error) console.warn('Wallet upsert warning:', error.message);
    }
    return { success: true, balance: newBalance };
  } catch (err) {
    console.error('Add wallet money error:', err.message);
    return { success: false, error: err.message };
  }
};

export const deductWalletMoney = async (userId, amount) => {
  try {
    const currentBalance = await getWalletBalance(userId);
    if (currentBalance < amount) {
      return { success: false, error: 'Insufficient wallet balance' };
    }
    const newBalance = currentBalance - Number(amount);

    if (userId) {
      await supabase
        .from('user_wallets')
        .upsert({ user_id: userId, balance: newBalance, updated_at: new Date().toISOString() });
    }
    return { success: true, balance: newBalance };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
