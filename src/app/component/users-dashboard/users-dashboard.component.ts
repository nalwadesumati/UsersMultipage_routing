import { NgIfContext } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Iusers } from 'src/app/models/users';
import { SnackbarService } from 'src/app/services/snackbar.service';
// import { SnackbarService } from 'src/app/services/snackbar.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.scss'],
})
export class UsersDashboardComponent implements OnInit {
  usersArr: Array<Iusers> = [];
  noUsers!: TemplateRef<NgIfContext<boolean>> | null;
  constructor(
    private _userService: UsersService,
    private _snackBar: SnackbarService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.setFirstUserActive();
  }

  setFirstUserActive() {
    this._userService.setFirstUserSub$.subscribe((flag) => {
      if (flag) {
        setTimeout(() => {
          this._router.navigate(['users', this.usersArr[0].userId], {
            queryParams: {
              ur: this.usersArr[0].userRole,
            },
          });
        }, 0);
      }
    });
  }

  loadUsers() {
    this._userService.featchUsers().subscribe({
      next: (data) => {
        this.usersArr = data;
        this._router.navigate(['users', this.usersArr[0].userId], {
          queryParams: {
            ur: this.usersArr[0].userRole,
          },
        });
        // this._snackBar.success('Users loaded successfully');
      },
      error: (err) => {
        // this._snackBar.error('Failed to load users');
        console.log(err);
      },
    });
  }
}
