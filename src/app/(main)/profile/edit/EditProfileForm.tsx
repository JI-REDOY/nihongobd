"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";
import { AuthInput } from "@/components/auth/AuthInput";
import { useToast } from "@/context/ToastContext";

interface EditProfileFormProps {
  initialName: string;
  initialImage: string;
  email: string;
}

const MAX_SIZE = 2 * 1024 * 1024;

export function EditProfileForm({
  initialName,
  initialImage,
  email,
}: EditProfileFormProps) {
  const router = useRouter();
  const toast = useToast();
  const [name, setName] = useState(initialName);
  const [imagePreview, setImagePreview] = useState(initialImage);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE) {
      toast.warning("ছবি বড়", "২MB এর কম ছবি দাও");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("ভুল ফাইল", "শুধু image file allow করা হয়");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("আপলোড ব্যর্থ", data.error || "আবার চেষ্টা করুন");
        setImagePreview(initialImage);
        return;
      }

      setImagePreview(data.imageUrl);
      toast.success("সফল!", "ছবি আপলোড হয়েছে");
    } catch {
      toast.error("আপলোড ব্যর্থ", "আবার চেষ্টা করুন");
      setImagePreview(initialImage);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.updateUser({ name });

    if (error) {
      toast.error("আপডেট ব্যর্থ", error.message || "আবার চেষ্টা করুন");
      setLoading(false);
      return;
    }

    toast.success("সফল!", "প্রোফাইল আপডেট হয়েছে");
    setLoading(false);

    setTimeout(() => {
      router.push("/profile");
      router.refresh();
    }, 600);
  }

  const initial = (name || "U")[0].toUpperCase();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex flex-col items-center text-center">
        <div className="relative group">
          {imagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagePreview}
              alt="Preview"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-card ring-2 ring-jp-red/20"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-jp-red text-white flex items-center justify-center text-4xl font-bold shadow-card ring-2 ring-jp-red/20">
              {initial}
            </div>
          )}

          <label className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-jp-red text-white flex items-center justify-center cursor-pointer shadow-md hover:bg-jp-red/90 transition-colors border-2 border-white">
            <span className="text-base">{uploading ? "⏳" : "📷"}</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-text-primary font-bangla">
            প্রোফাইল ছবি
          </p>
          <p className="text-xs text-text-secondary mt-1 font-bangla">
            {uploading
              ? "আপলোড হচ্ছে..."
              : "ক্যামেরা আইকনে ক্লিক করে ছবি বদলাও (max 2MB)"}
          </p>
        </div>
      </div>

      <div className="border-t border-border" />

      <AuthInput
        label="তোমার নাম"
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="তোমার পূর্ণ নাম"
        required
      />

      <div className="w-full">
        <label className="block text-sm font-medium text-text-primary mb-1.5 font-bangla">
          ইমেইল
        </label>
        <div className="relative">
          <input
            type="email"
            value={email}
            readOnly
            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-alt text-text-secondary cursor-not-allowed min-h-[44px]"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-secondary">
            🔒
          </span>
        </div>
        <p className="text-xs text-text-secondary mt-1 font-bangla">
          ইমেইল পরিবর্তন করা যাবে না
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.back()}
          className="flex-1 font-bangla"
        >
          বাতিল
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={loading}
          disabled={uploading}
          className="flex-1 font-bangla"
        >
          আপডেট করো
        </Button>
      </div>
    </form>
  );
}