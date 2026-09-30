import assert from "node:assert/strict";
import test from "node:test";
import { calculateOrderTotal } from "./order-pricing";

test("delivery is charged once per order regardless of quantities or clothing types", () => {
  assert.deepEqual(calculateOrderTotal([{ quantity: 2, unitPrice: 50 }, { quantity: 1, unitPrice: 80 }]), {
    laundrySubtotal: 180, deliveryCharge: 100, totalAmount: 280,
  });
  assert.equal(calculateOrderTotal([{ quantity: 10, unitPrice: 50 }]).deliveryCharge, 100);
});

test("integer overflow includes the delivery fee", () => {
  assert.equal(calculateOrderTotal([{ quantity: 1, unitPrice: 2147483547 }]).totalAmount, 2147483647);
  assert.throws(() => calculateOrderTotal([{ quantity: 1, unitPrice: 2147483548 }]));
  assert.throws(() => calculateOrderTotal([{ quantity: 1, unitPrice: -1 }]));
  assert.throws(() => calculateOrderTotal([{ quantity: 0.5, unitPrice: 100 }]));
});
