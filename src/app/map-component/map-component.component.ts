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

  _selectedsupplier: number;
  get selectedsupplier(): number {
    return this._selectedsupplier;
  }

  @Input('selectedsupplier')
  set setselectedsupplier(value: number) {
    this._selectedsupplier = value;
    console.log(value);
    if (this.coords.length === 0)
      return;
    this.x = this.coords[value][0];
    this.y = this.coords[value][1];
  }

  coords = [[11.321741, 54.184321], [9.404404, 47.613276], [10.306440, 53.940610]];
  x = 11.321741;
  y = 54.184321;

  public zoom = 15;
  public opacity = 1.0;
  public width = 5;

  constructor() {
  }

  ngOnInit() {
  }

  parser() {
    alert("Mdel change");
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
