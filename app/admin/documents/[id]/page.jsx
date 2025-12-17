export default function Page({ params }) {
  const { id } = params;

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Edit Document — {id}
      </h1>

      <form className="space-y-4">

        <div>
          <label className="block text-sm">Display type</label>
          <select className="border w-full p-2">
            <option selected>EMBED</option>
            <option>LINK</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">URL</label>
          <input
            className="border w-full p-2"
            defaultValue="https://pin.it/4UprJqXMC"
          />
        </div>

        <div>
          <label className="block text-sm">Title</label>
          <input
            className="border w-full p-2"
            defaultValue="Wedding photo"
          />
        </div>

        <div>
          <label className="block text-sm">Description</label>
          <textarea className="border w-full p-2">
            Jean and Anne wedding day
          </textarea>
        </div>

        <div>
          <label className="block text-sm">Linked moment</label>
          <select className="border w-full p-2">
            <option selected>Marriage with Anne</option>
            <option>Born in Paris</option>
          </select>
        </div>

        <button className="px-4 py-2 bg-black text-white rounded">
          Save changes
        </button>
      </form>
    </main>
  );
}
