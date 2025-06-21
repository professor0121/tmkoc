export interface JwtPayload {
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  password?: string; // Optional, as it shouldn't be returned in responses
}