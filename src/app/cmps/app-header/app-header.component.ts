import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  loggedInUser$!: Observable<User | null>;
  ngOnInit(): void {
    this.loggedInUser$ = this.userService.loggedInUser$;
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('signup');
  }
}
