import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InputComponent } from './input/input.component';
import {RootComponent, routing} from './routes';
import {ViewComponent} from './view/view.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule
  ],
  declarations: [
    InputComponent,
    ViewComponent,
    RootComponent,
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
