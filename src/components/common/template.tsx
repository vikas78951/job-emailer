"use client";
import React from "react";
import MailTemplate from "@/src/froms/mail-template";
import PreviewTemplate from "@/src/froms/preview-mail-template";

const Template = () => {

  return (
    <div className="grid mt-6 gap-14 lg:gap-6 lg:grid-cols-2">
         <MailTemplate />
         <PreviewTemplate />
     </div>
  );
};

export default Template;
