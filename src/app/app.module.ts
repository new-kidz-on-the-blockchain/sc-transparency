import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {InputComponent} from './input/input.component';
import {RootComponent, routing} from './routes';
import {ViewComponent} from './view/view.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdSliderModule,
  MdToolbarModule,
  MdCardModule,
  MdFormFieldModule,
  MdButtonModule,
  MdStepperModule,
  MdSnackBarModule, MdInputModule
} from '@angular/material';
import {SupplierviewcardComponent} from './supplierviewcard/supplierviewcard.component';
import {BackendService} from './backend.service';
import {QrScannerModule} from 'angular2-qrscanner';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { MapComponentComponent } from './map-component/map-component.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdSliderModule,
    MdCardModule,
    MdFormFieldModule,
    MdButtonModule,
    MdStepperModule,
    QrScannerModule,
    MdSnackBarModule,
    MdInputModule,
    AngularOpenlayersModule

  ],
  declarations: [
    InputComponent,
    ViewComponent,
    RootComponent,
    SupplierviewcardComponent,
    MapComponentComponent
  ],
  bootstrap: [RootComponent],
  providers: [
    BackendService
  ]
})
export class AppModule {
}
