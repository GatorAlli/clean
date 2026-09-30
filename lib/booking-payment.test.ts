import assert from "node:assert/strict";
import test from "node:test";
import { validateBookingPayment } from "./booking-payment";

test("booking requires a transaction ID and valid customer details", () => {
  const details = { customerName: "Rakib", phone: "01712345678" };
  for (const transactionId of [undefined, null, "", "   ", "TXN 123", "x".repeat(101)]) {
    assert.equal(validateBookingPayment({ ...details, transactionId }), null);
  }
  assert.equal(validateBookingPayment({ ...details, phone: "invalid", transactionId: "TXN123" }), null);
  assert.equal(validateBookingPayment({ ...details, customerName: " ", transactionId: "TXN123" }), null);
});

test("booking normalizes the reference and customer details for the owner", () => {
  assert.deepEqual(validateBookingPayment({ customerName: " Rakib ", phone: "01712345678", transactionId: " txn123 " }), {
    customerName: "Rakib", phone: "+8801712345678", transactionId: "TXN123",
  });
});
