import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "@/src/lib/mongodb";

// This type is used only for sending email, includes base64!
type AttachmentWithBase64 = {
  name: string;
  type: string;
  base64: string;
};

type User = {
  email: string;
  password: string;
  attachments?: AttachmentWithBase64[];
};

type Company = {
  email: string;
};

type Template = {
  subject: string;
  body: string;
};

export async function POST(req: NextRequest) {
  try {
    const {
      user,
      company,
      template,
    }: { user: User; company: Company; template: Template } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user.email,
        pass: user.password,
      },
    });

    const attachments = (user.attachments || []).map((file) => ({
      filename: file.name,
      content: file.base64,
      contentType: file.type,
      encoding: "base64",
    }));

    const mail = {
      from: user.email,
      to: company.email,
      subject: template.subject,
      html: `<p>${template.body.replace(/\n/g, "<br/>")}</p>`,
      attachments,
    };


    await transporter.sendMail(mail);
    const client = await clientPromise;
    const db = client.db();

    await db.collection("companies").updateOne(
      { email: company.email },
      {
        $addToSet: {
          sent: {
            userEmail: user.email,
            sentAt: new Date(),
          },
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send error:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
