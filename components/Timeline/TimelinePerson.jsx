"use client"

import { useEffect, useRef } from "react"
import { Timeline } from "vis-timeline/standalone"
import "vis-timeline/styles/vis-timeline-graph2d.css"

export default function TimelinePerson({ person, events }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const groups = [
      { id: "life", content: "🧍 Life" },
      { id: "events", content: "🌍 Events" }
    ]

    const items = []

    // Life span
    items.push({
      id: `life-${person.id}`,
      content: person.name,
      start: person.birthDate,
      end: person.deathDate || new Date(),
      group: "life"
    })

    // Events filtered
    events.forEach((e) => {
      items.push({
        id: e.id,
        content: e.title,
        start: e.startDate,
        end: e.endDate || undefined,
        group: "events"
      })
    })

    const timeline = new Timeline(
      containerRef.current,
      items,
      groups,
      {
        stack: false,
        showCurrentTime: true
      }
    )

    return () => timeline.destroy()
  }, [person, events])

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] border"
    />
  )
}
