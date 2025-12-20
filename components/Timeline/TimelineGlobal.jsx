"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.css";

export default function TimelineGlobal({ persons, events }) {
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current) return;

    /* GROUPS */
    const groups = [
      { id: "events", content: "🌍 Events" },
      ...persons.map((p) => ({
        id: p.id,
        content: p.name,
      })),
    ];

    /* ITEMS */
    const items = [];

    // Persons lifespan
    persons.forEach((p) => {
      items.push({
        id: `life-${p.id}`,
        content: p.name,
        start: p.birthDate,
        end: p.deathDate || new Date(),
        group: p.id,
      });
    });

    // Events
    events.forEach((e) => {
      items.push({
        id: e.id,
        content: e.title,
        start: e.startDate,
        end: e.endDate || undefined,
        group: "events",
      });
    });

    const timeline = new Timeline(containerRef.current, items, groups, {
      stack: false,
      showCurrentTime: true,
    });

    // CLICK HANDLER
    timeline.on("select", (props) => {
      const itemId = props.items[0];
      if (!itemId) return;

      if (itemId.startsWith("life-")) {
        router.push(`/persons/${itemId.replace("life-", "")}`);
      } else {
        router.push(`/events/${itemId}`);
      }
    });

    return () => timeline.destroy();
  }, [persons, events, router]);

  return <div ref={containerRef} className="w-full h-[500px] border" />;
}
