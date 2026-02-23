import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iusers } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

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
  ) {}

  ngOnInit(): void {
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
}
