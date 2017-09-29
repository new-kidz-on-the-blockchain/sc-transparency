import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BackendService} from '../backend.service';
import {Observable} from 'rxjs/Observable';
import {Supplier} from '../model';
import {List} from 'immutable';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements AfterViewInit {

  suppliers: Observable<List<Supplier>>;
  selected: number;

  constructor(private backendService: BackendService, private route: ActivatedRoute) {
    this.selected = 0;
    this.route.queryParams.subscribe(values => {
      this.suppliers = this.backendService.getSuppliers(values['productid']);
    });
  }

  ngAfterViewInit() {
    const t = this;
  }

  onInputChange(event) {
    let silderValue = event.value;
  }

}
