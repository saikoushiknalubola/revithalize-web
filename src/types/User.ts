export interface User {
  email: string;
  password: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  occupation: string;
  company: string;
  joinDate: string;
  userType: 'individual' | 'fleet';
  // Fleet-specific fields
  fleetSize?: number;
  organizationRole?: string;
  organizationName?: string;
  industry?: string;
}

export interface UserData {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  occupation: string;
  company: string;
  joinDate: string;
  userType: 'individual' | 'fleet';
  fleetSize?: number;
  organizationRole?: string;
  organizationName?: string;
  industry?: string;
}