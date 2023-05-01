import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { FoodItemIndexComponent } from './views/food-item-index/food-item-index.component';
import { FoodItemEditComponent } from './views/food-item-edit/food-item-edit.component';
import { foodItemResolver } from './services/food-item.resolver';
import { FoodItemDetailsComponent } from './views/food-item-details/food-item-details.component';
import { SignupComponent } from './views/signup/signup.component';
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: 'items',
    component: FoodItemIndexComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'edit/:id',
        component: FoodItemEditComponent,
        resolve: { foodItem: foodItemResolver },
      },
      { path: 'edit', component: FoodItemEditComponent },
    ],
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'item/:id',
    component: FoodItemDetailsComponent,
    resolve: { foodItem: foodItemResolver },
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
