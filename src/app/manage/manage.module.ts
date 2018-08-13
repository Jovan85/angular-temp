import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/shared/auth.guard';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageComponent } from './manage.component';
import {NgPipesModule} from 'ngx-pipes';
import { FormatDatePipe } from '../common/pipes/format-date.pipe';
import { NgModule } from '@angular/core';
import { ManageRentalBookingComponent } from './manage-rental/manage-rental-booking/manage-rental-booking.component';

const routes: Routes = [
  { path: 'manage',
    component: ManageComponent,
    children: [
      { path: 'rentals', component: ManageRentalComponent, canActivate: [AuthGuard] },
      { path: 'bookings', component: ManageBookingComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  declarations: [
    ManageRentalComponent,
    ManageBookingComponent,
    ManageComponent,
    FormatDatePipe,
    ManageRentalBookingComponent
  ],
  imports: [
    CommonModule,
    NgPipesModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class ManageModule {

}
