import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ProfileContactForm from "./ProfileContactForm";

test("profile provides separate street address and locality fields with no city input", () => {
  const html = renderToStaticMarkup(createElement(ProfileContactForm, { contact: {
    streetAddress: "House 10, Road 2", locality: "Banani", phone: "+8801712345678",
  } }));
  assert.match(html, /aria-label="My street address"/);
  assert.match(html, /House 10, Road 2/);
  assert.match(html, /aria-label="My locality"/);
  assert.match(html, /value="Banani"/);
  assert.match(html, /All addresses are in Dhaka/);
  assert.doesNotMatch(html, /autocomplete="address-level2"/i);
});

test("legacy location is shown for reference without guessing street or locality", () => {
  const html = renderToStaticMarkup(createElement(ProfileContactForm, { contact: {
    streetAddress: "", locality: "", phone: "", legacyLocation: "Gulshan",
  } }));
  assert.match(html, /Previous location: Gulshan/);
  assert.doesNotMatch(html, /value="Gulshan"/);
});
