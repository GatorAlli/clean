import { Label } from "@/components/ui/label";
export default function PageBody() {
  return (
    <div>
      <div>
        <Label>{store.name}</Label>
        <Label>{store.location}</Label>
        <Label>{store.about}</Label>

        <Label>Prices</Label>

        <ul>
          {store.pricing.map((item) => (
            <li key={item.apparelType}>
              <Label>
                {item.apparelType}: {item.unitPrice}
              </Label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
