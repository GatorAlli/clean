export const ITEM_SERVICES = ["washing", "ironing"] as const;
export type ItemService = (typeof ITEM_SERVICES)[number];

export function isItemServices(value: unknown): value is ItemService[] {
  return Array.isArray(value) && value.length >= 1 && value.length <= 2 &&
    value.every(service => ITEM_SERVICES.includes(service)) &&
    new Set(value).size === value.length;
}

export function toggleItemService(current: ItemService[], service: ItemService): ItemService[] {
  if (!current.includes(service)) return ITEM_SERVICES.filter(option => option === service || current.includes(option));
  return current.length === 1 ? current : current.filter(option => option !== service);
}

export function itemServicesLabel(services?: ItemService[]) {
  if (!isItemServices(services)) return "Service not recorded";
  return ITEM_SERVICES.filter(service => services.includes(service))
    .map(service => service === "washing" ? "Washing" : "Ironing").join(" + ");
}

export function buildBookingItems(
  pricing: { apparelType: string; unitPrice: number }[],
  quantities: Record<string, number>,
  services: Record<string, ItemService[]>,
) {
  return Object.entries(quantities).filter(([, quantity]) => quantity > 0)
    .map(([apparelType, quantity]) => {
      const options = Object.hasOwn(services, apparelType) ? services[apparelType] : undefined;
      if (!isItemServices(options)) throw new Error("Choose washing, ironing or both for every selected item.");
      const price = pricing.find(item => item.apparelType === apparelType);
      if (!price) throw new Error("Clothing item not found.");
      return { apparelType, quantity, unitPrice: price.unitPrice, services: [...options] };
    });
}
