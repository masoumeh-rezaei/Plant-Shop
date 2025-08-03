import TransparentCard from "@/components/GlassLayer";

export default function Home() {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <TransparentCard>
        <h2 className="text-2xl font-bold mb-4">عنوان دلخواه</h2>
        <p className="mb-2 text-lg">این یک متن تستی است.</p>
        <img src="/example.jpg" alt="نمونه" className="mx-auto mt-4 rounded-md w-32" />
        <button className="mt-4 px-4 py-2 rounded bg-white text-black hover:bg-gray-200">
          کلیک کن
        </button>
      </TransparentCard>
    </div>
  );
}
