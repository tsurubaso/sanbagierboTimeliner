import {
  getAllPersons,
  getAllEvents,
  getDocumentsForTimeline
} from "@/lib/timeline"

import TimelineGlobal from "@/components/Timeline/TimelineGlobal"

export default async function TimelinePage() {
  const personsList = await getAllPersons()
  const eventsList = await getAllEvents()
  const documentsList = await getDocumentsForTimeline()

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Timeline</h1>
      <TimelineGlobal
        persons={personsList}
        events={eventsList}
        documents={documentsList}
      />
    </div>
  )
}
