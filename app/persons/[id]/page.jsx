export default async function PersonPage({ params }) {
  let {id}=await params
  return (
    <div className="p-4">
      <h1>Person {id}</h1>
    </div>
  )
}
