



import {
  getAllPersons,
  getAllEvents,
  getDocumentsForTimeline
} from "@/lib/timeline"

import TimelineGlobal from "@/components/Timeline/TimelineGlobal"

const personsList = getAllPersons()
const eventsList = getAllEvents()
const documentsList = getDocumentsForTimeline()

export default function TimelinePage() {
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
