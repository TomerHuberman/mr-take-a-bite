import { Component, OnInit } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { User, purchase } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private userService: UserService) {}
  user: User | null = this.userService.getLoggedInUser();
  purchases: purchase[] = [];
  subscription!: Subscription;
  ngOnInit(): void {
    this.subscription = this.userService.loggedInUser$
      .pipe(
        map((user) => user?.purchases),
        map((purchases) => {
          return purchases?.slice(0, 3);
        })
      )
      .subscribe((purchases) => (this.purchases = purchases || []));
  }
}
