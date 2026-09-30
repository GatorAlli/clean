import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import BookingList from "./BookingList";
import type { OwnerBooking } from "@/lib/drizzle/schema";

test("owner booking list shows saved services for each clothing item", () => {
  const booking: OwnerBooking = {
    id: 1, laundryId: 1, customerId: "00000000-0000-0000-0000-000000000001",
    customerName: "Test Customer", customerEmail: "test@example.com", laundryName: "Test Laundry",
    requestId: "00000000-0000-4000-8000-000000000001", status: "delivered", statusHistory: [],
    createdAt: new Date("2026-10-01T00:00:00Z"), totalAmount: 140,
    customerLocation: "Office reception, Motijheel", customerPhone: "+8801712345678",
    items: [
      { apparelType: "Shirt", quantity: 1, unitPrice: 40, services: ["washing"] },
      { apparelType: "Pants", quantity: 2, unitPrice: 50, services: ["washing", "ironing"] },
    ],
  };
  const html = renderToStaticMarkup(createElement(BookingList, { bookings: [booking], showCustomer: true, canManage: true }));
  assert.match(html, /Test Customer/);
  assert.match(html, /Shirt × 1/);
  assert.match(html, /Pants × 2/);
  assert.match(html, />Washing</);
  assert.match(html, />Washing \+ Ironing</);
  assert.match(html, /Office reception, Motijheel/);
  assert.match(html, /\+8801712345678/);
  const customerHtml = renderToStaticMarkup(createElement(BookingList, { bookings: [booking] }));
  assert.doesNotMatch(customerHtml, /Office reception, Motijheel/);
  assert.doesNotMatch(customerHtml, /\+8801712345678/);
});
