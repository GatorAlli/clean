export const DELIVERY_CHARGE = 100;

export function calculateOrderTotal(items: { quantity: number; unitPrice: number }[]) {
  if (items.some(item => !Number.isSafeInteger(item.quantity) || item.quantity < 0 ||
    !Number.isSafeInteger(item.unitPrice) || item.unitPrice < 0)) throw new Error("Invalid item pricing.");
  const laundrySubtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const totalAmount = laundrySubtotal + DELIVERY_CHARGE;
  if (!Number.isSafeInteger(totalAmount) || totalAmount > 2147483647) throw new Error("Order total is too large.");
  return { laundrySubtotal, deliveryCharge: DELIVERY_CHARGE, totalAmount };
}
