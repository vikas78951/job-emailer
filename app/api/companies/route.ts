import { NextResponse } from 'next/server';
import clientPromise from '@/src/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const companies = await db.collection('companies').find({}).toArray();
    return NextResponse.json({ success : true, companies });
  } catch (err) {
    return NextResponse.json({ success : false, error: (err as Error).message || 'Failed to fetch company' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ success : false,error: 'Missing fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('companies').insertOne({ name, email });

    return NextResponse.json({ success : true,insertedId: result.insertedId });
  } catch (err) {
    return NextResponse.json({ success : false, error: (err as Error).message || 'Failed to add company' }, { status: 500 });
  }
}