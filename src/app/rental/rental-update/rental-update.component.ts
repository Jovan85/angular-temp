import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UcWordsPipe } from 'ngx-pipes';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {
  rental: Rental;
  param1: string;
  rentalCategories: string[] = Rental.CATEGORIES;

  locationSubject: Subject<any> = new Subject();

  constructor(private rentalService: RentalService,
              private toastr: ToastrService,
              private upperPipe: UcWordsPipe,
              private route: ActivatedRoute) {
                this.transformLocation = this.transformLocation.bind(this);
              }

  ngOnInit() {
    this.param1 = this.route.snapshot.params.rentalId;

    this.getRental(this.param1);
  }

  transformLocation(location: string): string {
    return this.upperPipe.transform(location);
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe((rental: Rental) => {
      this.rental = rental;
    });
  }

  updateRental(rentalId: string, rentalData: any) {
    this.rentalService.updateRental(rentalId, rentalData)
        .subscribe((updatedRental: Rental) => {
          this.rental = updatedRental;

          if (rentalData.city || rentalData.street) {
            this.locationSubject.next(this.rental.city + ', ' + this.rental.street);
          }
        }, (errorResponse: HttpErrorResponse) => {
          this.toastr.error(errorResponse.error.errors[0].detail, 'Error');
          this.getRental(rentalId);
        });
  }

  countBedroomAssets(assetsNum: number) {
    return parseInt(<any>this.rental.bedrooms || 0, 10) + assetsNum;
  }

}
