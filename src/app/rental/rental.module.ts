import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentlDetailComponent } from './rentl-detail/rentl-detail.component';

const routes: Routes = [
  { path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: ':rentlId', component: RentlDetailComponent }
    ]
  }
];

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentlDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RentalModule {

}
