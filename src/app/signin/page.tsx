import Link from "next/link";
import { SignInForm } from "./SignInForm";
import { Container } from "@/components/layout/Container";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-alt">
      <Container className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-10 h-10 rounded-lg bg-jp-red text-white flex items-center justify-center text-xl font-bold">
                日
              </span>
              <span className="text-xl font-bold">
                Nihongo<span className="text-jp-red">BD</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-text-primary font-bangla">
              স্বাগতম!
            </h1>
            <p className="text-text-secondary mt-1 font-bangla">
              তোমার শেখার যাত্রা চালিয়ে যাও
            </p>
          </div>

          <div className="bg-white rounded-xl border border-border shadow-soft p-6 sm:p-8">
            <SignInForm />
          </div>

          <p className="text-center mt-6 text-sm text-text-secondary font-bangla">
            নতুন ব্যবহারকারী?{" "}
            <Link
              href="/signup"
              className="text-jp-red font-medium hover:underline"
            >
              সাইন আপ করো
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}