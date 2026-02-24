export interface Iusers {
  userName: string;
  userId: string;
  userRole: TuserRole;
  profileDescription: string;
  profileImage: string;
  skills: string[];
  experienceYears: string;
  isActive: boolean;
  address: Iaddress;
  isAddSame: boolean;
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
