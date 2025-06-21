export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  password?: string; // Optional, as it shouldn't be returned in responses
}