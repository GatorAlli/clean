import Card from "../components/card";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { laundries } from "@/lib/drizzle/schema";

export default async function PageBody() {
  //Drizzle
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle({ client });
  const stores = await db.select().from(laundries);
  return (
    <div>
      {stores.map((e, index) => (
        <Card
          key={index}
          name={e.name}
          location={e.location}
          about={e.about ?? ""}
          pricing={e.pricing}
          url={`/explore/${e.id}`}
        />
      ))}
    </div>
  );
}
