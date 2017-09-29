import {Component, OnInit, Input} from '@angular/core';
import {Supplier} from '../model';
import {List} from 'immutable';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {

  @Input() supliers: List<Supplier>;
  _selectedsupplier: Supplier;
  get selectedsupplier(): Supplier {
    return this._selectedsupplier;
  }

  private x: number;
  private y: number;

  @Input('selectedsupplier')
  set setselectedsupplier(value: Supplier) {
    this._selectedsupplier = value;
    console.log(value);
    if (!this.supliers || !this._selectedsupplier) {
      return;
    }
    this.x = this._selectedsupplier.coord[0];
    this.y = this._selectedsupplier.coord[1];
    console.log(this._selectedsupplier);
  }

  // [11.321741, 54.184321], [9.404404, 47.613276], [10.306440, 53.940610]

  public zoom = 5;
  public opacity = 1.0;
  public width = 5;

  constructor() {
  }

  ngOnInit() {
  }

  increaseZoom() {
    this.zoom = Math.min(this.zoom + 1, 18);
    console.log('zoom: ', this.zoom);
  }

  decreaseZoom() {
    this.zoom = Math.max(this.zoom - 1, 1);
    console.log('zoom: ', this.zoom);
  }

  increaseOpacity() {
    this.opacity = Math.min(this.opacity + 0.1, 1);
    console.log('opacity: ', this.opacity);
  }

  decreaseOpacity() {
    this.opacity = Math.max(this.opacity - 0.1, 0);
    console.log('opacity: ', this.opacity);
  }

}
