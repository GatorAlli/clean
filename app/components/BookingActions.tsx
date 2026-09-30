"use client";

import { startTransition, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { updateBookingStatus } from "@/app/auth/[owner_page]/actions";
import { isTerminalStatus, nextOrderStage, transitionLabel, type BookingStatus } from "@/lib/order-lifecycle";

export default function BookingActions({ bookingId, status }: { bookingId: number; status: BookingStatus }) {
  const router = useRouter();
  const submitting = useRef(false);
  const [pending, setPending] = useState<BookingStatus | null>(null);
  const [message, setMessage] = useState("");
  const [processedStatus, setProcessedStatus] = useState<BookingStatus | null>(null);
  const next = nextOrderStage(status);

  async function update(target: BookingStatus) {
    if (submitting.current) return;
    submitting.current = true;
    setPending(target);
    setMessage("");
    try {
      const result = await updateBookingStatus(bookingId, target, status);
      setMessage(result.message);
      if (result.ok) setProcessedStatus(status);
      router.refresh();
    } catch {
      setMessage("Could not update the order. Please retry.");
    } finally {
      submitting.current = false;
      setPending(null);
    }
  }

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      {!isTerminalStatus(status) && processedStatus !== status && (
        <div className="flex gap-3">
          {next && <button
            type="button"
            disabled={pending !== null}
            onClick={() => startTransition(() => update(next))}
            className="rounded-lg bg-[#ff206e] px-4 py-2 text-sm font-bold text-white hover:bg-[#d41b5b] disabled:opacity-50"
          >
            {pending === next ? "Updating…" : transitionLabel(next)}
          </button>}
          <button
            type="button"
            disabled={pending !== null}
            onClick={() => startTransition(() => update("cancelled"))}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-bold hover:bg-gray-50 disabled:opacity-50"
          >
            {pending === "cancelled" ? "Cancelling…" : "Cancel"}
          </button>
        </div>
      )}
      <p role="status" className="mt-2 text-sm text-gray-600">
        {message}
      </p>
    </div>
  );
}
