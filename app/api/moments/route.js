import { NextResponse } from "next/server"
import { getAllMoments, createMoment, updateMoment, deleteMoment, getMomentById } from "@/lib/admin/moments"

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const moment = getMomentById(id);
    return NextResponse.json(moment ?? null);
  }

  const moments = getAllMoments();
  return NextResponse.json(moments);
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
