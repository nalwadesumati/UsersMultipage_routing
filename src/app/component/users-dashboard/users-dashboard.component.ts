import { Component, OnInit } from '@angular/core';
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
  constructor(
    private _userService: UsersService,
    private _snackBar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.featchUsers().subscribe({
      next: (data) => {
        this.usersArr = data;
        this._snackBar.success('Users loaded successfully');
      },
      error: () => {
        this._snackBar.error('Failed to load users');
      },
    });
  }
}
