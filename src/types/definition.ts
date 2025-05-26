type SentEmail = {
  userEmail: string;
  sentAt: string;
};

export type Company = {
  id: string;
  name: string;
  email: string;
  status?: boolean;
  contactPerson?: string;
  number? : string;
  industry?: string;
  sent?: SentEmail[];
};
