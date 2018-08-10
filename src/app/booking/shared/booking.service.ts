import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  public createBooking(booking: Booking): Observable<any> {
    return this.http.post('/api/v1/bookings', booking);
  }
}
