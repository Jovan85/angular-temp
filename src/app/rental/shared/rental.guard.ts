import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { RentalService } from './rental.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class RentalGuard implements CanActivate {

  constructor(private router: Router,
              private rentalService: RentalService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const rentalId: string = route.params.rentalId;

    return this.rentalService.verifyRentalUser(rentalId)
                .pipe(map(() => {
                  return true;
                }));

  }

}
