import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Iusers } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { filter, pipe, switchMap } from 'rxjs';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss'],
})
export class UsersDetailsComponent implements OnInit {
  userId!: string;
  userObj!: Iusers;

  constructor(
    private _routes: ActivatedRoute,
    private _userService: UsersService,
    private _matDialog: MatDialog,
    private _router: Router,
    private _snackBar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userId = this._routes.snapshot.paramMap.get('userId')!;
    // this.userId = this._routes.snapshot.params.get('userId')!;

    this._userService.fetchUserById(this.userId).subscribe({
      next: (data) => {
        this.userObj = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onUserRemove(userId: string) {
    let matConfig = new MatDialogConfig();
    matConfig.width = '400px';
    matConfig.data = `Are you sure you want to remove this User with id <strong>${this.userId}</strong>`;

    let matRef = this._matDialog
      .open(GetConfirmComponent, matConfig)
      .afterClosed()

      .pipe(
        filter((flag) => flag === true),
        switchMap(() => {
          return this._userService.removeUser(this.userId);
        }),
      )
      .subscribe({
        next: (data) => {
          this._snackBar.success(
            `The User is Removed Successfully with id ${this.userId}`,
          );
          this._router.navigate(['users']);
        },
        error: (err) => {
          this._snackBar.error(
            `The User is failed to removed  with id ${this.userId}`,
          );
        },
      });
  }
}
