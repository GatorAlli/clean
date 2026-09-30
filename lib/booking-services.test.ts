import assert from "node:assert/strict";
import test from "node:test";
import { buildBookingItems, isItemServices, itemServicesLabel, toggleItemService, type ItemService } from "./booking-services";

test("each clothing type keeps its own services in the saved booking payload", () => {
  const services: Record<string, ItemService[]> = { Shirt: ["washing"], Pants: ["ironing"], Suit: ["washing", "ironing"] };
  const items = buildBookingItems([
    { apparelType: "Shirt", unitPrice: 40 },
    { apparelType: "Pants", unitPrice: 50 },
    { apparelType: "Suit", unitPrice: 100 },
  ], { Shirt: 2, Pants: 1, Suit: 1 }, services);
  assert.deepEqual(JSON.parse(JSON.stringify(items)).map((item: { services: ItemService[] }) => item.services),
    [["washing"], ["ironing"], ["washing", "ironing"]]);
  assert.equal(items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0), 230);
  services.Shirt.push("ironing");
  assert.deepEqual(items[0].services, ["washing"]);
});

test("either service or both can be chosen without clearing the last selection", () => {
  assert.deepEqual(toggleItemService(["washing"], "washing"), ["washing"]);
  assert.deepEqual(toggleItemService(["ironing"], "ironing"), ["ironing"]);
  assert.deepEqual(toggleItemService(["washing"], "ironing"), ["washing", "ironing"]);
  assert.deepEqual(toggleItemService(["ironing"], "washing"), ["washing", "ironing"]);
  assert.deepEqual(toggleItemService(["washing", "ironing"], "washing"), ["ironing"]);
  assert.deepEqual(toggleItemService(["washing", "ironing"], "ironing"), ["washing"]);
});

test("missing, empty, duplicate or unknown services cannot enter a new booking", () => {
  for (const value of [undefined, null, [], ["washing", "washing"], ["dry_cleaning"], "washing", ["washing", "ironing", "washing"]]) {
    assert.equal(isItemServices(value), false);
    assert.throws(() => buildBookingItems([{ apparelType: "Shirt", unitPrice: 40 }], { Shirt: 1 }, { Shirt: value } as Record<string, ItemService[]>));
  }
  assert.throws(() => buildBookingItems([{ apparelType: "Shirt", unitPrice: 40 }], { Shirt: 1 }, {}));
  assert.deepEqual(buildBookingItems([{ apparelType: "Shirt", unitPrice: 40 }], { Shirt: 0 }, {}), []);
});

test("booking display labels distinguish each service and preserve older bookings", () => {
  assert.equal(itemServicesLabel(["washing"]), "Washing");
  assert.equal(itemServicesLabel(["ironing"]), "Ironing");
  assert.equal(itemServicesLabel(["ironing", "washing"]), "Washing + Ironing");
  assert.equal(itemServicesLabel(), "Service not recorded");
});
