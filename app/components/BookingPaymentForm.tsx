"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { BookingPayment } from "@/lib/booking-payment";
import { validateBookingPayment } from "@/lib/booking-payment";
import OrderCostBreakdown from "./OrderCostBreakdown";
import { DELIVERY_CHARGE } from "@/lib/order-pricing";

export default function BookingPaymentForm({ laundryName, subtotal, initialName, initialPhone, paymentNumber, paymentMethod,
  onSubmit, onCancel, message, signInRequired }: {
  laundryName: string; subtotal: number; initialName: string; initialPhone: string;
  paymentNumber: string; paymentMethod: string;
  onSubmit: (payment: BookingPayment) => Promise<void>; onCancel: () => void;
  message: string; signInRequired: boolean;
}) {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  return <section aria-label="Confirm booking and payment" className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
    <h1 className="font-bricolage text-3xl font-extrabold tracking-tight">Book {laundryName}</h1>
    <p className="mb-6 mt-2 text-gray-500">Confirm your details and payment reference.</p>
    <div className="mb-6"><OrderCostBreakdown laundrySubtotal={subtotal} deliveryCharge={DELIVERY_CHARGE} totalAmount={subtotal + DELIVERY_CHARGE} /></div>
    <form onSubmit={event => {
      event.preventDefault();
      const payment = validateBookingPayment({ customerName: name, phone, transactionId });
      if (!payment) { setError("Enter your name, a valid phone number and a transaction ID."); return; }
      setError("");
      startTransition(() => onSubmit(payment));
    }} className="space-y-5">
      <fieldset disabled={pending} className="space-y-5">
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-600">Your name
          <input required autoComplete="name" maxLength={100} value={name} onChange={event => setName(event.target.value)}
            placeholder="e.g. Rakib" className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-base font-normal normal-case text-black focus:outline-none focus:ring-2 focus:ring-[#ff206e]" />
        </label>
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-600">Phone number
          <input required type="tel" autoComplete="tel" value={phone} onChange={event => setPhone(event.target.value)}
            placeholder="01XXXXXXXXX" className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-base font-normal text-black focus:outline-none focus:ring-2 focus:ring-[#ff206e]" />
        </label>
        <div className="rounded-xl border border-dashed border-pink-200 bg-pink-50 p-4 text-sm leading-relaxed text-gray-700">
          {paymentNumber ? <>Pay <strong>৳{(subtotal + DELIVERY_CHARGE).toLocaleString("en-BD")}</strong> via bKash to <strong className="text-[#ff206e]">{paymentNumber}</strong> ({paymentMethod}) and enter the transaction ID below.</>
            : <>Get the payment instructions from {laundryName}, then enter your transaction ID below.</>}
          <p className="mt-2">A transaction ID is required. Payment is subject to verification by the laundry.</p>
        </div>
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-600">Transaction ID <span className="text-[#ff206e]">*</span>
          <input required autoComplete="off" maxLength={100} pattern="[A-Za-z0-9_\-]+" value={transactionId} onChange={event => setTransactionId(event.target.value)}
            placeholder="e.g. bKash TxnID" className="mt-2 block w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-base font-normal normal-case text-black focus:outline-none focus:ring-2 focus:ring-[#ff206e]" />
        </label>
      </fieldset>
      <p role="status" className="text-sm text-gray-600">{error || message}</p>
      {signInRequired && <Link href="/auth" className="block text-sm font-semibold text-[#ff206e] underline">Sign in to book</Link>}
      <button disabled={pending || !validateBookingPayment({ customerName: name, phone, transactionId })} type="submit" className="w-full rounded-xl bg-[#ff206e] p-4 font-bold text-white hover:bg-[#d41b5b] disabled:opacity-50">{pending ? "Booking…" : "Request booking"}</button>
      <button disabled={pending} type="button" onClick={onCancel} className="w-full rounded-xl border border-gray-300 p-4 font-bold hover:bg-gray-50 disabled:opacity-50">Cancel</button>
    </form>
  </section>;
}
