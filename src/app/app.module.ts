import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { FoodItemIndexComponent } from './views/food-item-index/food-item-index.component';
import { FoodListComponent } from './cmps/food-list/food-list.component';
import { FoodPreviewComponent } from './cmps/food-preview/food-preview.component';
import { FoodItemFilterComponent } from './cmps/food-item-filter/food-item-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { FoodItemEditComponent } from './views/food-item-edit/food-item-edit.component';
import { FoodItemDetailsComponent } from './views/food-item-details/food-item-details.component';
import { SignupComponent } from './views/signup/signup.component';
import { CustomValidatorDirective } from './validators/name-taken';
import { PurchaseListComponent } from './cmps/purchase-list/purchase-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FoodItemIndexComponent,
    FoodListComponent,
    FoodPreviewComponent,
    FoodItemFilterComponent,
    AppHeaderComponent,
    FoodItemEditComponent,
    FoodItemDetailsComponent,
    SignupComponent,
    PurchaseListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [CustomValidatorDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
