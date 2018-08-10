import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import { Rental } from '../../shared/rental.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../../../booking/shared/booking.service';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.css']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent)
    private picker: DaterangePickerComponent;

  newBooking: Booking;
  modalRef: any;

  public daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];

  public options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    autoUpdateInput: false,
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(private helper: HelperService,
              private modalService: NgbModal,
              private bookingService: BookingService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) ||
           date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;

    if (bookings && bookings.length > 0) {
        bookings.forEach((booking: Booking) => {
        const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  private addNewBookedDates(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  createBooking() {
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking)
        .subscribe((bookingData: any) => {
          this.addNewBookedDates(bookingData);
          this.newBooking = new Booking();
          this.modalRef.close();
          this.resetDatePicker();
          this.toastr.success('Booking has been succesfuly created, check your booking detail in manage section', 'Success');
        }, (errorsResponse: any) => {
          this.errors = errorsResponse.error.errors;
        });
  }

  public selectedDate(value: any, datepicker?: any) {
      this.options.autoUpdateInput = true;
      this.newBooking.startAt = this.helper.formatBookingDate(value.start);
      this.newBooking.endAt = this.helper.formatBookingDate(value.end);
      this.newBooking.days = value.end.diff(value.start, 'days');
      this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }
}
