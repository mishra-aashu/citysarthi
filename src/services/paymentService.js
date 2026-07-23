export const initiatePayment = async (amount, method) => {
  return { status: 'SUCCESS', transactionId: `TXN_${Date.now()}` };
};
