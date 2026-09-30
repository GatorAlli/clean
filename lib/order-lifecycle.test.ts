import assert from "node:assert/strict";
import test from "node:test";
import { ORDER_STAGES, canTransition, isBookingStatus, isTerminalStatus, nextOrderStage } from "./order-lifecycle";

test("orders advance through every agreed stage in order", () => {
  for (let i = 0; i < ORDER_STAGES.length - 1; i++) {
    assert.equal(nextOrderStage(ORDER_STAGES[i]), ORDER_STAGES[i + 1]);
    assert.equal(canTransition(ORDER_STAGES[i], ORDER_STAGES[i + 1]), true);
  }
  assert.equal(nextOrderStage("delivered"), null);
});

test("skipping, reversing, repeating and unknown stages are rejected", () => {
  assert.equal(canTransition("pending", "delivered"), false);
  assert.equal(canTransition("processing", "accepted"), false);
  assert.equal(canTransition("ready", "ready"), false);
  assert.equal(canTransition("unknown", "cancelled"), false);
  assert.equal(isBookingStatus("completed"), false);
  assert.equal(isBookingStatus(null), false);
});

test("unfinished orders can be cancelled; delivered and cancelled orders are final", () => {
  for (const stage of ORDER_STAGES.slice(0, -1)) assert.equal(canTransition(stage, "cancelled"), true);
  for (const terminal of ["delivered", "cancelled"]) {
    assert.equal(isTerminalStatus(terminal), true);
    for (const next of [...ORDER_STAGES, "cancelled"]) assert.equal(canTransition(terminal, next), false);
  }
});
