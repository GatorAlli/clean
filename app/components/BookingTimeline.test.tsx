import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import BookingTimeline from "./BookingTimeline";

test("customer timeline shows completed times, current stage and remaining steps", () => {
  const html = renderToStaticMarkup(createElement(BookingTimeline, {
    status: "accepted", history: [
      { status: "pending", at: "2026-10-01T00:00:00Z" },
      { status: "accepted", at: "2026-10-01T01:00:00Z" },
    ],
  }));
  assert.match(html, /aria-current="step"/);
  assert.match(html, /Accepted/);
  assert.match(html, /Out for delivery/);
  assert.match(html, /07:00:00/); // UTC + 6, regardless of host timezone.
  assert.match(html, /dateTime="2026-10-01T01:00:00Z"/i);
});

test("cancelled orders show cancellation and omit unfinished future stages", () => {
  const html = renderToStaticMarkup(createElement(BookingTimeline, {
    status: "cancelled", history: [
      { status: "pending", at: "2026-10-01T00:00:00Z" },
      { status: "cancelled", at: "2026-10-01T01:00:00Z" },
    ],
  }));
  assert.match(html, /Cancelled/);
  assert.doesNotMatch(html, /Delivered/);
});

test("legacy orders do not invent missing timestamps", () => {
  const html = renderToStaticMarkup(createElement(BookingTimeline, {
    status: "delivered", history: [{ status: "delivered", at: null }],
  }));
  assert.match(html, /Time not recorded/);
  assert.doesNotMatch(html, /datetime=/i);
});
