import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDlm9vgOXb3NtGSgaB5XdZfUfPpUPyOKgk'
    })
  ],
  providers: [
    MapService,
    CamelizePipe
  ]
})
export class MapModule { }


