import Sidebar from "@/components/ui/sidebar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-sm min-h-[calc(100vh-4rem)] p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </main>
    </div>
  );
}
