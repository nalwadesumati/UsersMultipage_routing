export interface Iusers {
  userName: string;
  userId: string;
  userRole: TuserRole;
  profileDescription: string;
  profileImage: string;
  skills: string[];
  experienceYears: number;
  isActive: boolean;
  address: Iaddress;
}
export type TuserRole = 'Candidate' | 'Admin' | 'Manager' | 'HR';

export interface Iaddress {
  current: Icurrent;
  permanent: Ipermanent;
}

export interface Icurrent {
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface Ipermanent {
  city: string;
  state: string;
  country: string;
  zipcode: string;
}
