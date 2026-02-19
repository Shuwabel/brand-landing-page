import { supabase } from "@/lib/supabase";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let users = [];

  try {
    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    users = data || [];
  } catch (error) {
    console.error("Failed to fetch waitlist:", error);
  }

  return <DashboardClient users={JSON.parse(JSON.stringify(users))} />;
}

