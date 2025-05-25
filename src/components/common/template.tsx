"use client";
import React from "react";
import MailTemplate from "@/src/froms/mail-template";
import PreviewTemplate from "@/src/froms/preview-mail-template";

const Template = () => {

  return (
    <div className="flex flex-col lg:flex-row my-16 gap-6  ">
         <MailTemplate />
         <PreviewTemplate />
     </div>
  );
};

export default Template;
