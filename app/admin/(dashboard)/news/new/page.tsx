import { NewsForm } from "@/components/admin/NewsForm";

export default function NewNewsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-brand-purple-dark">New Post</h1>
      <div className="mt-6 rounded-lg border border-black/10 bg-white p-6">
        <NewsForm />
      </div>
    </div>
  );
}
