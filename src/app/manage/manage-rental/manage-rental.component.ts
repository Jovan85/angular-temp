import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../rental/shared/rental.service';
import { Rental } from '../../rental/shared/rental.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {
  rentals: Rental[];
  rentalDeleteIndex: number;

  constructor(private rentalService: RentalService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.rentalService.getUserRentals().subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      () => {}
    );
  }

  deleteRental(id: string) {
    this.rentalService.deleteRental(id)
        .subscribe((rental: Rental) => {
          this.rentals.splice(this.rentalDeleteIndex, 1);
          this.rentalDeleteIndex = undefined;
        }, (errorResponse: HttpErrorResponse) => {
          this.toastr.error(errorResponse.error.errors[0].detail, 'Failed!');
          this.rentalDeleteIndex = undefined;
        });
  }

}
