export default function NewPersonPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold">Create Person</h1>
        <p className="text-sm text-gray-500">
          Define a person and their life span
        </p>
      </header>

      {/* Form */}
      <form className="space-y-8">
        {/* Identity */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Identity</h2>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Jean Dupont"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </section>

        {/* Dates */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Life dates</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Birth date</label>
              <input type="date" className="w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium">Death date</label>
              <input type="date" className="w-full border rounded px-3 py-2" />
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Summary</h2>

          <textarea
            placeholder="Short description of the person"
            rows={4}
            className="w-full border rounded px-3 py-2"
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

        {/* MOMENTS */}
        <section className="space-y-4">
          <h2 className="font-semibold">Moments</h2>

          {/* ONE MOMENT */}
          <div className="border rounded p-4 space-y-3">
            <input className="border p-2 w-full" placeholder="Moment name" />

            <input type="date" className="border p-2 w-full" />
            <input
              className="border p-2 w-full"
              placeholder="Label (accident, discovery, mariage)"
            />
          </div>

          <button className="text-sm underline">+ Add another Moment</button>

          {/* DOCUMENTS */}
          <div className="space-y-4">
            <h2 className="font-semibold">Documents</h2>
            {/* one DOCUMENT */}
            <div className="border rounded p-4 space-y-3">
              <input className="border p-2 w-full" placeholder="URL" />

              <select className="border p-2 w-full">
                <option>EMBED</option>
                <option>LINK</option>
              </select>

              <input
                className="border p-2 w-full"
                placeholder="Tags (portrait, press, archive)"
              />
            </div>
          </div>

          <button className="text-sm underline">+ Add another Document</button>
        </section>

        {/* Actions */}
        <section className="flex justify-end gap-4">
          <button type="button" className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Save Person
          </button>
        </section>
      </form>
    </main>
  );
}
