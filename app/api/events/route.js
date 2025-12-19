import { NextResponse } from "next/server";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from "@/lib/admin/events";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const event = getEventById(id);
    return NextResponse.json(event ?? null);
  }

  const events = getAllEvents();
  return NextResponse.json(events);
}

export async function POST(req) {
  const body = await req.json();
  createEvent(body);
  return NextResponse.json({ success: true });
}

export async function PUT(req) {
  const body = await req.json();
  updateEvent(body);
  return NextResponse.json({ success: true });
}

export async function DELETE(req) {
  const { id } = await req.json();
  deleteEvent(id);
  return NextResponse.json({ success: true });
}
