export default function OrderCostBreakdown({ laundrySubtotal, deliveryCharge, totalAmount }: {
  laundrySubtotal: number; deliveryCharge: number; totalAmount: number;
}) {
  return <dl className="space-y-2 text-sm">
    <div className="flex justify-between gap-3 text-gray-600"><dt>Laundry subtotal</dt><dd>৳{laundrySubtotal.toLocaleString("en-BD")}</dd></div>
    <div className="flex justify-between gap-3 text-gray-600"><dt>Delivery charge</dt><dd>৳{deliveryCharge.toLocaleString("en-BD")}</dd></div>
    <div className="flex justify-between gap-3 border-t border-gray-100 pt-3 text-lg font-bold"><dt>Total</dt><dd>৳{totalAmount.toLocaleString("en-BD")}</dd></div>
  </dl>;
}
