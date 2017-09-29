import {Component, OnInit} from '@angular/core';
import {BackendService} from '../backend.service';
import {Observable} from 'rxjs/Observable';
import {Supplier} from '../model';
import {List} from 'immutable';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {

  suppliers: Observable<List<Supplier>>;
  selected: number;

  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    this.selected = 0;
    this.suppliers = this.backendService.getSuppliers('blablabla');
  }

  onInputChange(event) {
    let silderValue = event.value;
  }

}
