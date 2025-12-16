export default async function EventPage({ params }) {
  let {id}=await params
  return (
    <div className="p-4">
      <h1>Event {id}</h1>
    </div>
  )
}
