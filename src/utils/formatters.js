export const formatCurrency = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;
export const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN');
