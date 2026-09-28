import { laundries } from "@/lib/drizzle/schema";
import { generateServerClient } from "@/lib/supabase/server";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { notFound, redirect } from "next/navigation";
import postgres from "postgres";

import PageBody from "./PageBody";

export default async function Page({
  params,
}: {
  params: Promise<{ owner_page: string }>;
}) {
  const { owner_page: ownerPage } = await params;
  const storeId = Number(ownerPage);

  if (!Number.isSafeInteger(storeId) || storeId <= 0) {
    notFound();
  }

  const supabase = await generateServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/auth");
  }

  //Drizzle
  const client = postgres(process.env.DATABASE_URL!);
  let store: typeof laundries.$inferSelect | undefined;

  try {
    const db = drizzle({ client });
    [store] = await db
      .select()
      .from(laundries)
      .where(
        and(
          eq(laundries.id, storeId),
          eq(laundries.ownerEmail, user.email.toLowerCase()),
        ),
      )
      .limit(1);
  } finally {
    await client.end();
  }

  if (!store) {
    notFound();
  }

  return <PageBody store={store} />;
}
