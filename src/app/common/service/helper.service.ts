import { Injectable } from '@angular/core';
import { Booking } from '../../booking/shared/booking.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private getRangeOfDays(startAt, endAt, dateFormat) {
    const tempDates: any[] = [];
    const mEndAt = moment(endAt);
    let mStartAt = moment(startAt);

    while (mStartAt < mEndAt) {
      tempDates.push(mStartAt.format(dateFormat));
      mStartAt = mStartAt.add(1, 'day');
    }
    tempDates.push(moment(startAt).format(dateFormat));
    tempDates.push(mEndAt.format(dateFormat));

    return tempDates;
  }

  private formatDate(date, dateFormat) {
    return moment(date).format(dateFormat);
  }

  public formatBookingDate(date) {
    return this.formatDate(date, Booking.DATE_FORMAT);
  }

  public getBookingRangeOfDates(startAt, endAt) {
    return this.getRangeOfDays(startAt, endAt, Booking.DATE_FORMAT);
  }
}
