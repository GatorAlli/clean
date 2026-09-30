import type { OwnerBooking } from "@/lib/drizzle/schema";
import BookingActions from "./BookingActions";
import BookingRefresh from "./BookingRefresh";
import { itemServicesLabel } from "@/lib/booking-services";
import { isTerminalStatus, statusLabel } from "@/lib/order-lifecycle";
import BookingTimeline from "./BookingTimeline";
import OrderCostBreakdown from "./OrderCostBreakdown";

export default function BookingList({
  bookings,
  showCustomer = false,
  canManage = false,
}: {
  bookings: OwnerBooking[];
  showCustomer?: boolean;
  canManage?: boolean;
}) {
  if (!bookings.length)
    return <p className="text-gray-500">No bookings yet.</p>;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {bookings.some((booking) => !isTerminalStatus(booking.status)) && (
        <BookingRefresh />
      )}
      {bookings.map((booking) => (
        <article
          key={booking.id}
          className="rounded-2xl border border-gray-200 bg-white p-5 text-black"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold">Booking #{booking.id}</h3>
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${booking.status === "delivered" ? "bg-green-50 text-green-700" : booking.status === "cancelled" ? "bg-red-50 text-red-700" : "bg-pink-50 text-[#ff206e]"}`}
            >
              {statusLabel(booking.status)}
            </span>
          </div>
          <p className="mt-2 font-semibold">{booking.laundryName}</p>
          {showCustomer && (
            <div className="mt-1 space-y-1 break-words text-sm text-gray-600">
              <p>
                {booking.customerName || "Customer"} · {booking.customerEmail}
              </p>
              <p><span className="font-medium">Address:</span> {booking.customerLocation || "Not provided"}</p>
              <p><span className="font-medium">Phone:</span> {booking.customerPhone || "Not provided"}</p>
              {booking.bookingPhone && booking.bookingPhone !== booking.customerPhone && <p><span className="font-medium">Booking phone:</span> {booking.bookingPhone}</p>}
              <p><span className="font-medium">Transaction ID:</span> <span className="font-mono">{booking.transactionId || "Not recorded"}</span></p>
            </div>
          )}
          <ul className="my-4 space-y-1 text-sm text-gray-600">
            {booking.items.map((item) => (
              <li key={item.apparelType} className="flex justify-between gap-3">
                <span>
                  {item.apparelType} × {item.quantity}
                  <span className="mt-1 block text-xs font-medium text-[#ff206e]">
                    {itemServicesLabel(item.services)}
                  </span>
                </span>
                <span>
                  ৳{(item.quantity * item.unitPrice).toLocaleString("en-BD")}
                </span>
              </li>
            ))}
          </ul>
          <OrderCostBreakdown laundrySubtotal={booking.totalAmount - booking.deliveryCharge}
            deliveryCharge={booking.deliveryCharge} totalAmount={booking.totalAmount} />
          <time
            className="mt-2 block text-xs text-gray-500"
            dateTime={new Date(booking.createdAt).toISOString()}
          >
            {new Date(booking.createdAt).toLocaleString("en-GB", {
              timeZone: "Asia/Dhaka",
            })}
          </time>
          <BookingTimeline status={booking.status} history={booking.statusHistory} />
          {canManage && !isTerminalStatus(booking.status) && (
            <BookingActions key={booking.status} bookingId={booking.id} status={booking.status} />
          )}
        </article>
      ))}
    </div>
  );
}
