import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { DATABASE_CONFIG } from "@/src/lib/constants";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_CONFIG.database);
    const companies = await db.collection(DATABASE_CONFIG.collection).find({}).toArray();
    return NextResponse.json({ success: true, companies });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: (err as Error).message || "Failed to fetch company",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, contactPerson, industry,number } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }
    const client = await clientPromise;
    const db = client.db(DATABASE_CONFIG.database);
    const result = await db.collection(DATABASE_CONFIG.collection).insertOne({
      name,
      email,
      contactPerson,
      number,
      industry,
    });

    return NextResponse.json({
      success: true,
      companies: {
        id: result.insertedId,
        name,
        email,
        contactPerson,
        industry,
        number
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: (err as Error).message || "Failed to add company",
      },
      { status: 500 }
    );
  }
}
