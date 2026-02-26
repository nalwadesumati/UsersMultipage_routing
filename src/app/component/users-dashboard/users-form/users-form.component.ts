import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { COUNTRIES_META_DATA } from 'src/app/const/country';
import { Icountry } from 'src/app/models/country';
import { Iusers } from 'src/app/models/users';
import { FormUtilityService } from 'src/app/services/form-utility.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
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
  userId!: string;
  isInEditMode: boolean = false;
  editUserObj!: Iusers;
  experienceOptions = [
    '1 to 3 years',
    '3 to 5 years',
    '5 to 7 years',
    '7 to 10 years',
    '10+ Years',
  ];

  constructor(
    private _userService: UsersService,
    private _router: Router,
    private _routes: ActivatedRoute,
    private _formUtility: FormUtilityService,
    private _snackBar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.createUserForm();
    if (!this.userId) {
      this.addSkill();
    }
    this.userId = this._routes.snapshot.paramMap.get('userId')!;
    this.patchUserInfo();
    this.handleAddressLogic();
  }

  get skillsArr() {
    return this.userForm.get('skills') as FormArray;
  }

  patchUserInfo() {
    //get userid form params
    this.userId = this._routes.snapshot.paramMap.get('userId')!;
    //get userObj
    if (this.userId) {
      this.isInEditMode = true;
      this._userService.fetchUserById(this.userId).subscribe({
        next: (userInfo) => {
          this.editUserObj = userInfo;
          this.userForm.patchValue({
            ...userInfo,
            skills: [],
          });

          this._formUtility.patchFormArr(userInfo.skills, this.skillsArr);
          this.checkAddressSame();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  checkAddressSame() {
    const currentGroup = this.f['address'].get('current');
    const permanentGroup = this.f['address'].get('permanent');
    const isAddSameControl = this.f['address'].get('isAddSame');

    if (!currentGroup || !permanentGroup || !isAddSameControl) return;

    const current = currentGroup.value;
    const permanent = permanentGroup.value;

    if (currentGroup.valid) {
      isAddSameControl.enable({ emitEvent: false });
    }

    const isSame = JSON.stringify(current) === JSON.stringify(permanent);

    if (isSame && currentGroup.valid) {
      isAddSameControl.patchValue(true, { emitEvent: false });
      permanentGroup.disable({ emitEvent: false });
    }
  }
  setSkills(skills: Array<string>) {
    this.skillsArr.clear();
    skills.forEach((skill) => {
      console.log(skill);
      let formControl = new FormControl(skill, [Validators.required]);
      this.skillsArr.push(formControl);
    });
  }

  createUserForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      userRole: new FormControl('Candidate', Validators.required),
      profileDescription: new FormControl(null, Validators.required),
      profileImage: new FormControl(null),
      experienceYears: new FormControl(null, Validators.required),
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
        isAddSame: new FormControl({ value: false, disabled: true }),
      }),

      skills: new FormArray([]),
    });
  }

  handleAddressLogic() {
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
        const currentValue = this.userForm.get('address.current')?.value;

        this.userForm.get('address.permanent')?.patchValue(currentValue);
        this.userForm.get('address.permanent')?.disable({ emitEvent: false });
      } else {
        this.userForm.get('address.permanent')?.enable({ emitEvent: false });
        this.userForm.get('address.permanent')?.reset();
      }
    });
  }

  get f() {
    return this.userForm.controls;
  }
  onUserAdd() {
    console.log('FORM STATUS:', this.userForm.status);
    console.log('FORM ERRORS:', this.userForm.errors);
    console.log('FULL FORM:', this.userForm);

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    let user: Iusers = this.userForm.getRawValue();

    this._userService.createUser(user).subscribe({
      next: (data) => {
        this._snackBar.success('User Added Successfully ✅!!!!');
        this._router.navigate(['users']);
      },
      error: (err) => {
        this._snackBar.error('Failed to Add User ❌');
      },
    });
  }

  onProfileUpdate(event: any) {
    const file = event?.target?.files?.[0];

    if (!file) return;

    this.selectedFile = file;

    this.userForm.get('profileImage')?.setValue(file);
    this.userForm.get('profileImage')?.markAsTouched();
  }

  addSkill() {
    let skillControl = new FormControl(null, [Validators.required]);
    this.skillsArr.push(skillControl);
  }

  onSkillRemove(i: number) {
    this.skillsArr.removeAt(i);
  }
  onUpdateUser() {
    if (this.userForm.valid) {
      const updatedObj: Iusers = {
        ...this.userForm.getRawValue(),
        userId: String(this.userId),
      };

      console.log('Updating User:', updatedObj);

      this._userService.updateUser(updatedObj).subscribe({
        next: () => {
          this._snackBar.success(
            `The User Id ${this.userId} updated successfully`,
          );
          this._router.navigate(['users']);
        },
        error: () => {
          this._snackBar.error(`The User Id ${this.userId} failed to update`);
        },
      });
    }
  }
}
