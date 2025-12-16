export default function PersonPage({ params }) {
  return (
    <div className="p-4">
      <h1>Person {params.id}</h1>
    </div>
  )
}
