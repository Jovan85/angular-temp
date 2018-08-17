import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MapService } from './map.service';
import { Subject } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @Input() location: string;
  @Input() locationSubject: Subject<any>;
  isPositionError = false;

  lat: number;
  lng: number;

  constructor(private mapService: MapService,
              private ref: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.locationSubject) {
      this.locationSubject.subscribe((location: string) => {
        this.getLocation(location);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.locationSubject) {
      this.locationSubject.unsubscribe();
    }
  }

  getLocation(location) {
    this.mapService.getGeolocation(location).subscribe((coordinates) => {
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;

      this.ref.detectChanges();
    }, () => {
      this.isPositionError = true;
    });
  }

  mapReadyHandler() {
    this.getLocation(this.location);
  }
}
