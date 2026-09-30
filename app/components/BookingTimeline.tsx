import { ORDER_STAGES, statusLabel, type StatusEvent } from "@/lib/order-lifecycle";

export default function BookingTimeline({ history, status }: { history: StatusEvent[]; status: string }) {
  const stages = status === "cancelled"
    ? [...ORDER_STAGES.filter(stage => history.some(event => event.status === stage)), "cancelled"]
    : [...ORDER_STAGES];
  const currentIndex = ORDER_STAGES.indexOf(status as (typeof ORDER_STAGES)[number]);
  return <ol aria-label="Order progress" className="mt-4 space-y-2 border-t border-gray-100 pt-4">
    {stages.map(stage => {
      const event = history.find(entry => entry.status === stage);
      const earlier = ORDER_STAGES.indexOf(stage as (typeof ORDER_STAGES)[number]) < currentIndex;
      return <li key={stage} aria-current={stage === status ? "step" : undefined}
        className={`flex items-start gap-2 text-xs ${event || stage === status ? "text-gray-700" : "text-gray-400"}`}>
        <span aria-hidden="true" className={`mt-1 h-2 w-2 shrink-0 rounded-full ${event ? "bg-[#ff206e]" : "bg-gray-200"}`} />
        <span><span className={stage === status ? "font-bold" : ""}>{statusLabel(stage)}</span>
          {event?.at ? <time className="ml-2" dateTime={event.at}>{new Date(event.at).toLocaleString("en-GB", { timeZone: "Asia/Dhaka" })}</time>
            : event || earlier || stage === status ? <span className="ml-2">Time not recorded</span> : null}
        </span>
      </li>;
    })}
  </ol>;
}
