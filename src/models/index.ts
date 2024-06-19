export interface IUser {
  id: string;
  avatar: string;
  lastName: string;
  firstName: string;
  fullName: string;
  skills: number;
  city: string;
  street: string;
  email: string;
  rating: number;
  income: string;
}

export interface IUserDB {
  id: number;
  avatar: string;
  last_name: string;
  first_name: string;
  full_name: string;
  skills: number;
  city: string;
  street: string;
  email: string;
  rating: number;
  income: string;
}