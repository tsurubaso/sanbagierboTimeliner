export default function Page() {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">New Moment</h1>

      <form className="space-y-4">

        <div>
          <label className="block text-sm">Person</label>
          <select className="border w-full p-2">
            <option>Jean Dupont</option>
            <option>Marie Lefèvre</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Type</label>
          <select className="border w-full p-2">
            <option>BIRTH</option>
            <option>DEATH</option>
            <option>MARRIAGE</option>
            <option>ACCIDENT</option>
            <option>JOB_START</option>
            <option>JOB_END</option>
            <option>MEETING</option>
            <option>BATTLE</option>
            <option>OTHER</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Date</label>
          <input type="date" className="border w-full p-2" />
        </div>

        <div>
          <label className="block text-sm">Label</label>
          <input className="border w-full p-2" />
        </div>

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

        <button className="px-4 py-2 bg-black text-white rounded">
          Create moment
        </button>
      </form>
    </main>
  );
}
