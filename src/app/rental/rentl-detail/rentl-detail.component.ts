import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { RendererStyleFlags3 } from '@angular/core/src/render3/interfaces/renderer';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bwm-rentl-detail',
  templateUrl: './rentl-detail.component.html',
  styleUrls: ['./rentl-detail.component.scss']
})
export class RentlDetailComponent implements OnInit {
  param1: string;
  rental: Rental;

  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService) { }

  ngOnInit() {
    this.param1 = this.route.snapshot.params.rentlId;

    this.getRental(this.param1);
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe((rental: Rental) => {
      this.rental = rental;
    });
  }

}
