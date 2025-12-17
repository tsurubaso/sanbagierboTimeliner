export default function EditPersonPage({ params }) {
  const { id } = params;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-12">

      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Edit Person</h1>
        <p className="text-sm text-gray-500">
          Person ID: <span className="font-mono">{id}</span>
        </p>
      </header>

      {/* ========================= */}
      {/* Person form */}
      {/* ========================= */}
      <form className="space-y-10">

        {/* Identity */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Identity</h2>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Jean Dupont"
            />
          </div>
        </section>

        {/* Dates */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Life dates</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Birth date</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Death date</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Summary</h2>

          <textarea
            rows={4}
            className="w-full border rounded px-3 py-2"
            placeholder="Short description of the person"
          />
        </section>

        {/* Stories */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Stories</h2>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Story s1</span>
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>Story s2</span>
            </label>
          </div>
        </section>
      </form>

      {/* ========================= */}
      {/* Moments (read-only) */}
      {/* ========================= */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Moments</h2>

        <div className="border rounded divide-y">
          <div className="p-3 flex justify-between text-sm">
            <span>🎂 BIRTH — 1950-01-01</span>
            <span className="text-gray-500">Born in Paris</span>
          </div>

          <div className="p-3 flex justify-between text-sm">
            <span>💍 MARRIAGE — 1975-06-20</span>
            <span className="text-gray-500">Marriage with Anne</span>
          </div>
        </div>

        <button className="text-sm underline">
          + Add moment
        </button>
      </section>

      {/* ========================= */}
      {/* Documents (read-only) */}
      {/* ========================= */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Documents</h2>

        <div className="border rounded divide-y">
          <div className="p-3 text-sm">
            📎 Wedding photo (EMBED)
          </div>

          <div className="p-3 text-sm">
            🔗 Newspaper article (LINK)
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* Actions */}
      {/* ========================= */}
      <section className="flex justify-between">
        <button className="text-red-600 underline">
          Delete person
        </button>

        <div className="flex gap-4">
          <button className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button className="px-4 py-2 bg-black text-white rounded">
            Save changes
          </button>
        </div>
      </section>

    </main>
  );
}
