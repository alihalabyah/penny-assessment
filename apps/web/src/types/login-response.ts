import { User } from './user';

export interface LoginResponse {
  // Add the properties that match your API response
  user: User;
  token?: string;
}
