import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InputComponent } from './input/input.component';
import {RootComponent, routing} from './routes';
import {ViewComponent} from './view/view.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdSliderModule, MdToolbarModule, MdCardModule, MdFormFieldModule, MdButtonModule} from '@angular/material';

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
    MdButtonModule

  ],
  declarations: [
    InputComponent,
    ViewComponent,
    RootComponent
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
