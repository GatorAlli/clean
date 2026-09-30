import { normalizeContactPhone } from "./contact-details";

export type BookingPayment = { customerName: string; phone: string; transactionId: string };

export function validateBookingPayment(value: unknown): BookingPayment | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const phone = normalizeContactPhone(input.phone);
  if (typeof input.customerName !== "string" || !input.customerName.trim() || input.customerName.trim().length > 100 ||
    typeof input.transactionId !== "string" || !/^[A-Za-z0-9_-]{1,100}$/.test(input.transactionId.trim()) || !phone) return null;
  return { customerName: input.customerName.trim(), phone, transactionId: input.transactionId.trim().toUpperCase() };
}
