export type User = {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  isActive: boolean;
  termsAcceptedAt?: boolean;
  lastLoggedInAt?: boolean;
  isProvider: boolean;
};
