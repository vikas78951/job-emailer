import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 
export function interpolate(template: string, data: Record<string, unknown>) {
  return template.replace(/{{(.*?)}}/g, (_, key) => {
    const value = key
      .trim()
      .split(".")
      .reduce((obj: unknown, k: string) => {
        if (obj && typeof obj === "object" && k in obj) {
          return (obj as Record<string, unknown>)[k];
        }
        return undefined;
      }, data);
    return value ?? `[${key}]`;
  });
}

export const fileToBase64 = (file: File): Promise<string> => {
  if (!(file instanceof Blob)) {
    console.info("fileToBase64: Provided value is not a Blob/File");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
  });
};
