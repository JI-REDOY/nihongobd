import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

export async function requireAuth(callbackUrl?: string) {
  const session = await getSession();
  if (!session) {
    redirect(`/signin?callbackUrl=${callbackUrl || "/dashboard"}`);
  }
  return session;
}