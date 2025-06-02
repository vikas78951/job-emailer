import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const companies = body?.companies;

    if (!Array.isArray(companies)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input. Expected array of companies.",
        },
        { status: 400 }
      );
    }

    const filteredCompanies = companies
      .map((company) => {
        const { name, email, contactPerson, number, industry } = company;
        if (!name || !email) return null;
        return { name, email, contactPerson, number, industry };
      })
      .filter(
        (
          company
        ): company is {
          name: string;
          email: string;
          contactPerson: string;
          number: string;
          industry: string;
        } => company !== null
      );

    if (filteredCompanies.length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid companies to insert." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db
      .collection("companies")
      .insertMany(filteredCompanies);

    const insertedCompanies = filteredCompanies.map((company, idx) => ({
      id: result.insertedIds[idx] || new ObjectId(),
      ...company,
    }));

    return NextResponse.json({
      success: true,
      companies: insertedCompanies,
    });
  } catch (err) {
    console.error("Bulk insert error:", err);
    return NextResponse.json(
      {
        success: false,
        error: (err as Error).message || "Failed to bulk insert",
      },
      { status: 500 }
    );
  }
}
