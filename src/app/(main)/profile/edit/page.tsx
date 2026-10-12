import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { EditProfileForm } from "./EditProfileForm";

export default async function EditProfilePage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/profile/edit");

  const { user } = session;

  return (
    <div className="py-10 sm:py-14">
      <Container>
        <div className="max-w-lg mx-auto">
          {/* Breadcrumb */}
          <Link
            href="/profile"
            className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-jp-red transition-colors font-bangla"
          >
            <span>←</span>
            <span>প্রোফাইলে ফিরে যাও</span>
          </Link>

          {/* Header */}
          <div className="mt-6 mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 font-bangla">
              প্রোফাইল সাজাও
            </h1>
            <p className="text-text-secondary font-bangla">
              তোমার নাম আর ছবি আপডেট করো
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-border shadow-soft p-6 sm:p-8">
            <EditProfileForm
              initialName={user.name || ""}
              initialImage={user.image || ""}
              email={user.email}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}