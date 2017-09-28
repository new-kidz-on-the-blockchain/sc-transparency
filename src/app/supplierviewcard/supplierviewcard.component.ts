import {Component, Input, OnInit} from '@angular/core';
import {Supplier} from '../model';

@Component({
  selector: 'app-supplierviewcard',
  templateUrl: './supplierviewcard.component.html',
  styleUrls: ['./supplierviewcard.component.css']
})
export class SupplierviewcardComponent implements OnInit {

  @Input() supplier: Supplier;
  constructor() { }

  ngOnInit() {
  }

}
