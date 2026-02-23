import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { COUNTRIES_META_DATA } from 'src/app/const/country';
import { Icountry } from 'src/app/models/country';
import { Iusers } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit {
  userForm!: FormGroup;
  countryArr: Icountry[] = COUNTRIES_META_DATA;
  selectedFile!: File;
  constructor(
    private _userService: UsersService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.createUserForm();
    this.addSkill();

    this.userForm.get('address.current')?.valueChanges.subscribe(() => {
      const currentGroup = this.userForm.get('address.current');
      const isAddSameControl = this.userForm.get('address.isAddSame');

      if (currentGroup?.valid) {
        isAddSameControl?.enable();
      } else {
        isAddSameControl?.disable();
        isAddSameControl?.reset();
      }
    });

    this.userForm.get('address.isAddSame')?.valueChanges.subscribe((res) => {
      if (res) {
        let val = this.userForm.get('address.current')?.value;
        this.userForm.get('address.permanent')?.patchValue(val);
        this.userForm.get('address.permanent')?.disable();
      } else {
        this.userForm.get('address.permanent')?.enable();
        this.userForm.get('address.permanent')?.reset();
      }
    });
  }

  createUserForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      userId: new FormControl(null, Validators.required),
      userRole: new FormControl('Candidate', Validators.required),
      profileDescription: new FormControl(null, Validators.required),
      profileImage: new FormControl(null, Validators.required),

      experienceYears: new FormControl('1 to 3', Validators.required),
      isActive: new FormControl(true),

      address: new FormGroup({
        current: new FormGroup({
          country: new FormControl(null, Validators.required),
          state: new FormControl(null, Validators.required),
          city: new FormControl(null, Validators.required),
          zipcode: new FormControl(null, Validators.required),
        }),

        permanent: new FormGroup({
          country: new FormControl(null, Validators.required),
          state: new FormControl(null, Validators.required),
          city: new FormControl(null, Validators.required),
          zipcode: new FormControl(null, [
            Validators.required,
            Validators.pattern(/^[0-9]{5,6}$/),
          ]),
        }),

        isAddSame: new FormControl(
          { value: false, disabled: true },
          Validators.required,
        ),
      }),
      skills: new FormArray([]),
    });
  }

  get f() {
    return this.userForm.controls;
  }
  onuUserAdd() {
    if (!this.selectedFile) {
      alert('Profile Image required');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', this.selectedFile);

    console.log(formData);

    console.log('userform', this.userForm.value);

    let user: Iusers = this.userForm.getRawValue();

    this._userService.createUser(user).subscribe({
      next: (data) => {
        console.log(data);
        this._router.navigate(['users']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onProfileUpdate(event: any) {
    this.selectedFile = event.target.files[0];
  }
  get currentAddressControls() {
    return (this.userForm.get('address.current') as FormGroup).controls;
  }

  get skillsArr() {
    return this.userForm.get('skills') as FormArray;
  }
  addSkill() {
    let skillControl = new FormControl('Ts', [Validators.required]);
    this.skillsArr.push(skillControl);
  }

  onSkillRemove(i: number) {
    this.skillsArr.removeAt(i);
  }
}
