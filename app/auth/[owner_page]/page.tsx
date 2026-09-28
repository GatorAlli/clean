import { Label } from "@/components/ui/label";
import { laundries } from "@/lib/drizzle/schema";
import { generateServerClient } from "@/lib/supabase/server";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { redirect } from "next/navigation";
import postgres from "postgres";

export default async function Page({
  params,
}: {
  params: Promise<{ owner_page: string }>;
}) {
  const { ownerPage } = await params;
  const storeId = Number(ownerPage);

  const supabase = await generateServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/auth");
  }

  //Drizzle
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle({ client });

  const [store] = await db
    .select()
    .from(laundries)
    .where(
      and(
        eq(laundries.id, storeId),
        eq(laundries.ownerEmail, user.email.toLowerCase()),
      ),
    )
    .limit(1);

  return (
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
  );
}
