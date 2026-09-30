import assert from "node:assert/strict";
import test from "node:test";
import { formatContactAddress, getContactDetails, normalizeContactPhone, validateContact } from "./contact-details";

test("Bangladesh phone formats normalize consistently", () => {
  for (const phone of ["01712345678", "8801712345678", "+880 1712-345678"]) {
    assert.equal(normalizeContactPhone(phone), "+8801712345678");
  }
  assert.equal(normalizeContactPhone("+1 (212) 555-1234"), "+12125551234");
});

test("contact validation rejects missing location and invalid phone inputs", () => {
  assert.deepEqual(validateContact(" House 10, Road 2 ", " Gulshan ", "01712345678"), {
    streetAddress: "House 10, Road 2", locality: "Gulshan", phone: "+8801712345678",
  });
  for (const location of ["", " ", "a".repeat(501), null, {}]) assert.equal(validateContact(location, "Gulshan", "01712345678"), null);
  for (const phone of ["123", "not a phone", "call01712345678", null, {}, "00000000000"]) assert.equal(validateContact("House 10", "Banani", phone), null);
});

test("profiles use edited contact values and fall back to legacy auth phone", () => {
  assert.deepEqual(getContactDetails({ user_metadata: { location: "Gulshan", auth_phone: "01712345678" }, phone: "8801812345678" }), {
    streetAddress: "", locality: "", legacyLocation: "Gulshan", phone: "+8801712345678",
  });
  assert.equal(getContactDetails({ user_metadata: {}, phone: "8801812345678" }).phone, "+8801812345678");
  assert.deepEqual(getContactDetails({ user_metadata: {} }), { streetAddress: "", locality: "", phone: "" });
});

test("street address and locality are required independently; Dhaka is implicit", () => {
  for (const locality of ["", " ", "a".repeat(101), null, {}]) assert.equal(validateContact("House 10", locality, "01712345678"), null);
  assert.equal(formatContactAddress({ streetAddress: "House 10, Road 2", locality: "Banani" }), "House 10, Road 2, Banani, Dhaka");
  assert.deepEqual(getContactDetails({ user_metadata: { street_address: "House 10", locality: "Banani", location: "Older address" } }), {
    streetAddress: "House 10", locality: "Banani", phone: "",
  });
});
