"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Timeline } from "vis-timeline/standalone"
import "vis-timeline/styles/vis-timeline-graph2d.css"

import persons from "@/data/persons.json"
import events from "@/data/events.json"

export default function TimelineGlobal() {
  const containerRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (!containerRef.current) return

    const groups = [
      { id: "events", content: "🌍 Events" },
      ...persons.map((p) => ({
        id: p.id,
        content: p.name
      }))
    ]

    const items = []

    // Persons (life spans)
    persons.forEach((p) => {
      items.push({
        id: `life-${p.id}`,
        content: p.name,
        start: p.birthDate,
        end: p.deathDate || new Date(),
        group: p.id
      })
    })

    // Events
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

    // 🖱️ CLICK HANDLER
    timeline.on("select", (props) => {
      const itemId = props.items[0]
      if (!itemId) return

      // Person
      if (itemId.startsWith("life-")) {
        const personId = itemId.replace("life-", "")
        router.push(`/persons/${personId}`)
        return
      }

      // Event
      router.push(`/events/${itemId}`)
    })

    return () => timeline.destroy()
  }, [router])

  return (
    <div
      ref={containerRef}
      className="w-full h-[500px] border"
    />
  )
}
