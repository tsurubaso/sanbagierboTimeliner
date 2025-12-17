export default function Page({ params }) {
  const { id } = params;

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Edit Moment — {id}
      </h1>

      <form className="space-y-4">

        <div>
          <label className="block text-sm">Person</label>
          <select className="border w-full p-2">
            <option selected>Jean Dupont</option>
            <option>Marie Lefèvre</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Type</label>
          <select className="border w-full p-2">
            <option>BIRTH</option>
            <option selected>MARRIAGE</option>
            <option>ACCIDENT</option>
            <option>OTHER</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Date</label>
          <input
            type="date"
            className="border w-full p-2"
            defaultValue="1975-06-20"
          />
        </div>

        <div>
          <label className="block text-sm">Label</label>
          <input
            className="border w-full p-2"
            defaultValue="Marriage with Anne"
          />
        </div>

        <button className="px-4 py-2 bg-black text-white rounded">
          Save changes
        </button>
      </form>
    </main>
  );
}
