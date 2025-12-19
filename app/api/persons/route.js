import { NextResponse } from "next/server"
import { getAllPersons, createPerson, updatePerson, deletePerson } from "@/lib/admin/persons"

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const persons = getAllPersons();

  if (id) {
    const person = persons.find((p) => p.id === id);
    return NextResponse.json(person ?? null);
  }

  return NextResponse.json(persons);
}

export async function POST(req) {
  const body = await req.json()
  createPerson(body)
  return NextResponse.json({ success: true })
}

export async function PUT(req) {
  const body = await req.json()
  updatePerson(body)
  return NextResponse.json({ success: true })
}

export async function DELETE(req) {
  const { id } = await req.json()
  deletePerson(id)
  return NextResponse.json({ success: true })
}
