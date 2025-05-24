"use client";
import React from "react";
import MailTemplate from "@/src/froms/mail-template";
import PreviewTemplate from "@/src/froms/preview-mail-template";

const Template = () => {
  //   const mailingData = {
  //     user: user ?? {
  //       firstName: "John",
  //       lastName: "Doe",
  //       email: "john@example.com",
  //       designation: "Developer",
  //       linkedinUrl: "https://linkedin.com/in/john",
  //     },
  //     company: {
  //       name: "Acme Corp",
  //       hr_name: "Alice",
  //       email: "alice@acme.com",
  //     },
  //     email: {
  //       subject: "Follow-up: Meeting to discuss your job opening",
  //       mailid: "alice@acme.com",
  //     },
  //   };

  return (
    <div className="grid mt-6 gap-6 lg:grid-cols-2">
         <MailTemplate />
         <PreviewTemplate />
     </div>
  );
};

export default Template;
