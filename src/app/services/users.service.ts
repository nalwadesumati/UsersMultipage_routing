import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iusers } from '../models/users';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  setFirstUserSub$: Subject<boolean> = new Subject<boolean>();

  usersArr: Array<Iusers> = [
    {
      userName: 'May',
      userId: '125',
      userRole: 'Candidate',
      profileDescription: 'Frontend developer with Angular experience.',
      profileImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKbZ8h0Z8cW19yk04iMrMqTUrPU1A624vfwA&s',
      skills: ['Angular', 'TypeScript', 'HTML', 'CSS'],
      experienceYears: '1 to 3 years',
      isActive: true,
      address: {
        current: {
          city: 'Latur',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '413512',
        },
        permanent: {
          city: 'Latur',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '413512',
        },
      },
      isAddSame: false,
    },
    {
      userName: 'Rahul',
      userId: '126',
      userRole: 'Candidate',
      profileDescription: 'Node.js backend developer working with MongoDB.',
      profileImage:
        'data:image/png;base64,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',
      skills: ['Node.js', 'Express', 'MongoDB'],
      experienceYears: '1 to 3 years',
      isActive: true,
      address: {
        current: {
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '400001',
        },
        permanent: {
          city: 'Nagpur',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '440001',
        },
      },
      isAddSame: false,
    },
    {
      userName: 'Sneha',
      userId: '127',
      userRole: 'HR',
      profileDescription: 'HR executive handling recruitment and onboarding.',
      profileImage:
        'data:image/png;base64,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',
      skills: ['Recruitment', 'Communication', 'MS Excel'],
      experienceYears: '3 to 5 years',
      isActive: true,
      address: {
        current: {
          city: 'Hyderabad',
          state: 'Telangana',
          country: 'India',
          zipcode: '500001',
        },
        permanent: {
          city: 'Nanded',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '431601',
        },
      },
      isAddSame: false,
    },
    {
      userName: 'Amit',
      userId: '128',
      userRole: 'Admin',
      profileDescription: 'System administrator managing infrastructure.',
      profileImage:
        'data:image/png;base64,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',
      skills: ['Linux', 'Networking', 'AWS'],
      experienceYears: '3 to 5 years',
      isActive: false,
      address: {
        current: {
          city: 'Bangalore',
          state: 'Karnataka',
          country: 'India',
          zipcode: '560001',
        },
        permanent: {
          city: 'Solapur',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '413001',
        },
      },
      isAddSame: false,
    },
    {
      userName: 'Pooja',
      userId: '129',
      userRole: 'Candidate',
      profileDescription: 'UI/UX designer with Figma and Adobe XD experience.',
      profileImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKbZ8h0Z8cW19yk04iMrMqTUrPU1A624vfwA&s',
      skills: ['Figma', 'Adobe XD', 'Wireframing'],
      experienceYears: '1 to 3 years',
      isActive: true,
      address: {
        current: {
          city: 'Pune',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '411002',
        },
        permanent: {
          city: 'Kolhapur',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '416003',
        },
      },
      isAddSame: false,
    },
    {
      userName: 'Vikas',
      userId: '130',
      userRole: 'Candidate',
      profileDescription: 'Full stack developer working on MEAN stack.',
      profileImage:
        'data:image/png;base64,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',
      skills: ['Angular', 'Node.js', 'MongoDB', 'Express'],
      experienceYears: '3 to 5 years',
      isActive: true,
      address: {
        current: {
          city: 'Nashik',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '422001',
        },
        permanent: {
          city: 'Aurangabad',
          state: 'Maharashtra',
          country: 'India',
          zipcode: '431001',
        },
      },
      isAddSame: false,
    },
    {
      userName: 'Kiran',
      userId: '131',
      userRole: 'Manager',
      profileDescription: 'Project manager handling multiple web projects.',
      profileImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKDXDLYa0kUilZv32GwNjWb196j-LH0p-ww&s',
      skills: ['Project Management', 'Agile', 'Scrum'],
      experienceYears: '5 to 7 years',
      isActive: true,
      address: {
        current: {
          city: 'Delhi',
          state: 'Delhi',
          country: 'India',
          zipcode: '110001',
        },
        permanent: {
          city: 'Jaipur',
          state: 'Rajasthan',
          country: 'India',
          zipcode: '302001',
        },
      },
      isAddSame: false,
    },
    {
      userName: 'Neha',
      userId: '132',
      userRole: 'Candidate',
      profileDescription:
        'QA engineer experienced in manual and automation testing.',
      profileImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKbZ8h0Z8cW19yk04iMrMqTUrPU1A624vfwA&s',
      skills: ['Selenium', 'Manual Testing', 'API Testing'],
      experienceYears: '1 to 3 years',
      isActive: false,
      address: {
        current: {
          city: 'Chennai',
          state: 'Tamil Nadu',
          country: 'India',
          zipcode: '600001',
        },
        permanent: {
          city: 'Madurai',
          state: 'Tamil Nadu',
          country: 'India',
          zipcode: '625001',
        },
      },
      isAddSame: false,
    },
    {
      userName: 'Arjun',
      userId: '133',
      userRole: 'Candidate',
      profileDescription: 'Data analyst working with Python and Power BI.',
      profileImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKDXDLYa0kUilZv32GwNjWb196j-LH0p-ww&s',
      skills: ['Python', 'Power BI', 'SQL'],
      experienceYears: '1 to 3 years',
      isActive: true,
      address: {
        current: {
          city: 'Indore',
          state: 'Madhya Pradesh',
          country: 'India',
          zipcode: '452001',
        },
        permanent: {
          city: 'Bhopal',
          state: 'Madhya Pradesh',
          country: 'India',
          zipcode: '462001',
        },
      },
      isAddSame: false,
    },
  ];

  createUser(user: Iusers) {
    let newUser: Iusers = { ...user, userId: Date.now().toString() };
    this.usersArr.unshift(newUser);
    return of(newUser);
  }
  featchUsers(): Observable<Iusers[]> {
    return of(this.usersArr);
  }

  fetchUserById(id: string): Observable<Iusers> {
    let user = this.usersArr.find((m) => m.userId === id)!;
    return of(user);
  }

  updateUser(updatedUser: Iusers): Observable<Iusers> {
    const index = this.usersArr.findIndex(
      (user) => String(user.userId) === String(updatedUser.userId),
    );

    if (index !== -1) {
      this.usersArr[index] = updatedUser;
      localStorage.setItem('users', JSON.stringify(this.usersArr));
    } else {
      console.error('User not found in array!');
    }

    return of(updatedUser);
  }

  removeUser(id: string): Observable<Iusers> {
    let getIndex = this.usersArr.findIndex((u) => u.userId === id);
    let removedUserArr = this.usersArr.splice(getIndex, 1);
    // this.setFirstUserSub$.next(this.usersArr[0]);

    return of(removedUserArr[0]);
  }
}
