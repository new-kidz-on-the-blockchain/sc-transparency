import { Component, OnInit, Input} from '@angular/core';
import {Supplier} from '../model';
import {List} from 'immutable';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css']
})
export class MapComponentComponent implements OnInit {

  @Input() supliers: List<Supplier>;
  public zoom = 15;
    public opacity = 1.0;
    public width = 5;
  constructor() { }

  ngOnInit() {
  }

  parser() {
    alert("Mdel change");
  }

  increaseZoom() {
         this.zoom  = Math.min(this.zoom + 1, 18);
         console.log('zoom: ', this.zoom);
     }

     decreaseZoom() {
         this.zoom  = Math.max(this.zoom - 1, 1);
         console.log('zoom: ', this.zoom);
     }

     increaseOpacity() {
         this.opacity  = Math.min(this.opacity + 0.1, 1);
         console.log('opacity: ', this.opacity);
     }

     decreaseOpacity() {
         this.opacity  = Math.max(this.opacity - 0.1, 0);
         console.log('opacity: ', this.opacity);
     }

}
