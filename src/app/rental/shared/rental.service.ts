import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  /* private rentals: Rental[] = [{
    id: '1',
    title: 'Central Apartment',
    city: 'New York',
    street: 'Times Sqaure',
    category: 'apartment',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 3,
    description: 'Very nice apartment',
    dailyRate: 34,
    shared: false,
    createdAt: '24/12/2017'
  },
  {
    id: '2',
    title: 'Central Apartment 2',
    city: 'San Francisco',
    street: 'Main street',
    category: 'condo',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 2,
    description: 'Very nice apartment',
    dailyRate: 12,
    shared: true,
    createdAt: '24/12/2017'
  },
  {
    id: '3',
    title: 'Central Apartment 3',
    city: 'Bratislava',
    street: 'Hlavna',
    category: 'condo',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 2,
    description: 'Very nice apartment',
    dailyRate: 334,
    shared: true,
    createdAt: '24/12/2017'
  },
  {
    id: '4',
    title: 'Central Apartment 4',
    city: 'Berlin',
    street: 'Haupt strasse',
    category: 'house',
    image: 'http://via.placeholder.com/350x250',
    bedrooms: 9,
    description: 'Very nice apartment',
    dailyRate: 33,
    shared: true,
    createdAt: '24/12/2017'
}]; */

  constructor(private http: HttpClient) { }

  public getRentalById(rentalId: string): Observable<any> {
    /* return new Observable<Rental>((observer) => {

      setTimeout(() => {
        const foundRental = this.rentals.find((rental) => {
          return rental.id === rentalId;
        });

        observer.next(foundRental);
      }, 500);

    }); */
    return this.http.get('/api/v1/rentals/' + rentalId);
  }

  public getRentals(): Observable<any> {
    /* return new Observable<Rental[]>((observer) => {

      setTimeout(() => {
        observer.next(this.rentals);
      }, 1000);

    }); */
    return this.http.get('/api/v1/rentals');
  }

}
