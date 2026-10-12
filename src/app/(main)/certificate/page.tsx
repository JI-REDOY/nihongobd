import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { CertificatePage } from "@/components/certificate/CertificatePage";

export default async function CertificateRoute() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/certificate");

  return <CertificatePage />;
}