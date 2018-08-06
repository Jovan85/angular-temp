import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Daterangepicker } from 'ng2-daterangepicker';

import { NgModule } from '@angular/core';
import {NgPipesModule} from 'ngx-pipes';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { HttpClientModule } from '@angular/common/http';
import { RentlDetailComponent } from './rentl-detail/rentl-detail.component';
import { UppercasePipe } from '../common/pipes/uppercase.pipe';
import { MapModule } from '../common/map/map.module';
import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalDetailBookingComponent } from './rentl-detail/rental-detail-booking/rental-detail-booking.component';

const routes: Routes = [
  { path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: ':rentlId', component: RentlDetailComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentlDetailComponent,
    UppercasePipe,
    RentalDetailBookingComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    RouterModule.forChild(routes)
  ]
})
export class RentalModule {

}
