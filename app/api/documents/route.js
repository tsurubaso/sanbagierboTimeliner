import { NextResponse } from "next/server";
import {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument
} from "@/lib/admin/documents";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const document = getDocumentById(id);
    return NextResponse.json(document ?? null);
  }

  const documents = getAllDocuments();
  return NextResponse.json(documents);
}

export async function POST(req) {
  const body = await req.json();
  createDocument(body);
  return NextResponse.json({ success: true });
}

export async function PUT(req) {
  const body = await req.json();
  updateDocument(body);
  return NextResponse.json({ success: true });
}

export async function DELETE(req) {
  const { id } = await req.json();
  deleteDocument(id);
  return NextResponse.json({ success: true });
}
