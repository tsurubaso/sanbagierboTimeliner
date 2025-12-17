export default function Page({ params }) {
  const { id } = params;

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Edit Event — {id}
      </h1>

      <form className="space-y-4">

        <div>
          <label className="block text-sm">Title</label>
          <input className="border w-full p-2" defaultValue="Révolution fictive" />
        </div>

        <div>
          <label className="block text-sm">Start date</label>
          <input type="date" className="border w-full p-2" defaultValue="1968-01-01" />
        </div>

        <div>
          <label className="block text-sm">End date</label>
          <input type="date" className="border w-full p-2" defaultValue="1970-01-01" />
        </div>

        <button className="px-4 py-2 bg-black text-white rounded">
          Save changes
        </button>
      </form>
    </main>
  );
}
