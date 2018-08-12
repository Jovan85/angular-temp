import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Rental } from '../shared/rental.model';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';

@Component({
  selector: 'app-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.css']
})
export class RentalSearchComponent implements OnInit {
  rentals: Rental[] = [];
  errors: HttpErrorResponse[] = [];
  city: string;

  constructor(private route: ActivatedRoute,
              private rentalService: RentalService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.city = params['city'];
    });
    this.getRentals();
  }

  getRentals() {
    this.errors = [];
    this.rentals = [];

    this.rentalService.getRentalsByCity(this.city)
        .subscribe((rentals: Rental[]) => this.rentals = rentals,
        (errorResponse: HttpErrorResponse) => {
          this.errors = errorResponse.error.errors;
        });
  }

}
