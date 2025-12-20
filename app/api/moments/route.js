import { NextResponse } from "next/server"
import {
  getAllMoments,
  createMoment,
  updateMoment,
  deleteMoment
} from "@/lib/admin/moments"

import { getAllPersons } from "@/lib/admin/persons"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  const persons = getAllPersons()
  const personIds = new Set(persons.map((p) => p.id))

  const moments = getAllMoments()

  // nettoyage des moments orphelins
  const validMoments = []
  const orphanMoments = []

  for (const m of moments) {
    if (personIds.has(m.personId)) {
      validMoments.push(m)
    } else {
      orphanMoments.push(m)
    }
  }

  // suppression définitive
  orphanMoments.forEach((m) => deleteMoment(m.id))

  // GET by id
  if (id) {
    const moment = validMoments.find((m) => m.id === id)
    return NextResponse.json(moment ?? null)
  }

  return NextResponse.json(validMoments)
}

export async function POST(req) {
  const body = await req.json()
  createMoment(body)
  return NextResponse.json({ success: true })
}

export async function PUT(req) {
  const body = await req.json()
  updateMoment(body)
  return NextResponse.json({ success: true })
}

export async function DELETE(req) {
  const { id } = await req.json()
  deleteMoment(id)
  return NextResponse.json({ success: true })
}

