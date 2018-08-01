import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import {NgPipesModule} from 'ngx-pipes';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { HttpClientModule } from '@angular/common/http';
import { RentlDetailComponent } from './rentl-detail/rentl-detail.component';
import { UppercasePipe } from '../common/pipes/uppercase.pipe';
import { MapModule } from '../common/map/map.module';

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
    RentlDetailComponent,
    UppercasePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NgPipesModule,
    MapModule,
    RouterModule.forChild(routes)
  ]
})
export class RentalModule {

}
