import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { AboutComponent } from './components/about/about.component';
import { SearchComponent } from './components/search/search.component';
import { ItemdetailComponent } from './components/itemdetail/itemdetail.component';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { SummaryComponent } from './components/summary/summary.component';
import { StarRatingModule } from 'angular-star-rating';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriesComponent,
    AboutComponent,
    SearchComponent,
    ItemdetailComponent,
    CartComponent,
    SignupComponent,
    LoginComponent,
    SummaryComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Include the AppRoutingModule
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StarRatingModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
