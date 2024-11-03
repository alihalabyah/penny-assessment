import { User } from '@/types/user';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
