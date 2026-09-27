import { Pricing } from "@/app/auth/AdminPage";

export default function PageBody({
  name,
  location,
  prices,
  about,
}: {
  name: string;
  location: string;
  prices: Pricing[];
  about: string;
}) {
  return (
    <div>
      <span>{name}</span>
      <span>{location}</span>
      <ul>
        {prices.map((e, id) => (
          <li key={id}>
            <span>
              {e.apparelType}:{e.unitPrice}
            </span>
          </li>
        ))}
      </ul>
      <span>{about}</span>
    </div>
  );
}
