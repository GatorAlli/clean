export const ORDER_STAGES = ["pending", "accepted", "collected", "processing", "ready", "out_for_delivery", "delivered"] as const;
export type OrderStage = (typeof ORDER_STAGES)[number];
export type BookingStatus = OrderStage | "cancelled";
export type StatusEvent = { status: BookingStatus; at: string | null; actorId?: string };

const LABELS: Record<BookingStatus, string> = {
  pending: "Pending", accepted: "Accepted", collected: "Collected", processing: "Processing",
  ready: "Ready", out_for_delivery: "Out for delivery", delivered: "Delivered", cancelled: "Cancelled",
};

export function isBookingStatus(value: unknown): value is BookingStatus {
  return typeof value === "string" && (value === "cancelled" || ORDER_STAGES.includes(value as OrderStage));
}

export function statusLabel(status: string) {
  return status === "completed" ? "Delivered" : isBookingStatus(status) ? LABELS[status] : status;
}

export function isTerminalStatus(status: string) {
  return status === "delivered" || status === "cancelled" || status === "completed";
}

export function nextOrderStage(status: string): OrderStage | null {
  const index = ORDER_STAGES.indexOf(status as OrderStage);
  return index >= 0 && index < ORDER_STAGES.length - 1 ? ORDER_STAGES[index + 1] : null;
}

export function canTransition(from: string, to: string) {
  return isBookingStatus(from) && !isTerminalStatus(from) &&
    (to === "cancelled" || nextOrderStage(from) === to);
}

export function transitionLabel(status: OrderStage) {
  const labels: Record<OrderStage, string> = {
    pending: "Pending", accepted: "Accept order", collected: "Mark collected", processing: "Start processing",
    ready: "Mark ready", out_for_delivery: "Send for delivery", delivered: "Mark delivered",
  };
  return labels[status];
}
